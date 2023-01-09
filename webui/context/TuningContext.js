import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../utils/storage";
import { useRouter } from "next/router";

import moment from "moment";

function ago(period) {
  return moment().subtract(1, period).unix() * 1000;
}

const TuningContext = createContext(undefined);
const filters = {
  "last-hour": ago("hour"),
  "last-day": ago("day"),
  "last-week": ago("week"),
  "last-month": ago("month"),
  "last-year": ago("year"),
  "all-time": 0,
};
const sort = {
  latest: -1,
  oldest: 1,
  boost: 0,
};
const tag = {
  all: "",
  problem: "1F9E9", //🧩
  idea: "1F4A1", //💡
  project: "1F48E", //💎
};
const TuneProvider = (props) => {
  const router = useRouter();
  const [filter, setFilter] = useLocalStorage(filterStorageKey, "all-time");
  const [zenMode, setZenMode] = useLocalStorage(zenModeStorageKey, false);
  const [locale, setLocale] = useLocalStorage(langStorageKey, "en");
  const [sort, setSort] = useLocalStorage(sortStorageKey, "latest");
  const [startTimestamp, setStartTimestamp] = useState(filters[filter]);
  const [tag, setTag] = useState("question");
  //const [endTimestamp, setEndTimestamp] = useState(moment.now().unix());

  useEffect(() => {
    switch (router.pathname) {
      case "/":
      case "/questions":
        //setTag("1F9E9");
        setTag("question");
        break;
      case "/answers":
        //setTag("1F4A1");
        setTag("answer");
        break;
      case "/projects":
        //setTag("1F48E");
        setTag("project");
        break;
      case "/test":
        setTag("test");
        break;
      default:
        setTag("question");
    }

    setStartTimestamp(filters[filter]);
  }, [filter, sort, router]);

  const value = useMemo(
    () => ({
      filter,
      setFilter,
      locale,
      setLocale,
      sort,
      setSort,
      tag,
      setTag,
      zenMode,
      setZenMode,
      startTimestamp,
    }),
    [
      filter,
      setFilter,
      locale,
      setLocale,
      sort,
      setSort,
      tag,
      setTag,
      startTimestamp,
      zenMode,
      setZenMode,
    ]
  );

  return <TuningContext.Provider value={value} {...props} />;
};

const useTuning = () => {
  const context = useContext(TuningContext);
  if (context === undefined) {
    throw new Error("useTuning must be used within a TuningProvider");
  }
  return context;
};

export { TuneProvider, useTuning };

//
// Utils
//

const filterStorageKey = "askbitcoin__TuneProvider_filter";
const sortStorageKey = "askbitcoin__TuneProvider_sort";
const zenModeStorageKey = "askbitcoin__TuneProvider_zenMode";
const langStorageKey = "askbitcoin__TuneProvider_lang";
