import React, {useContext, useEffect, useState} from 'react';
import ArticleForm from "../../components/ArticleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const CreateArticle = () => {
  const [{response, error}, doFetch] = useFetch(`/articles`);
  const [currentUserState] = useContext(CurrentUserContext);
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  useEffect(() => {
    if (!response) {
      return;
    }
    setIsSuccessfulSubmit(true);
  }, [response]);

  if (isSuccessfulSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`}/>
  }

  if (!currentUserState.isLoggedIn) {
    return <Redirect to="/"/>
  }

  const handleSubmit = article => {
    doFetch({
      method: 'POST',
      data: {
        article
      }
    })
  };

  return <ArticleForm
    errors={(error && error.errors) || {}}
    initialValues={initialValues}
    onSubmit={handleSubmit}
  />
};

export default CreateArticle;
