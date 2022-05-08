import React from 'react';
import './Modal.css';


function InfoModal({open, close, msg}){
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <button className="close" onClick={close}>
            &times;
          </button>
          <div>
            {msg}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function InputModal({open, close, msg}){
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <button className="close" onClick={close}>
            &times;
          </button>
          <div>
            {msg}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ShowModal({type, open, close, msg}) {
  switch(type){
    case "Info":
      return <InfoModal open={open} close={close} msg={msg}/>
    case "Input":
      return <InputModal open={open} close={close} msg={msg}/>
    default:
      return null
  }

}


const Modal = (props) => {
  const { type, open, close } = props;
  const msg = props.children;

  return (
    <ShowModal type={type} open={open} close={close} msg={msg}></ShowModal>
  );
};

export default Modal;