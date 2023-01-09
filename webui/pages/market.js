import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Loader, PanelLayout, ThreeColumnLayout } from "../components";
import MarketItem from "../components/MarketItem";
import { fetcher } from "../hooks/useAPI";

const Market = () => {
  const { data, loading, error } = useSWR(
    "https://staging-backend.relayx.com/api/market/851841ac65cdc11642437f32e1c5f645150590045ee9bbf7106bfc64ebf9766b_o2/items",
    fetcher
  );

  if (error) {
    return (
      <PanelLayout>
        <div className="mt-4 lg:mt-10">Error</div>
      </PanelLayout>
    );
  }

  if (!data) {
    return (
      <PanelLayout>
        <div className="mt-4 lg:mt-10">
          <Loader />
        </div>
      </PanelLayout>
    );
  }

  const { items, token } = data.data;

  return (
    <>
      <PanelLayout>
        <div className="mb-[200px] min-h-screen">
          <div className="w-full flex flex-col items-center mt-6 sm:mt-0">
            <div
              style={{
                backgroundImage: `url("https://dogefiles.twetch.app/d2cc17631efb77d913d3eed565d3ca1be09f7fa9f8ca350716d5b8d66f361120")`,
              }}
              className="w-full sm:w-screen h-[320px] rounded-lg sm:rounded-none bg-cover bg-center select-none"
            ></div>
            <div className="z-1 rounded-full -mt-[120px] flex items-center justify-center p-3 bg-bottom	bg-blend-screen bg-blend-overlay bg-blend-hard-light bg-blend-color-burn bg-blend-color-dodge bg-blend-normal bg-gradient-to-r from-pink-500 to-gray-500">
              <img
                src={`https://berry2.relayx.com/${token.icon.berry}`}
                className="h-[224px] w-[224px] rounded-full"
              />
            </div>
            <p className="mt-6 text-2xl font-bold text-center px-4">
              {token.name}
            </p>
            <p className="select-none text-center px-4 text-gray-700 dark:text-gray-300">
              {token.description}
            </p>
          </div>
          <div className="mt-[50px] sm:mt-2 p-4 ">
            <div className="flex">
              <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                  <MarketItem key={item.txid} item={item} token={token} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </PanelLayout>
    </>
  );
};

export default Market;
