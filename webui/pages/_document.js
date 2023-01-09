import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <div id="drawerControler" />
          <div id="walletProviderControler" />
          <div id="walletProviderPopupControler" />
          <div id="tuningProviderPopupControler" />
          <div id="boostPopupControler" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
