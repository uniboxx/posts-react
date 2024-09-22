import { useState } from 'react';
import MainHeader from './components/MainHeader';
import PostsList from './components/PostsList';

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function handleHideModal() {
    setModalIsVisible(false);
  }

  function handleShowModal() {
    setModalIsVisible(true);
  }

  return (
    <>
      <MainHeader onCreatePost={handleShowModal} />
      <main>
        <PostsList
          modalIsVisible={modalIsVisible}
          onClose={handleHideModal}
          onShowModal={handleShowModal}
        />
      </main>
    </>
  );
}

export default App;
