import './Post.css';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {images} from '../../images';
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const user = "햇서"
const title = "주방 청소 유용한 정보 공유합니다."
const content = "오늘은 주방 청소할 때 유용한 정보를 공유할거에요."
const reg_date = "2022-04-13 21:23:17"
const view = "1000"
const like = "500"

function Post() {
  const {id} = useParams();
  const [heart, setHeart] = useState(false);

  return (
    <div>
      <div className="postHeaderBar">
        <div>생활백서</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postUser"><img src={images.user} alt="User"/>{user}</div>
      <div className="postRegDate">{reg_date}</div>
      <div className="postContent">
        {content}
        <div className="postEtc">
            <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
            {heart
              ? <AiFillHeart className="heartIcon red" onClick={() => { setHeart(false);}}/>
              : <AiOutlineHeart className="heartIcon" onClick={() => { setHeart(true);}}/>
            }
            {like}
        </div>
      </div>
    </div>
  );
}

export default Post;