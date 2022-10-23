import { Html, Head, Main, NextScript } from 'next/document';

import { useRouter } from 'next/router';

export default function Document() {

  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#2296f3" />
        <meta name="title" content="Ask Bitcoin - Top Answers Ranked by Proof of Work" key="title"/>
        <meta
          name="description"
          content="Ask Bitcoin - Top Answers Ranked by Proof of Work"
        />
        <meta
          name="keywords"
          content="Ask Bitcoin - Top Answers Ranked by Proof of Work"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://askbitcoin.ai" key="og_url" />
        <meta property="og:site_name" content="askbitcoin.ai" />
        <meta property="og:title" content="Ask Bitcoin - Top Answers Ranked by Proof of Work" key="og_title"/>
        <meta
          property="og:description"
          content="Ask Bitcoin - Top Answers Ranked by Proof of Work"
        />
        <meta property="og:image" content="https://askbitcoin.ai/assets/images/askbitcoin_logo_without_margins_or_background.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://askbitcoin.ai" key="twitter_url" />
        <meta property="twitter:title" content="Ask Bitcoin - Top Answers Ranked by Proof of Work" key="twitter_title" />
        <meta
          property="twitter:description"
          content="Ask Bitcoin - Top Answers Ranked by Proof of Work"
          key="twitter_description"
        />
        <meta property="twitter:image" content="https://askbitcoin.ai/assets/images/askbitcoin_logo_without_margins_or_background.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
