import React, {useContext, useEffect, useState} from 'react';
import useFetch from "../../hooks/useFetch";
import {Link, Redirect} from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import TagList from "../../components/TagList";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


const Article = (props) => {
  const slug = props.match.params.slug;
  const [{
    isLoading: fetchArticleIsLoading,
    response: fetchArticleResponse,
    error: fetchArticleError
  }, doFetch] = useFetch(`/articles/${slug}`);
  const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(`/articles/${slug}`);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.currentUser) {
      return
    }
    return fetchArticleResponse.article.author.username === currentUserState.currentUser.username
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return
    }
    setIsSuccessfullDelete(true)
  }, [deleteArticleResponse]);

  const handleFollow = () => {
    console.log(fetchArticleResponse.article.author.username);
  }

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'DELETE'
    })
  };

  if (isSuccessfullDelete) {
    return <Redirect to="/"/>
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                <img src={fetchArticleResponse.article.author.image} alt=""/>
              </Link>
              <div className="info">
                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">{fetchArticleResponse.article.createdAt.slice(0, 10)}</span>
              </div>
              {/*<span>*/}
              {/*  <button*/}
              {/*    onClick={handleFollow}*/}
              {/*    className="btn btn-outline-secondary btn-sm">*/}
              {/*    <i className="ion-plus-round">*/}
              {/*  </i>&nbsp;Follow</button>*/}
              {/*  &nbsp;*/}
              {/*  <button className="btn btn-sm btn-outline-primary">*/}
              {/*    <i className="ion-heart">*/}
              {/*  </i>&nbsp;Favorite Article</button>*/}
              {/*</span>*/}
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                  >
                    Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading/>}
        {fetchArticleError && <Error/>}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div><p>{fetchArticleResponse.article.body}</p></div>
              <TagList tags={fetchArticleResponse.article.tagList}/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default Article;
