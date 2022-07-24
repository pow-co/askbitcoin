import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { JWT_API } from 'config';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'components/ui-component/Loader';
import axios from 'utils/axios';

import { useSnackbar } from 'notistack';

// constant
const JWT_SECRET = JWT_API.secret;
const JWT_EXPIRES_TIME = JWT_API.timeout;

const chance = new Chance();
let users = [
  {
    id: '5e86809283e28b96d2d38537',
    email: 'info@codedthemes.com',
    password: '123456',
    name: 'JWT User'
  }
];
// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  wallet: null
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const init = async () => {
      switch (localStorage.getItem('auth.type')) {
        case 'relayx':
          let relayAuth = window.localStorage.getItem('relayx.auth');
          let paymail = window.localStorage.getItem('relayx.paymail');
          let name = window.localStorage.getItem('relayx.paymail');
          let pubkey = window.localStorage.getItem('relayx.pubkey');
          console.log('RELAY AUTH', relayAuth);

          if (relayAuth) {
            console.log('DISPATCH', {
              type: LOGIN,
              payload: {
                wallet: 'relayx',
                isLoggedIn: true,
                user: {
                  email: paymail,
                  id: pubkey,
                  name: paymail
                }
              }
            });

            dispatch({
              type: LOGIN,
              payload: {
                wallet: 'relayx',
                isLoggedIn: true,
                user: {
                  email: paymail,
                  id: pubkey,
                  name: paymail
                }
              }
            });
          } else {
            dispatch({
              type: LOGOUT
            });
          }
          break;
        case 'twetch':
          //const twetchAuth = window.localStorage.getItem('twetch.auth');
          paymail = window.localStorage.getItem('twetch.paymail');
          name = window.localStorage.getItem('twetch.paymail');
          pubkey = window.localStorage.getItem('twetch.pubkey');
          console.log('TWETCH AUTH', { paymail, pubkey });
          if (paymail && pubkey) {
            console.log('DISPATCH', {
              type: LOGIN,
              payload: {
                isLoggedIn: true,
                user: {
                  email: paymail,
                  id: pubkey,
                  name: paymail
                }
              }
            });

            dispatch({
              type: LOGIN,
              payload: {
                isLoggedIn: true,
                user: {
                  email: paymail,
                  id: pubkey,
                  name: paymail
                }
              }
            });
          } else {
            dispatch({
              type: LOGOUT
            });
          }
          break;
        case 'handcash':
          //TODO
          break;
        default:
          console.error('No wallet selected');
          dispatch({
            type: LOGOUT
          });
      }
    };

    init();
  }, []);

  const relayxSignIn = async () => {
    const token = await relayone.authBeta();

    const json = JSON.parse(atob(token.split('.')[0]));
    localStorage.setItem('auth.type', 'relayx');
    localStorage.setItem('relayx.token', token);
    localStorage.setItem('relayx.auth', JSON.stringify(json));
    localStorage.setItem('relayx.paymail', json.paymail);
    localStorage.setItem('relayx.pubkey', json.pubkey);
    localStorage.setItem('relayx.origin', json.origin);
    localStorage.setItem('relayx.issued_at', json.issued_at);

    const user = {
      id: json.pubkey,
      email: json.paymail,
      name: json.paymail
    };
    dispatch({
      type: LOGIN,
      payload: {
        wallet: 'relayx',
        isLoggedIn: true,
        user
      }
    });

    return json;
  };

  const getProvider = () => {
    if ('bitcoin' in window) {
      const provider = window.bitcoin || {};
      if (provider.isTwetch) {
        return provider;
      }
    }
    window.open('https://twetch.com/downloads', '_blank');
  };

  const twetchSignIn = async () => {
    const Twetch = getProvider();
    const { paymail, publicKey } = await Twetch.connect();

    localStorage.setItem('auth.type', 'twetch');
    localStorage.setItem('twetch.paymail', paymail);
    localStorage.setItem('twetch.pubkey', publicKey);

    const user = {
      id: publicKey,
      email: paymail,
      name: paymail
    };
    dispatch({
      type: LOGIN,
      payload: {
        wallet: 'twetch',
        isLoggedIn: true,
        user
      }
    });

    return { paymail, publicKey };
  };

  const handcashSignIn = async () => {
    /* const Twetch = getProvider();
    const { paymail, publicKey } = await Twetch.connect();

    localStorage.setItem("auth.type","handcash");
    localStorage.setItem('twetch.paymail', paymail);
    localStorage.setItem('twetch.pubkey', publicKey);

    const user = {
      id: publicKey,
      email: paymail,
      name: paymail
    }; */
    dispatch({
      type: LOGIN,
      payload: {
        wallet: 'handcash',
        isLoggedIn: true,
        user
      }
    });

    return json;
  };

  const logout = () => {
    setSession(null);
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('twetch.pubkey');
    window.localStorage.removeItem('twetch.paymail');

    //TODO Handcash

    window.localStorage.removeItem('relayx.auth');
    window.localStorage.removeItem('relayx.origin');
    window.localStorage.removeItem('relayx.token');
    window.localStorage.removeItem('relayx.pubkey');
    window.localStorage.removeItem('relayx.paymail');
    window.localStorage.removeItem('relayx.domain');
    window.localStorage.removeItem('relayx.issued_at');
    //window.localStorage.removeItem('berry-cart');
    //window.localStorage.removeItem('berry-next-js-config');

    enqueueSnackbar('au revoir!');

    dispatch({ type: LOGOUT });
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <WalletContext.Provider value={{ ...state, relayxSignIn, twetchSignIn, handcashSignIn, logout }}>{children}</WalletContext.Provider>
  );
};

WalletProvider.propTypes = {
  children: PropTypes.node
};

export default WalletContext;
