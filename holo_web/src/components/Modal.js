import React from 'react';
import './Modal.css';

const Modal = (props) => {
  const { open, close } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <button className="close" onClick={close}>
            &times;
          </button>
          <div>
            {props.children}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;