import React, {useEffect} from 'react';
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import Error from "./Error";
import {Link} from "react-router-dom";

const PopularTags = () => {
  const [{isLoading, response, error}, doFetch] = useFetch('/tags');

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) {
    return <Loading/>
  }

  if (error) {
    return <Error/>
  }

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <ul className="tag-list">
        {
          response.tags.map(tag => (
            <Link to={`/tags/${tag}`} key={tag} className="tag-default tag-pill">{tag}</Link>
          ))
        }
      </ul>
    </div>
  );
};

export default PopularTags;
