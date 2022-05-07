import './Post.css';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {images} from '../../images';
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const user = "우네"
const title = "구미시 정책"
const content = "구미시 정책을 공유합니다"
const reg_date = "2022-04-13 21:23:17"
const view = "5"
const like = "5"

function Post() {
  const {id} = useParams();
  const [heart, setHeart] = useState(false);

  return (
    <div>
      <div className="postHeaderBar">
        <div>정책</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postUser"><img src={images.user} alt="User"/>{user}</div>
      <div className="postRegDate">{reg_date}</div>
      <div className="postContent">
        {content}
        <div className="postEtc">
            <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
            {heart
              ? <AiFillHeart className="heartIcon red" onClick={() => { setHeart(false);} }/>
              : <AiOutlineHeart className="heartIcon" onClick={() => { setHeart(true);} }/>
            }
            {like}
        </div>
      </div>
    </div>
  );
}

export default Post;