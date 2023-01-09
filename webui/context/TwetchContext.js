import { GraphQLClient, gql } from "graphql-request";
import { useCallback } from "react";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "../utils/storage";

const graphqlAPI = "https://gw.twetch.app";

const TwetchContext = createContext(undefined);

const TwetchProvider = (props) => {
  const [twetchPaymail, setTwetchPaymail] = useLocalStorage(paymailStorageKey);
  const [tokenTwetchAuth, setTokenTwetchAuth] = useLocalStorage(
    tokenTwetchAuthStorageKey
  );
  const [twetch, setTwetch] = useState();

  const [ready, setReady] = useState(false);

  const getProvider = () => {
    if ("bitcoin" in window) {
      const provider = window.bitcoin;
      if (provider.isTwetch) {
        return provider;
      }
    }
    window.open("https://twetch.com/downloads", "_blank");
  };

  const twetchAuthenticate = async () => {
    try {
      const resp_msg = await twetch.connect();
      setTwetchPaymail(resp_msg.paymail);
      const res_msg = await fetch("https://auth.twetch.app/api/v1/challenge");
      const msgData = await res_msg.json();
      const response = await twetch.abi({
        contract: "sign-message",
        payload: { message: msgData.message },
      });
      //let encodedSig = encodeURIComponent(response.sig);
      const resp_auth = await fetch(
        "https://auth.twetch.app/api/v1/authenticate",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            address: response.address,
            message: msgData.message,
            signature: response.sig,
          }),
        }
      );
      const res_resp = await resp_auth.json();
      setTokenTwetchAuth(res_resp.token.toString());
    } catch (err) {
      console.error(err);
      // { code: 4001, message: 'me rejected the request.' }
    }
  };

  const twetchSend = useCallback(
    async (outputs) => {
      console.log("twetch.send.outputs", outputs);
      /* console.log(output);
      let outputs = [
        {
          args: output,
          to: "powco@relayx.io",
          sats: fee,
        },
      ];
 */
      try {
        let resp = await window.bitcoin.abi({
          contract: "payment",
          outputs,
        });
        return resp;
      } catch (error) {
        console.log("twetch.send.error", error);
        throw new Error(error);
      }
    },
    [twetch]
  );

  /* const logTwetchUser = () => {
    if (!tokenTwetchAuth) {
      return;
    }
    const query = gql`
      query useAuthenticatedQuery {
        isTw3tch
        me {
          id
          icon
          ...userIcon
          verifiedIcon
          name
          publicKey
          notificationsCount
          unreadMessagesCount
          lastReadNotifications
          isOneClick
          isDarkMode
          isAdmin
          hasAutoTweetFromTwetch
          hasTwetchToTweet
          xpub
          purchasedChatAt
          onboardedAt
          referralLinkByReferralLinkId {
            shortLinkUrl
          }
        }
        myWallet {
          id
          xpub
          pubkey
        }
      }

      fragment userIcon on User {
        id
        icon
        verifiedIcon
      }
    `;

    const graphqlClient = new GraphQLClient(graphqlAPI, {
      headers: {
        Authorization: authToken,
      },
    });
  }; */

  const twetchLogout = () => {
    setTwetchPaymail("");
    setTokenTwetchAuth("");
    localStorage.removeItem(paymailStorageKey);
    localStorage.removeItem(tokenTwetchAuthStorageKey);
  };

  const value = useMemo(
    () => ({
      twetch,
      twetchPaymail,
      setTwetchPaymail,
      twetchAuthenticate,
      twetchSend,
      authenticated: !!twetchPaymail,
      twetchLogout,
      tokenTwetchAuth,
      ready,
    }),
    [
      twetch,
      twetchPaymail,
      setTwetchPaymail,
      twetchAuthenticate,
      twetchSend,
      twetchLogout,
      tokenTwetchAuth,
    ]
  );

  return <TwetchContext.Provider value={value} {...props} />;
};

const useTwetch = () => {
  const context = useContext(TwetchContext);
  if (context === undefined) {
    throw new Error("useTwetch must be used within a TwetchProvider");
  }
  return context;
};

export { TwetchProvider, useTwetch };

//
// Utils
//

const paymailStorageKey = "askbitcoin__TwetchProvider_paymail";
const tokenTwetchAuthStorageKey = "askbitcoin__TwetchProvider_tokenTwetchAuth";
