import useSWR from "swr";

const baseURL = "https://onchain.sv";
//const baseURL = "http://localhost:5200";

export const BASE = `${baseURL}/api/v1`;

const askbitcoin_onchain_app_id = "1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN";

import axios from "../utils/axios";

//const axiosInstance = axios.create({ baseURL: process.env.HOST_API_KEY || '' });
const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

export function fetcher(params) {
  return axios(params).then(({ data }) => {
    return data;
  });
}

export function useOnchain(path, queryParams) {
  //https://onchain.sv/api/v1/events?app=1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN&type=question
  let params = queryParams || "";
  let {
    data,
    error,
    mutate: refresh,
    isValidating: loading,
  } = useSWR(
    `${BASE}${path}?app=${askbitcoin_onchain_app_id}&${params}`,
    fetcher
  );

  return { data, error, refresh, loading };
}
