import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'components/ui-component/Loader';
import axios from 'utils/axios';

import { useSnackbar } from 'notistack';

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
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
const TwetchContext = createContext(null);

export const TwetchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const init = async () => {
      try {
        //const twetchAuth = window.localStorage.getItem('twetch.auth');
        const paymail = window.localStorage.getItem('twetch.paymail');
        const name = window.localStorage.getItem('twetch.paymail');
        const pubkey = window.localStorage.getItem('twetch.pubkey');
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
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const getProvider = () => {
    if ('bitcoin' in window) {
      const provider = window.bitcoin || {};
      if (provider.isTwetch) {
        return provider;
      }
    }
    window.open('https://twetch.com/downloads', '_blank');
  };

  const login = async () => {
    const Twetch = getProvider();
    const { paymail, publicKey } = await Twetch.connect();

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
        isLoggedIn: true,
        user
      }
    });

    return json;
  };

  const logout = () => {
    setSession(null);
    window.localStorage.removeItem('twetch.pubkey');
    window.localStorage.removeItem('twetch.paymail');
    //window.localStorage.removeItem('berry-cart');
    //window.localStorage.removeItem('berry-next-js-config');

    enqueueSnackbar('au revoir!');

    dispatch({ type: LOGOUT });
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <TwetchContext.Provider value={{ ...state, login, logout }}>{children}</TwetchContext.Provider>;
};

TwetchProvider.propTypes = {
  children: PropTypes.node
};

export default TwetchContext;
