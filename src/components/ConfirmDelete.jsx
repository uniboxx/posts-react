import { useState } from 'react';
import classes from './ConfirmDelete.module.css';

function ConfirmDelete(props) {
  const [deleting, setDeleting] = useState(false);

  function handleDeleting() {
    setDeleting(true);
    props.onDelete();
  }

  return (
    <div className={classes.container}>
      {deleting ? (
        <p style={{ textAlign: 'center', fontSize: '1.4rem' }}>Deleting...</p>
      ) : (
        <>
          <h1>Conferma cancellazione</h1>
          <p>Sei sicuro di voler cancellare questo post?</p>
          <div className={classes.actions}>
            <button name="canc" onClick={props.onCancel}>
              Cancel
            </button>
            <button name="ok" onClick={handleDeleting}>
              Ok
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ConfirmDelete;
