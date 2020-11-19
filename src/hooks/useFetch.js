import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

const useFetch = url => {
  const _baseUrl = 'https://conduit.productionready.io/api';

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('Token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, [])

  useEffect(() => {
    const requestOptions = {
      ...options,
      headers: {
        authorization: token ? `Token ${token}` : ''
      }
    };
    if (!isLoading) {
      return
    }

    axios(`${_baseUrl}${url}`, requestOptions)
      .then(res => {
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.response.data);
        setIsLoading(false);
      })
  }, [isLoading]);

  return [{isLoading, response, error}, doFetch]
};

export default useFetch;
