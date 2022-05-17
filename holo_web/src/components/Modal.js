import React from 'react';
import './Modal.css';


function InfoModal({open, close, msg}){
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className="infoModal">
          <button className="modalCloseButton" onClick={close}>&times;</button>
          <div>{msg}</div>
        </section>
      ) : null}
    </div>
  );
}

function InputModal({open, close, submit, msg}){
  var money = 0;
  function moneyChange(e) {
    money = e.target.value;
  }

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className="inputModal">
          <button className="modalCloseButton" onClick={close}>&times;</button>
          <div>{msg}</div>
          <div>
            <input type="number" min="0" onInput={(e)=>{e.target.value=e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')}}  onChange={moneyChange}></input>원
          </div>
          <div>
            <button className="modalFinButton" onClick={()=> {if(money>0){submit(money);}}}>확인</button>
            <button className="modalFinButton" onClick={close}>취소</button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function CheckModal({open, close, submit, msg}){
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className="checkModal">
          <button className="modalCloseButton" onClick={close}>&times;</button>
          <div>{msg}</div>
          <div>
            <button className="modalFinButton" onClick={submit}>확인</button>
            <button className="modalFinButton" onClick={close}>취소</button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ShowModal({type, open, close, submit, msg}) {
  switch(type){
    case "Info":
      return <InfoModal open={open} close={close} msg={msg}/>
    case "Input":
      return <InputModal open={open} close={close} submit={submit} msg={msg}/>
    case "Check":
      return <CheckModal open={open} close={close} submit={submit} msg={msg}/>
    default:
      return null
  }

}


const Modal = (props) => {
  const { type, open, close, submit } = props;
  const msg = props.children;

  return (
    <ShowModal type={type} open={open} close={close} submit={submit} msg={msg}></ShowModal>
  );
};

export default Modal;