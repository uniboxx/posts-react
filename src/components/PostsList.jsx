import { useState } from 'react';
import classes from './PostsList.module.css';
import { Client, Databases, ID } from 'appwrite';

import Modal from './Modal';
import NewPost from './NewPost';
import Post from './Post';
import { useEffect } from 'react';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66eedd2f001dc1185030');
const dbId = '66eee091000c6c0a41b0';
const collId = '66eee09a003c7dca585b';
const databases = new Databases(client);

function PostsList({ modalIsVisible, onClose }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);
      try {
        const posts = await databases.listDocuments(dbId, collId);
        // console.log(posts.documents);
        setIsLoading(false);
        setPosts(posts.documents);
      } catch (err) {
        console.error(err.message);
      }
    }
    getPosts();
  }, []);

  async function handleCreateNewPost(data) {
    try {
      const id = ID.unique();
      setIsLoading(true);
      const result = await databases.createDocument(dbId, collId, id, data);
      const newPost = { ...data, $id: id };
      // console.log(result);
      setPosts(prev => [newPost, ...prev]);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      {modalIsVisible && (
        <Modal onClose={onClose} modalIsVisible={modalIsVisible}>
          <NewPost onClose={onClose} onCreateNewPost={handleCreateNewPost} />
        </Modal>
      )}
      {isLoading ? (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Loading...</h2>
        </div>
      ) : posts.length ? (
        <ul className={classes.posts}>
          {posts.map(post => (
            <Post key={post.$id} author={post.author}>
              {post.body}
            </Post>
          ))}
        </ul>
      ) : (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
