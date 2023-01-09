import Router, { useRouter } from "next/router";
import { useState } from "react";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { SplashScreen } from "../components";
import { RelayProvider } from "../context/RelayContext";
import { TuneProvider } from "../context/TuningContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TwetchProvider } from "../context/TwetchContext";
import { BitcoinProvider } from "../context/BitcoinContext";
import Head from "next/head";
import Locales from "../context/LocalContext";

function MyApp({ Component, pageProps }) {
  /*  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", (url) => {
    if (url.startsWith("/t")) {
      setLoading(true);
    }
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  }); */

  return (
    <>
      <Head>
        <title>Ask Bitcoin | Top Answers Ranked by Proof of Work</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        src="https://one.relayx.io/relayone.js"
        strategy="beforeInteractive"
      />
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        disableTransitionOnChange
      >
        <TwetchProvider>
          <RelayProvider>
            <BitcoinProvider>
              <TuneProvider>
                <Locales>
                  <Component {...pageProps} />
                </Locales>
              </TuneProvider>
            </BitcoinProvider>
          </RelayProvider>
        </TwetchProvider>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
