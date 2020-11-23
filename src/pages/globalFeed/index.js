import React, {useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import Feed from "../../components/Feed";
import Pagination from "../../components/Pagination";
import {getPaginator, limit} from "../../utils";
import FeedToggler from "../../components/FeedToggler";
import PopularTags from "../../components/PopularTags";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const GlobalFeed = ({location}) => {
  const {currentPage, offset} = getPaginator(location.search);
  const [{isLoading, response, error}, doFetch] = useFetch(`/articles?limit${limit}&offset=${offset}`);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading/>}
            {error && <Error/>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles}/>
                <Pagination
                  currentPage={currentPage}
                  limit={limit}
                  total={response.articlesCount}
                  url="/"
                />
              </>
              )}
          </div>
          <div className="col-md-3">
            <PopularTags/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default GlobalFeed;
