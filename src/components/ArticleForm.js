import React, {useEffect, useState} from 'react';
import BackendErrorMessages from "./BackendErrorMessages";

const ArticleForm = ({onSubmit, errors, initialValues}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [tagList, setTagList] = useState('');

  useEffect(()=> {
    if (!initialValues) {
      return;
    }
    setTitle(initialValues.title)
    setBody(initialValues.body)
    setDescription(initialValues.description)
    setTagList(initialValues.tagList.join(' '))

  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const article = {
      title,
      body,
      description,
      tagList
    };
    onSubmit(article);
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <BackendErrorMessages backendErrors={errors}/>}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Article title..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="What is this article about..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Write your article"
                    rows="8"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Enter tags.."
                    value={tagList}
                    onChange={e => setTagList(e.target.value)}
                  />
                </fieldset>
                <fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xl-right"
                    type="submit">Publish Article
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
