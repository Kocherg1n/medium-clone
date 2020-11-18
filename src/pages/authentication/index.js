import React, {useContext, useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const Authentication = (props) => {
  const isLoginPage = props.location.pathname === '/login';
  const urlApi = isLoginPage ? '/users/login' : '/users';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);

  const [{isLoading, response, error}, doFetch] = useFetch(urlApi);
  const [token, setToken] = useLocalStorage('token');


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = isLoginPage ? {email, password} : {username, email, password};
    doFetch({
      method: 'POST',
      data: {
        user: userData
      }
    })
  };

  useEffect(() => {
    if (!response) {
      return
    }
    setToken(response.user.token);
    setIsSuccessfullSubmit(true);
  }, [response]);

  if (isSuccessfullSubmit) {
    return <Redirect to="/"/>
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            {isLoginPage ? <h1 className="text-xs-center">Sing in</h1> :
              <h1 className="text-xs-center">Sing up</h1>}
            <p className="text-xs-center">
              {isLoginPage ? <Link to="/register">Need to account?</Link> :
                <Link to="/register">Have to account?</Link>}
            </p>
            <form onSubmit={handleSubmit}>
              {
                !isLoginPage && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </fieldset>
                )
              }
              <fieldset className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled={isLoading}
              >
                {isLoginPage ? 'Sing in' : 'Sing up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
