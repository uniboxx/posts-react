import classes from './Post.module.css';

function Post(props) {
  return (
    <>
      <li className={classes.post}>
        <p className={classes.author}>{props.author}</p>
        <p className={classes.text}>{props.children}</p>
        <div className={classes.actions}>
          <button name="del" onClick={props.onConfirmDelete}>
            Delete
          </button>
          <button name="edit" onClick={props.onGetPost}>
            Edit
          </button>
        </div>
      </li>
    </>
  );
}

export default Post;
