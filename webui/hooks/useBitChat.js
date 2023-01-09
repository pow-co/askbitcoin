import useSWR from "swr";

const baseURL = "https://b.map.sv/q/";
//const baseURL = 'http://localhost:5200'

export const BASE = `${baseURL}`;

import axios from "../utils/axios";

export function fetcher(params) {
  return axios(params).then(({ data }) => {
    return data;
  });
}

export function useBitChat(path) {
  let {
    data,
    error,
    mutate: refresh,
    isValidating: loading,
  } = useSWR(`${BASE}${path}`, fetcher);

  return { data, error, refresh, loading };
}
