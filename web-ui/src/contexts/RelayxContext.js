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
const RelayxContext = createContext(null);

export const RelayxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const relayAuth = window.localStorage.getItem('relayx.auth');
        const paymail = window.localStorage.getItem('relayx.paymail');
        const name = window.localStorage.getItem('relayx.paymail');
        const pubkey = window.localStorage.getItem('relayx.pubkey');
            console.log('RELAY AUTH', relayAuth)

            if (relayAuth) {
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
                  })
        
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


async function relayxSignIn() {

    const token = await relayone.authBeta()
  
    const json = JSON.parse(atob(token.split('.')[0]))
  
    localStorage.setItem('relayx.token', token)
    localStorage.setItem('relayx.auth', JSON.stringify(json))
    localStorage.setItem('relayx.paymail', json.paymail)
    localStorage.setItem('relayx.pubkey', json.pubkey)
    localStorage.setItem('relayx.origin', json.origin)
    localStorage.setItem('relayx.issued_at', json.issued_at)
  
    return json
    
  }

  const login = async (email, password) => {

    const token = await relayone.authBeta()
  
    const json = JSON.parse(atob(token.split('.')[0]))
  
    localStorage.setItem('relayx.token', token)
    localStorage.setItem('relayx.auth', JSON.stringify(json))
    localStorage.setItem('relayx.paymail', json.paymail)
    localStorage.setItem('relayx.pubkey', json.pubkey)
    localStorage.setItem('relayx.origin', json.origin)
    localStorage.setItem('relayx.issued_at', json.issued_at)
  
    const user = {
      id: json.pubkey,
      email: json.paymail,
      name: json.paymail
    };
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });

    return json
  };

  const register = async (email, password, firstName, lastName) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    window.localStorage.removeItem('relayx.token')
    window.localStorage.removeItem('relayx.auth')
    window.localStorage.removeItem('relayx.paymail')
    window.localStorage.removeItem('relayx.domain')
    window.localStorage.removeItem('relayx.issued_at')


    dispatch({ type: LOGOUT });
  };

  const resetPassword = (email) => console.log(email);

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <RelayxContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</RelayxContext.Provider>;
};

RelayxProvider.propTypes = {
  children: PropTypes.node
};

export default RelayxContext;
