import './Write.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import Modal from '../components/Modal';

function DocumentWrite() {
  return(
    <div id="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false"/>
      <textarea id="content" className="documentContent" placeholder='내용을 입력하세요.' spellCheck="false"/>
    </div>
  )
}
function OTTWrite(){
  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false"/>
      <input type='text' id="date" placeholder='구매 일시' spellCheck="false"/>
      <input type='text' id="buyLocation" className="contentInput" placeholder='OTT 플랫폼' spellCheck="false"/>
      <input type='text' id="accumulate" className="contentInput" placeholder='목표 인원' spellCheck="false"/>
      <textarea id="content" className="ottContent" placeholder='내용을 입력하세요.' spellCheck="false"/>
    </div>
  )
}
function DeliveryWrite() {
  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false"/>
      <input type='text' id="date" placeholder='구매 일시' spellCheck="false"/>
      <input type='text' id="buyLocation" placeholder='구매처' spellCheck="false"/>
      <input type='text' id="accumulate" placeholder='목표 금액' spellCheck="false"/>
      <input type='text' id="pickupLocation" placeholder='픽업 위치' spellCheck="false"/>
      <textarea id="content" className="deliveryContent" placeholder='내용을 입력하세요.' spellCheck="false"/>
    </div>
  )
}
function ShowInput(props) {
  switch(props.category){
    case "정책":
    case "생활백서":   
      return <DocumentWrite/>;
    case "OTT구독":
      return <OTTWrite/>;
    case "공동구매":
      return <DeliveryWrite/>;
    default:
      return null
  }
}

function Write() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("정책");
  const [dropdownOpen, setDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const goBack = () => {
    navigate(-1)
  };
  const openDropdown = () => {
    setDropdown(true);
  };
  const closeDropdown = (selectCategory) => {
    setDropdown(false);
    setCategory(selectCategory);
  };
  const openModal = () => {
    setModalOpen(true);
    console.log(document.getElementById('title').value)
  };
  const closeModal = () => {
    setModalOpen(false);
    goBack();
  };

  return (
    <div>
      <div className="writeHeaderBar">
        <button className="finButton" onClick={goBack}>취소</button>
        <button className="categoryButton" onClick={openDropdown}>{category}</button>
        <Dropdown open={dropdownOpen} close={closeDropdown}></Dropdown>
        <button className="finButton" onClick={openModal}>완료</button>
        <Modal open={modalOpen} close={closeModal}>
          게시글 작성이 완료되었어요!
        </Modal>
      </div>
      <ShowInput category={category}></ShowInput>
    </div>
  );
}

export default Write;