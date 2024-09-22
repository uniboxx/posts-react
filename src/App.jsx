import { useState } from 'react';
import MainHeader from './components/MainHeader';
import PostsList from './components/PostsList';

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function handleCreatePost() {
    setModalIsVisible(true);
  }

  function handleCloseModal() {
    setModalIsVisible(false);
  }

  return (
    <>
      <MainHeader onCreatePost={handleCreatePost} />
      <main>
        <PostsList modalIsVisible={modalIsVisible} onClose={handleCloseModal} />
      </main>
    </>
  );
}

export default App;
