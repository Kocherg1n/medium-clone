import React, {useEffect} from 'react';
import useFetch from "../hooks/useFetch";
import classNames from 'classnames';

const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {
  const [{response}, doFetch] = useFetch(`/articles/${articleSlug}/favorite`);
  const favoriteCountWithResponse = response ? response.article.favoritesCount : favoritesCount;
  const isFavoritedWithResponse = response ? response.article.favorited : isFavorited;


  const btnClasses = classNames({
    'btn btn-sm': true,
    'btn-outline-primary': !isFavoritedWithResponse,
    'btn-primary': isFavoritedWithResponse,
  });

  const handleLike = (e) => {
    e.preventDefault();
    doFetch({
      method: isFavoritedWithResponse ? 'DELETE' : 'POST'
    })
  };

  return <button
    onClick={handleLike}
    className={btnClasses}
  >
    <i className="ion-heart">&nbsp;</i>
    <span>{favoriteCountWithResponse}</span>
  </button>
};

export default AddToFavorites;
