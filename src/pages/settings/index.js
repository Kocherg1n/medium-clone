import React, {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import useFetch from "../../hooks/useFetch";
import BackendErrorMessages from "../../components/BackendErrorMessages";
import useLocalStorage from "../../hooks/useLocalStorage";
import {Redirect} from "react-router-dom";

const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const [{response, error}, doFetch] = useFetch('/user');

  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessfullLogout, setIsSuccessfullLogout] = useState(false);
  const [, setToken] = useLocalStorage('Token');

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return;
    }

    setImage(currentUserState.currentUser.image);
    setUsername(currentUserState.currentUser.username);
    setBio(currentUserState.currentUser.bio);
    setEmail(currentUserState.currentUser.email);

  }, [currentUserState.currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    doFetch({
      method: 'PUT',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username,
          bio,
          email,
          password
        }
      }
    })
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({type: 'IS_AUTHORIZED', payload: response.user});
  }, [response, dispatch]);

  const logout = (e) => {
    e.preventDefault();
    setToken('');
    dispatch({type: 'LOGOUT'});
    setIsSuccessfullLogout(true);
  };

  if (isSuccessfullLogout) {
    return <Redirect to="/" />
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors}/>}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL or profile picture"/>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"/>
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short biography">
                  </textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"/>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"/>
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr/>
            <button
              className="btn btn-outline-danger"
              onClick={logout}
            >
              Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
