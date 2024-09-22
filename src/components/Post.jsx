import classes from './Post.module.css';

function Post(props) {
  return (
    <>
      <li className={classes.post} onClick={props.onClick}>
        <p className={classes.author}>{props.author}</p>
        <p className={classes.text}>{props.children}</p>
      </li>
    </>
  );
}

export default Post;
