import './Post.css';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import Modal from '../../components/Modal';
import {images} from '../../images';
import { AiOutlineEye } from "react-icons/ai";
import { FaRegLaugh, FaRegLaughSquint } from "react-icons/fa";

const user = "김태리짱"
const title = "넷플릭스 구독하실분!"
const content = "이번달부터 넷플릭스 같이 구독하실 분 계신가요?\n네 명 모여서 같이 이용해요!\n스물다섯스물하나 보고 싶네요ㅠㅠ"
const reg_date = "2022-04-06 08:23:17"
const limit_date = "2022-04-10"
const buy_location = "넷플릭스"
const goal = "4"
const accumulate = "3"
const view = "3"

function Post() {
  const {id} = useParams();
  const [participation, setParticipation] = useState(false);
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const msg = "\nOTT 구독자 모집에 참여하시겠습니까?\n추후 취소는 불가능합니다.\n신중하게 결정해주세요!"
  const submitModal = () => {
    setCheckModalOpen(false);
    setParticipation(true);
    console.log("OTT 구독자 추가!")
    //OTT 구독자 모집 참여 DB 반영
  };

  return (
    <div>
      <div className="postHeaderBar">
        <div>OTT 구독자 모집</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postUser"><img src={images.user} alt="User"/>{user}</div>
      <div className="postRegDate">{reg_date}</div>
      <div className="postContent">
        <div className="postDealContent">
            결제 일시: {limit_date} <br/>
            구매처: {buy_location} <br/>
            목표 인원: {goal} <br/>
            달성 인원: {accumulate}
        </div>
        {content}
        <div className="postEtc">
          {participation
              ? <button className="participationButton pink" onClick={() => { setInfoModalOpen(true); }}><FaRegLaughSquint/>   참여 완료!</button>
              : <button className="participationButton skyblue" onClick={() => { setCheckModalOpen(true); }}><FaRegLaugh/>   참여 신청!</button>
          }
          <Modal type="Check" open={checkModalOpen} close={()=>{setCheckModalOpen(false);}} submit={submitModal}>
            {msg}
          </Modal>
          <Modal type="Info" open={infoModalOpen} close={()=>{setInfoModalOpen(false);}}>
            이미 참여한 게시글이에요!
          </Modal>
          <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
        </div>
      </div>
    </div>
  );
}

export default Post;