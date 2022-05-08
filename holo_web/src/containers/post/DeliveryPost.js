import './Post.css';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import Modal from '../../components/Modal';
import {images} from '../../images';
import { AiOutlineEye } from "react-icons/ai";
import { FaRegLaugh, FaRegLaughSquint } from "react-icons/fa";

const user = "댕댕"
const title = "오늘밤에 맥도날드 드실 분 ㅠㅅㅠ!"
const content = "오늘 밤에 맥도날드 드실 분 있나요?\n최소 주문 금액이 부족해서 슬픕니다...\n저는 맥스파이시 상하기 버거 세트 1개랑\n더블 불고기 버거 세트 1개 먹을 거에요 ㅎㅎ"
const reg_date = "2022-04-06 08:23:17"
const limit_date = "2022-04-06 20:00"
const buy_location = "맥도날드"
const pickup_location = "거의동 금오공대 푸름관 3동 앞"
const goal = "20,000"
const accumulate = "12,000"
const view = "3"

function Post() {
  const {id} = useParams();
  const [participation, setParticipation] = useState(false);
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const msg = "\n공동구매에 참여할 금액을 작성해주세요.\n입력하신 금액은 참여 현황에 반영됩니다.\n추후 수정은 불가능합니다.\n신중하게 작성해주세요!";
  const submitModal = (money) => {
    setInputModalOpen(false);
    setParticipation(true);
    console.log(money+"원! 공동구매 금액 추가!")
    //공동구매 참여 DB 반영
  };

  return (
    <div>
      <div className="postHeaderBar">
        <div>공동구매</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postUser"><img src={images.user} alt="User"/>{user}</div>
      <div className="postRegDate">{reg_date}</div>
      <div className="postContent">
        <div className="postDealContent">
            구매 일시: {limit_date} <br/>
            구매처: {buy_location} <br/>
            픽업 위치: {pickup_location} <br/>
            목표 금액: {goal} <br/>
            달성 금액: {accumulate}
        </div>
        {content}
        <div className="postEtc">
          {participation
              ? <button className="participationButton pink" onClick={() => { setInfoModalOpen(true); }}><FaRegLaughSquint/>   참여 완료!</button>
              : <button className="participationButton skyblue" onClick={() => { setInputModalOpen(true); }}><FaRegLaugh/>   참여 신청!</button>
          }
          <Modal type="Input" open={inputModalOpen} close={() => {setInputModalOpen(false);}} submit={submitModal}>
            {msg}
          </Modal>
          <Modal type="Info" open={infoModalOpen} close={() => {setInfoModalOpen(false);}}>
            이미 참여한 게시글이에요!
          </Modal>
          <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
        </div>
      </div>
    </div>
  );
}

export default Post;