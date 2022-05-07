import './Post.css';
import React from 'react';
import {useParams} from 'react-router-dom';
import {images} from '../../images';
import { AiOutlineEye } from "react-icons/ai";

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
            달성 금액: {accumulate} <br/>
            금액 현황: {accumulate}/{goal}
        </div>
        {content}
        <div className="postEtc">
          <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
        </div>
      </div>
    </div>
  );
}

export default Post;