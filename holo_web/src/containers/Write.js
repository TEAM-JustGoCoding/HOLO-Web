import './Write.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';

function Write() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="headerBar">
        <Link className="linkFinButton" to='/'>
          <button className="finButton">취소</button>
        </Link>
        <button className="categoryButton">정보</button>
        <button className="finButton" onClick={openModal}>완료</button>
        <Modal open={modalOpen} close={closeModal}>
          게시글 작성이 완료되었어요!
        </Modal>
      </div>
      <div className="Write">
        <input type='text' placeholder='제목' spellcheck="false"/>
        <textarea placeholder='내용을 입력하세요.' spellcheck="false"/>
      </div>
    </div>
  );
}

export default Write;