import classes from './Modal.module.css';

function Modal({ children, onClose, modalIsVisible }) {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose} />
      <dialog className={classes.modal} open={modalIsVisible}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
