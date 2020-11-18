import {useEffect, useState} from "react";
import axios from "axios";

const useFetch = url => {
  const _baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions(options)
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      return
    }

    axios(`${_baseUrl}${url}`, options)
      .then(res => {
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err.response.data)
        setError(err.response.data);
        setIsLoading(false);
      })
  }, [isLoading]);

  return [{isLoading, response, error}, doFetch]
};

export default useFetch;
