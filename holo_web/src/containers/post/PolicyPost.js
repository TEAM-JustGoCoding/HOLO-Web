import './Post.css';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {images} from '../../images';
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from 'axios';

var user, title, content, reg_date, view, like;

function getPost() {
  /*
  axios.get('http://holo.dothome.co.kr/policyPost.json', {
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
    .then((response) => {
      console.log("읽어옴");
      console.log(response);
     });
     */
     return fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/poliPost.json')
     .then(response => { return response.json();})
     .then(response => { 
                         var obj = response;
                         console.log(obj);
   
                         user = obj[0].nick_name;
                         title = obj[0].title;
                         content = obj[0].content;
                         reg_date = obj[0].reg_date;
                         view = obj[0].view;
                         like = obj[0].like;
                         
                       });
}

function requestPost(id){
  axios.post("http://holo.dothome.co.kr/findPolicyPost.php", JSON.stringify({postid: id}),{
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
  const [heart, setHeart] = useState(false);

  //console.log(id);
  requestPost(id);

  getPost();

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
