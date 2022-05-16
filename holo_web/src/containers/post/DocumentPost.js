import './Post.css';
import React, {useState} from 'react';
import {images} from '../../images';
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from 'axios';

var user, like;

function increaseHeart(id){
  var temp = Number(like);
  temp = temp + 1;
  like = temp.toString();

  axios.post("http://holo.dothome.co.kr/likeDoc.php", JSON.stringify({id: id, user: user}),{
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

function decreaseHeart(id){
  if(like > 0){
    var temp = Number(like);
    temp = temp - 1;
    like = temp.toString();
  }

  axios.post("http://holo.dothome.co.kr/likeDocCancel.php", JSON.stringify({id: id, user: user}),{
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

function ShowPost(props) {
  
  const [heart, setHeart] = useState(false);

  var id = props.id;
  var user = props.user;
  var title = props.title;
  var content = props.content;
  var reg_date = props.reg_date;
  var view = props.view;
  var like = props.like;

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
              ? <AiFillHeart className="heartIcon red" onClick={() => { setHeart(false); decreaseHeart(id);}}/>
              : <AiOutlineHeart className="heartIcon" onClick={() => { setHeart(true); increaseHeart(id); }}/>
            }
            {like}
        </div>
      </div>
    </div>
  );
}

class Post extends React.Component {
  constructor () {
    super ();

    var pathname = window.location.pathname;
    var words = pathname.split('/');
    console.log(words[2]);

    this.state = {
       id : words[2],
       user : "",
       title : "",
       content : "",
       reg_date : "",
       view : "",
       like : ""
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    console.log(this.state.id);

    axios.post("http://holo.dothome.co.kr/findDocPost.php", JSON.stringify({postid: this.state.id}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        console.log(response.data[0]);
        this.setState ({
          user: response.data[0].nick_name,
          title: response.data[0].title,
          content: response.data[0].content,
          reg_date : response.data[0].reg_date,
          view : response.data[0].view,
          like : response.data[0].like });  
      })
      .catch(function(error) {
        console.log(error);
      });
                     
  };                         

  render() {
    return(
      <ShowPost id = {this.state.id} user={this.state.user} title={this.state.title} 
                content={this.state.content} reg_date={this.state.reg_date}
                view={this.state.view} like={this.state.like}/>
    );
  }
}

export default Post;