import React, {useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import Feed from "../../components/Feed";
import Pagination from "../../components/Pagination";
import {getPaginator, limit} from "../../utils";
import FeedToggler from "../../components/FeedToggler";
import PopularTags from "../../components/PopularTags";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import {stringify} from "query-string";

const TagFeed = ({location, match}) => {
  const {currentPage, offset} = getPaginator(location.search);
  const tagName = match.params.slug;
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName
  });
  const [{isLoading, response, error}, doFetch] = useFetch(`/articles?${stringifiedParams}`);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]);

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
            <FeedToggler tagName={tagName}/>
            {isLoading && <Loading/>}
            {error && <Error/>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles}/>
                <Pagination currentPage={currentPage} limit={limit} total={response.articlesCount} url="/"/>
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags tagName={tagName}/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TagFeed;
