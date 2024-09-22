import { useState } from 'react';
import classes from './PostsList.module.css';
import { Client, Databases, ID, Query } from 'appwrite';

import Modal from './Modal';
import NewPost from './NewPost';
import Post from './Post';
import { useEffect } from 'react';
import ConfirmDelete from './ConfirmDelete';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66eedd2f001dc1185030');
const dbId = '66eee091000c6c0a41b0';
const collId = '66eee09a003c7dca585b';
const databases = new Databases(client);

function PostsList({ modalIsVisible, onClose, onShowModal }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Loading...');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [isUpdatingId, setIsUpdatingId] = useState(null);
  const [postToUpdate, setPostToUpdate] = useState(null);

  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);
      setLoadingMsg('Loading...');
      try {
        const result = await databases.listDocuments(dbId, collId, [
          Query.orderDesc('$createdAt'),
        ]);
        // console.log(result);
        setPosts(result?.documents);
        setIsLoading(false);
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
      setLoadingMsg('Creating Post...');
      const result = await databases.createDocument(dbId, collId, id, data);
      const newPost = { ...data, $id: id };
      // console.log(result);
      setPosts(prev => [newPost, ...prev]);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleDeletePost(id) {
    try {
      // setIsDeletingId(id);
      setLoadingMsg('Deleting...');
      const result = await databases.deleteDocument(dbId, collId, id);
      setPosts(prev => prev.filter(post => post.$id !== id));
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsDeletingId(null);
      setIsDeleting(false);
      onClose();
    }
  }

  function handleConfirmDelete(id) {
    // const deleting = confirm('Sei sicuro di voler cancellare il post?');
    // if (deleting) {
    //   props.onDelete();
    // }
    setIsDeleting(true);
    setIsDeletingId(id);
    onShowModal();
  }

  async function handleGetPost(id) {
    try {
      const result = await databases.getDocument(dbId, collId, id);
      setPostToUpdate(result);
      // console.log(result);
      onShowModal();
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleUpdatePost(id, formData) {
    try {
      setIsLoading(true);
      setLoadingMsg('Updating...');
      const result = await databases.updateDocument(dbId, collId, id, formData);

      // console.log(result);
      const index = posts.findIndex(post => post.$id === id);
      setPosts(prev => {
        prev[index] = result;
        return [...prev];
      });
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      {(modalIsVisible || isUpdatingId) && (
        <Modal onClose={onClose} modalIsVisible={modalIsVisible}>
          {isDeleting ? (
            <ConfirmDelete
              onCancel={() => {
                setIsDeleting(false);
                setIsDeletingId(null);
                onClose();
              }}
              onDelete={() => handleDeletePost(isDeletingId)}
            />
          ) : (
            <NewPost
              onClose={() => {
                setPostToUpdate(null);
                onClose();
              }}
              onCreateNewPost={handleCreateNewPost}
              isUpdatingId={isUpdatingId}
              setIsUpdatingId={setIsUpdatingId}
              postToUpdate={postToUpdate}
              onUpdatePost={handleUpdatePost}
              setPostToUpdate={setPostToUpdate}
            />
          )}
        </Modal>
      )}
      {isLoading ? (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>{loadingMsg}</h2>
        </div>
      ) : posts.length ? (
        <ul className={classes.posts}>
          {posts.map(post => (
            <Post
              modalIsVisible={modalIsVisible}
              onClose={onClose}
              onGetPost={() => handleGetPost(post.$id)}
              onConfirmDelete={() => handleConfirmDelete(post.$id)}
              key={post.$id}
              author={post.author}
              onDelete={() => handleDeletePost(post.$id)}
            >
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
