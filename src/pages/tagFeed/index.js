import React, {useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import Feed from "../../components/Feed";
import Pagination from "../../components/Pagination";
import {getPaginator, limit} from "../../utils";
import FeedToggler from "../../components/FeedToggler";

const TagFeed = ({location}) => {
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
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error...</div>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles}/>
                <Pagination currentPage={currentPage} limit={limit} total={response.articlesCount} url="/"/>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default TagFeed;
