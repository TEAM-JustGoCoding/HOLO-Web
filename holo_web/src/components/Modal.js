import React from 'react';
import { Table } from 'react-bootstrap';
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

function DealModal({open, close, submit, refuse, list}){
  return(
    <div className={open ? 'openModal modal' : 'modal'}>
    {open ? (
      <section className="dealModal">
        <button className="modalCloseButton" onClick={close}>&times;</button>
        <div><span>모집 현황</span></div>
        <div style={{height: '60%', overflow: 'auto'}}>
          <Table borderless>
            <tbody>
              {list.map(list=>(
                <tr key={list.mail}>
                  <td>{list.user}</td>
                  <td>{list.score}/5점</td>
                  <td>{list.deal_count}회</td>
                  {list.money
                  ?<td>{list.money}원</td>
                  :null
                  }
                  <td><button style={{borderRadius: '5px'}} onClick={()=>{refuse(list.mail)}}>거절</button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div><button className="modalSuccessButton" onClick={submit}>모집 마감</button></div>
      </section>
    ) : null}
  </div>
  )
}

function InputModal({open, close, submit, msg}){
  var money = 0;
  function moneyChange(e) {
    if (e.target.value.length > 7){
      e.target.value = parseInt(String(e.target.value).slice(0,7));
    }
    money = e.target.value;
  }
  
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className="inputModal">
          <button className="modalCloseButton" onClick={close}>&times;</button>
          <div>{msg}</div>
          <div>
            <input type="number" min="0" max="1000000" onInput={(e)=>{e.target.value=e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')}} onChange={moneyChange} maxLength='7'></input>원
          </div>
          <div>
            <button className="modalFinButton" onClick={()=> {submit(parseInt(money));}}>확인</button>
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

function ShowModal({type, open, close, submit, refuse, list, msg}) {
  switch(type){
    case "Info":
      return <InfoModal open={open} close={close} msg={msg}/>
    case "Deal":
      return <DealModal open={open} close={close} submit={submit} refuse={refuse} list={list}/>
    case "Input":
      return <InputModal open={open} close={close} submit={submit} msg={msg}/>
    case "Check":
      return <CheckModal open={open} close={close} submit={submit} msg={msg}/>
    default:
      return null
  }

}


const Modal = (props) => {
  const {type, open, close, submit, refuse, list} = props;
  const msg = props.children;

  return (
    <ShowModal type={type} open={open} close={close} submit={submit} refuse={refuse} list={list} msg={msg}></ShowModal>
  );
};

export default Modal;