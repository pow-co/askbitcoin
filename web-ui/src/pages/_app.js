import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Head from 'next/head';

// third-party
import { PersistGate } from 'redux-persist/integration/react';

// styles
import 'scss/style.scss';
import 'styles/globals.css';

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

// project import
import NavigationScroll from 'layout/NavigationScroll';
import { persister, store } from 'store';
import ThemeCustomization from 'themes';
import MainLayout from 'layout/MainLayout';
import GuestGuard from 'layout/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import RTLLayout from 'components/ui-component/RTLLayout';
import Locales from 'components/ui-component/Locales';
import Snackbar from 'components/ui-component/extended/Snackbar';

import { ConfigProvider } from 'contexts/ConfigContext';

//import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from '../contexts/Auth0Context';
//import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
import { RelayxProvider as AuthProvider } from '../contexts/RelayxContext';


const Noop = ({ children }) => <> {children} </>;

Noop.propTypes = {
  children: PropTypes.node
};

// ==============================|| APP ||============================== //

function App({ Component, pageProps }) {
  let Layout;
  switch (Component.Layout) {
    case 'authGuard':
      Layout = MainLayout;
      break;
    case 'guestGuard':
      Layout = GuestGuard;
      break;
    case 'minimalLayout':
      Layout = MinimalLayout;
      break;
    default:
      Layout = Noop;
  }

  return (
    <>
      <Head>
        <title>Ask Bitcoin | Top Answers Ranked by Proof of Work</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <ConfigProvider>
            <ThemeCustomization>
              <RTLLayout>
                <Locales>
                  <NavigationScroll>
                    <AuthProvider>
                      <Layout>
                        <Component {...pageProps} />
                        <Snackbar />
                      </Layout>
                    </AuthProvider>
                  </NavigationScroll>
                </Locales>
              </RTLLayout>
            </ThemeCustomization>
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};

export default App;
