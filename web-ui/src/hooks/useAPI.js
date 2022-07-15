
import useSWR from 'swr';

export const DOMAIN = 'localhost:5200'

export const BASE = `http://${DOMAIN}/api/v1`;
//export const BASE = `https://askbitcoin.ai/api/v1`;

import axios from '../utils/axios'

//const axiosInstance = axios.create({ baseURL: process.env.HOST_API_KEY || '' });
const axiosInstance = axios.create({ baseURL: 'https://askbitcoin.ai' });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;


export function fetcher(params) {
    return axios(params).then(({data}) => {
        return data;
    })
}

export function useAPI(path) {

    let {data, error, mutate: refresh, isValidating: loading} = useSWR(`${BASE}${path}`, fetcher)
    
    return { data, error, refresh, loading}

}
