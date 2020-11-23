import React, {useContext, useEffect, useState} from 'react';
import ArticleForm from "../../components/ArticleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const EditArticle = ({match}) => {
  const slug = match.params.slug;
  const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(`/articles/${slug}`);
  const [{response: updateArticleResponse, error: updateArticleError}, doUpdateArticle] = useFetch(`/articles/${slug}`);
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const handleSubmit = article => {
    doUpdateArticle({
      method: 'PUT',
      data: {
        article
      }
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [fetchArticleResponse, doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }
    setInitialValues({
      title: fetchArticleResponse.article.title,
      body: fetchArticleResponse.article.body,
      description: fetchArticleResponse.article.description,
      tagList: fetchArticleResponse.article.tagList
    })
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }
    setIsSuccessfullSubmit(true)
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/"/>
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${slug}`}/>
  }

  return <div>
    <ArticleForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
    />
  </div>
};

export default EditArticle;
