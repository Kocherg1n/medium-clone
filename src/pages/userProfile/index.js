import React, {useContext, useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import {Link, NavLink} from "react-router-dom";
import UserArticles from "../../pages/userProfile/components/UserArticles";
import Loading from "../../components/Loading";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const UserProfile = ({location, match}) => {
  const isFavorite = location.pathname.includes('favorite');
  const slug = match.params.slug;
  const [{response: fetchProfileResponse}, doFetch] = useFetch(`/profiles/${slug}`);
  const [{response: responseFollow, isLoading}, doFollow] = useFetch(`/profiles/${slug}/follow`);
  const [currentUserState] = useContext(CurrentUserContext);

  useEffect(() => {
    doFetch();
  }, [responseFollow]);

  const isUserProfile = () => {
    return fetchProfileResponse.profile.username === currentUserState.currentUser.username
  };

  const isFollow = () => {
    return fetchProfileResponse.profile.following;
  };

  const handleToggleFollow = () => {
    doFollow({
      method: isFollow() ? 'DELETE' : 'POST'
    })
  };

  if (!fetchProfileResponse || !currentUserState.currentUser) {
    return <Loading/>
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" src={fetchProfileResponse.profile.image} alt=""/>
              <h4>{fetchProfileResponse.profile.username}</h4>
              <p>{fetchProfileResponse.profile.bio}</p>
              {isUserProfile() && (
                <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a"></i>
                  &nbsp;
                  Edit Profile Settings
                </Link>
              )}
            </div>
            <div className="col-xs-12 col-md-10 offset-md-1">
              {isFollow()
                ? (
                  <button
                    onClick={handleToggleFollow}
                    className="btn btn-secondary btn-sm pull-xs-right" disabled={isLoading}>
                    <i className="ion-plus-round">
                    </i>&nbsp;Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleToggleFollow}
                    className="btn btn-outline-secondary btn-sm pull-xs-right" disabled={isLoading}>
                    <i className="ion-plus-round">
                    </i>&nbsp;Follow
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink exact className="nav-link" to={`/profiles/${fetchProfileResponse.profile.username}`}>My
                    Articles</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/profiles/${fetchProfileResponse.profile.username}/favorites`}>Favorited
                    Articles</NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              userName={fetchProfileResponse.profile.username}
              isFavorite={isFavorite}
              location={location}
              url={match.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
