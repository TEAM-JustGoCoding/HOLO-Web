import './Post.css';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import Modal from '../../components/Modal';
import {images} from '../../images';
import { AiOutlineEye } from "react-icons/ai";
import { FaRegLaugh, FaRegLaughSquint } from "react-icons/fa";
import axios from 'axios';

var user, title, content, reg_date, limit_date, buy_location, pickup_location, goal, accumulate, view;

function getPost() {
     return fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/deliPost.json')
     .then(response => { return response.json();})
     .then(response => { 
                         var obj = response;
                         console.log(obj);
   
                         user = obj[0].nick_name;
                         title = obj[0].title;
                         content = obj[0].content;
                         reg_date = obj[0].reg_date;
                         limit_date = obj[0].limit_date;
                         buy_location = obj[0].buy_location;
                         pickup_location = obj[0].pickup_location;
                         goal = obj[0].goal
                         view = obj[0].view;
                         accumulate = obj[0].accumulate;
                         
                       });
}

function requestPost(id){
  axios.post("http://holo.dothome.co.kr/findDeliveryPost.php", JSON.stringify({postid: id}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(function(body) {
        console.log(body);
      })
      .catch(function(error) {
        console.log(error);
      });
}

function Post() {
  const {id} = useParams();
  const [participation, setParticipation] = useState(false);
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  requestPost(id);
  getPost();

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
