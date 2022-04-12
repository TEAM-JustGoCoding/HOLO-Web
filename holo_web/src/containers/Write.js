import './Write.css';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

function Write() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const goBack = () => {
    navigate(-1)
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    goBack();
  };

  return (
    <div>
      <div className="writeHeaderBar">
        <button className="finButton" onClick={goBack}>취소</button>
        <button className="categoryButton">정보</button>
        <button className="finButton" onClick={openModal}>완료</button>
        <Modal open={modalOpen} close={closeModal}>
          게시글 작성이 완료되었어요!
        </Modal>
      </div>
      <div className="Write">
        <input type='text' placeholder='제목' spellCheck="false"/>
        <textarea placeholder='내용을 입력하세요.' spellCheck="false"/>
      </div>
    </div>
  );
}

export default Write;