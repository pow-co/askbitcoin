import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import {
  Drawer,
  PanelLayout,
  ThreeColumnLayout,
  WalletProviderPopUp,
} from "../components";
import { useRelay } from "../context/RelayContext";
import TuningPanel from "../components/TuningPanel";
import { useBitcoin } from "../context/BitcoinContext";

import { FormattedMessage } from "react-intl";
import LocaleSelect from "../components/LocaleSelect";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { logout, authenticated } = useBitcoin();
  const [isDark, setIsDark] = useState(theme === "dark");
  const [walletPopupOpen, setWalletPopupOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      setIsDark(true);
    }
    if (theme === "light") {
      setIsDark(false);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    }
    if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <PanelLayout>
      <div className="mx-auto max-w-xl col-span-12 lg:col-span-6 min-h-screen flex flex-col ">
        <div className="mt-7  p-4  ">
          <div className="bg-gray-100 dark:bg-gray-600 p-5 flex flex-col cursor-pointer my-4 rounded-lg">
            <p className="text-base font-semibold mb-2 text-gray-700 dark:text-white">
              <FormattedMessage id="Tuning Panel" />
            </p>
            <TuningPanel />
          </div>
          {/* <div
            onClick={() => setWalletPopupOpen(true)}
            className="bg-gray-100 dark:bg-gray-600 p-5 flex items-center h-[78px] cursor-pointer my-4 rounded-lg"
          >
            <div className="flex flex-col">
              <p className="text-base font-semibold my-0.5 text-gray-700 dark:text-white">
                Select Wallet Provider
              </p>
              <p className="text-gray-400 dark:text-gray-300 text-sm tracking-normal	text-left my-0.5">
                Choose your way to interact with our app
              </p>
            </div>
            <div className="grow" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div> */}
          <div className="bg-gray-100 dark:bg-gray-600 p-5 flex items-center h-[78px] cursor-pointer my-4 rounded-lg">
            <div className="flex flex-col">
              <p className="text-base font-semibold my-0.5 text-gray-700 dark:text-white">
                <FormattedMessage id="Dark Mode" />
              </p>
              <p className="text-gray-400 dark:text-gray-300 text-sm tracking-normal	text-left my-0.5">
                <FormattedMessage id="Toggle between dark and light mode" />
              </p>
            </div>
            <div className="grow" />
            <div className="relative">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    id="toggleTheme"
                    type="checkbox"
                    className="sr-only"
                    checked={isDark}
                    onChange={toggleTheme}
                  />
                  <div className="w-10 toggle h-4 bg-gray-400 rounded-full shadow-inner"></div>
                  <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                </div>
              </label>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-600 p-5 flex items-center h-[78px] cursor-pointer my-4 rounded-lg">
            <div className="flex flex-col">
              <p className="text-base font-semibold my-0.5 text-gray-700 dark:text-white">
                <FormattedMessage id="Language settings" />
              </p>
              <p className="text-gray-400 dark:text-gray-300 text-sm tracking-normal	text-left my-0.5">
                <FormattedMessage id="Interact with this app in your language" />
              </p>
            </div>
            <div className="grow" />
            <div className="relative">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <LocaleSelect />
                </div>
              </label>
            </div>
          </div>
          <button
            disabled={!authenticated}
            onClick={logout}
            className="h-[52px] p-5 flex bg-red-500 text-white text-base font-semibold my-4 w-full border-none rounded-lg cursor-pointer items-center justify-center transition duration-500 transform hover:-translate-y-1 hover:bg-red-600"
          >
            <FormattedMessage id="Log out" />
          </button>
        </div>
        <div className="grow" />
        {/* <p className="mb-[68px] text-center text-xs text-gray-700 dark:text-gray-300 font-semibold ">
          Built for profit by
          <a
            href="https://twetch.com/u/652"
            target="_blank"
            rel="noreferrer"
            className="ml-1 cursor-pointer hover:underline"
          >
            @652
          </a>
          , powered by BitCoin
        </p> */}
      </div>
      <Drawer
        selector="#walletProviderPopupControler"
        isOpen={walletPopupOpen}
        onClose={() => setWalletPopupOpen(false)}
      >
        <WalletProviderPopUp onClose={() => setWalletPopupOpen(false)} />
      </Drawer>
    </PanelLayout>
  );
}
