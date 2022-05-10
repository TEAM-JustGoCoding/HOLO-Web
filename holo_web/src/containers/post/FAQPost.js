import './Post.css';
import React from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

var title, content;

function getPost() {
	return fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/faqPost.json')
	.then(response => { return response.json();})
	.then(response => { 
                      var obj = response;
                      console.log(obj);

                      title = obj[0].title;
                      content = obj[0].content;                     
                    });
}

function requestPost(id){
  axios.post("http://holo.dothome.co.kr/findFaqPost.php", JSON.stringify({postid: id}),{
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

  requestPost(id);
  getPost();

  return (
    <div>
      <div className="postHeaderBar">
        <div>FAQ</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postFAQContent">{content}</div>
    </div>
  );
}

export default Post;
