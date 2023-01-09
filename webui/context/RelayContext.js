import axios from "axios";
import Script from "next/script";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { lsTest, useLocalStorage } from "../utils/storage";

// export interface RelaySignResult {
//   algorithm: 'bitcoin-signed-message';
//   key: 'identity';
//   data: string; // data you passed in
//   value: string; // signature
// }

// export interface RelayBroadcastResponse {
//   amount: number;
//   currency: string;
//   identity: string;
//   paymail: string; // sender paymail
//   rawTx: string;
//   satoshis: number;
//   txid: string;
// }

// interface RelayOneAlpha {
//   run: RelayOneRun;
//   dex: RelayOneDex;
// }

// interface RelayOneDex {
//   getDexKey: () => Promise<string>;
//   pay: (tx: string) => Promise<any>; // TODO: These can take bsv.Transaction as well
//   sign: (tx: string) => Promise<any>; // TODO: These can take bsv.Transaction as well
// }
// interface RelayOneRun {
//   getOwner: () => Promise<string>;
//   getLegacyOwner: () => Promise<string>;
// }

// interface RenderProps {
//   to: string;
//   amount: string;
//   currency: string;
//   editable?: boolean;
//   opReturn?: string | string[];
//   onPayment?: (response: RelayBroadcastResponse) => void;
// }
// interface RelayOne {
//   authBeta: () => Promise<string>;
//   send: (payload: any) => Promise<RelayBroadcastResponse>;
//   quote: (payload: any) => Promise<string>;
//   sign: (payload: string) => Promise<RelaySignResult>;
//   isApp: () => boolean;
//   render: (ele: HTMLDivElement, props: RenderProps) => void;
//   alpha: RelayOneAlpha;
// } // TODO: Complete

// // 'relay-container', { to: Current.campaign.funding_address }
// type RelayOtcOptions = {
//   to: string;
// };

// interface RelayOtc {
//   buy: (container: string, options: RelayOtcOptions) => void;
// } // TODO: Complete

// type ContextValue = {
//   relayOne: RelayOne | undefined;
//   relayOtc: RelayOtc | undefined;
//   paymail: string | undefined;
//   authenticate: () => Promise<void>;
//   authenticated: boolean;
//   ready: boolean;
//   isApp: boolean;
//   setPaymail: (paymail: string | undefined) => void;
//   runOwner: string | undefined;
// };

const RelayContext = React.createContext(undefined);

const RelayProvider = (props) => {
  const [relayPaymail, setRelayPaymail] = useLocalStorage(paymailStorageKey);
  const [relayOne, setRelayOne] = useState();
  const [relayOtc, setRelayOtc] = useState();
  const [runOwner, setRunOwner] = useLocalStorage(runOwnerStorageKey);
  const [tokenBalance, setTokenBalance] = useState(0);

  const token_contract =
    "851841ac65cdc11642437f32e1c5f645150590045ee9bbf7106bfc64ebf9766b_o2";

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRelayOne(window.relayone);
      setRelayOtc(window.relayotc);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://staging-backend.relayx.com/api/token/${token_contract}/owners`
      );

      const [owner] = data.data.owners.filter((owner) => {
        return owner.paymail === relayPaymail;
      });

      if (relayPaymail && owner?.amount) {
        setTokenBalance(owner?.amount);
      } else {
        setTokenBalance(0);
      }
    })();
  }, [relayPaymail]);

  const isApp = useMemo(
    () => (relayOne && relayOne.isApp()) || false,
    [relayOne]
  );

  const relayAuthenticate = useCallback(async () => {
    if (!relayOne) {
      console.info({ relayOne, w: window.relayone });
      throw new Error("Relay script not yet loaded!");
    }

    // Test localStorage is accessible
    if (!lsTest()) {
      throw new Error("localStorage is not available");
    }

    const token = await relayOne.authBeta();

    if (token && !token.error) {
      const payloadBase64 = token.split(".")[0]; // Token structure: "payloadBase64.signature"
      const { paymail: returnedPaymail } = JSON.parse(atob(payloadBase64));
      setRelayPaymail(returnedPaymail);
      const owner = await relayOne?.alpha.run.getOwner();
      setRunOwner(owner);
    } else {
      throw new Error(
        "If you are in private browsing mode try again in a normal browser window. (Relay requires localStorage)"
      );
    }
  }, [relayOne, setRelayPaymail, setRunOwner]);

  const relaySend = useCallback(
    async (outputs) => {
      try {
        console.log("relay.send.outputs", outputs);
        let result = await relayOne.send(outputs);
        return result;
      } catch (error) {
        console.log("relayx.send.error", outputs, error);
        throw new Error(error);
      }
    },
    [relayOne]
  );

  // Auto Authenticate when inside the Relay app
  useEffect(() => {
    if (isApp) {
      relayAuthenticate();
    }
  }, [relayAuthenticate, isApp]);

  const relayLogout = () => {
    setRelayPaymail("");
    setRunOwner("");
    localStorage.removeItem(paymailStorageKey);
    localStorage.removeItem(runOwnerStorageKey);
  };

  const value = useMemo(
    () => ({
      relayOne,
      relayOtc,
      setRelayPaymail,
      relayPaymail,
      relayAuthenticate,
      authenticated: !!relayPaymail,
      relaySend,
      relayLogout,
      ready,
      tokenBalance,
      isApp,
      runOwner,
    }),
    [
      relayOne,
      relayOtc,
      setRelayPaymail,
      relayPaymail,
      relayAuthenticate,
      relaySend,
      relayLogout,
      ready,
      tokenBalance,
      isApp,
      runOwner,
    ]
  );

  return <RelayContext.Provider value={value} {...props} />;
};

const useRelay = () => {
  const context = useContext(RelayContext);
  if (context === undefined) {
    throw new Error("useRelay must be used within a RelayProvider");
  }
  return context;
};

export { RelayProvider, useRelay };

//
// Utils
//

const paymailStorageKey = "askbitcoin__RelayProvider_paymail";
const runOwnerStorageKey = "askbitcoin__RelayProvider_runOwner";
