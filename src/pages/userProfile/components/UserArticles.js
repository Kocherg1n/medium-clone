import React, {useEffect} from 'react';
import {getPaginator, limit} from "../../../utils";
import {stringify} from "query-string";
import useFetch from "../../../hooks/useFetch";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";
import Feed from "../../../components/Feed";
import Pagination from "../../../components/Pagination";

const getApiUrl = ({userName, offset, isFavorite}) => {
  const params = isFavorite
    ? {limit, offset, favorited: userName}
    : {limit, offset, author: userName};

  return `/articles?${stringify(params)}`
};


const UserArticles = ({userName, isFavorite, location, url}) => {
  const {offset, currentPage} = getPaginator(location.search);
  const apiUrl = getApiUrl({userName, offset, isFavorite});
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorite]);

  return (
    <div>
      {isLoading && <Loading/>}
      {error && <Error/>}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles}/>
          <Pagination total={response.articlesCount} limit={limit} currentPage={currentPage} url={url}/>
        </>
      )}
    </div>
  );
};

export default UserArticles;
