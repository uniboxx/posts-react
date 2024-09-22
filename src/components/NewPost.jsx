import { useState } from 'react';
import classes from './NewPost.module.css';

function NewPost({
  onClose,
  onCreateNewPost,
  onUpdatePost,
  postToUpdate,
  setPostToUpdate,
}) {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');
  // console.log(postToUpdate.body);

  function handleChangeBody(event) {
    setEnteredBody(event.target.value);
  }
  function handleChangeAuthor(event) {
    setEnteredAuthor(event.target.value);
  }

  function handleClearFields() {
    setEnteredAuthor('');
    setEnteredBody('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    if (!formData.body || !formData.author) return;

    if (postToUpdate?.$id) {
      onUpdatePost(postToUpdate.$id, formData);
      setPostToUpdate(null);
    } else {
      onCreateNewPost(formData);
    }

    handleClearFields();
    onClose();
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea
          id="body"
          required
          rows={3}
          defaultValue={postToUpdate?.body || ''}
          onChange={handleChangeBody}
          name="body"
        />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          name="author"
          required
          defaultValue={postToUpdate?.author || ''}
          onChange={handleChangeAuthor}
        />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
