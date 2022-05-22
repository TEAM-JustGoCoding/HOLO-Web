import './Post.css';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import {images} from '../../images';
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from 'axios';

var likeUser = 32;

function ShowPost(props) {
  const navigate = useNavigate();
  const [heart, setHeart] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [like, setLike] =useState('');

  console.log(typeof(props.alreadyLiked));
  
  if(props.alreadyLiked === true){
    console.log('이미 좋아요 누름!');
    //setHeart(true); //이 코드를 넣으면 에러가 남...왜지?  //무한루프에 빠져버림
    
  }

  useEffect(() => {
    setHeart(props.alreadyLiked);
  }, [props.alreadyLiked]);

  useEffect(() => {
    setLike(props.like);
  }, [props.like]);
  
  var id = props.id;
  var user = props.user;
  var title = props.title;
  var content = props.content;
  var reg_date = props.reg_date;
  var view = props.view;
  

  const deleteMsg = "\n게시글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const deletePost = () => {
    setDeleteModalOpen(false);

    axios.post("http://holo.dothome.co.kr/deletePolicy.php", JSON.stringify({id: id}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    navigate(-1)
  }

  function increaseHeart(){
    var temp = Number(like);
    temp = temp + 1;
    setLike(temp.toString());
  
    axios.post("http://holo.dothome.co.kr/likePolicy.php", JSON.stringify({id: id, user: likeUser}),{
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
  
  function decreaseHeart(){
    if(like > 0){
      var temp = Number(like);
      temp = temp - 1;
     // like = temp.toString();
      setLike(temp.toString());
    }
  
    axios.post("http://holo.dothome.co.kr/likePolicyCancel.php", JSON.stringify({id: id, user: likeUser}),{
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
          <div className="postEtc2">
              <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
              {heart
                ? <AiFillHeart className="heartIcon red" onClick={() => { setHeart(false); decreaseHeart();}}/>
                : <AiOutlineHeart className="heartIcon" onClick={() => { setHeart(true); increaseHeart(); }}/>
              }
              {like}
            <div>
              <Link to={`/edit/policy/${id}`}>
                <button className="postEtcButton">수정</button>
              </Link>
              <button className="postEtcButton" onClick={() => {setDeleteModalOpen(true);}}>삭제</button>
              <Modal type="Check" open={deleteModalOpen} close={()=>{setDeleteModalOpen(false);}} submit={deletePost}>
                {deleteMsg}
              </Modal>
            </div>
          </div>
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
       likeUser : 32, //좋아요를 누르려는 임의의 유저
       title : "",
       content : "",
       reg_date : "",
       view : "",
       like : "",
       alreadyLiked : '' //이 글을 보는 사용자가 이전에 이미 좋아요를 눌렀는지 체크하는 변수
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    console.log(this.state.id);

    axios.post("http://holo.dothome.co.kr/findPolicyPost.php", JSON.stringify({postid: this.state.id}),{
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

    //게시글을 이용하려는 사용자가 이미 좋아요를 눌렀는지 검사
    //이미 눌렀으면 true를, 아니면 false라는 응답을 얻게됨
    axios.post("http://holo.dothome.co.kr/alreadyLikePolicy.php", JSON.stringify({id: this.state.id, user: this.state.likeUser}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {
        //console.log(response.data);
        this.setState({
          alreadyLiked : response.data
        });
        console.log(this.state.alreadyLiked);
      })
      .catch(function(error) {
        console.log(error);
      });
                     
  };                         


  render() {
    return(
      <ShowPost id = {this.state.id} user={this.state.user} title={this.state.title} 
                content={this.state.content} reg_date={this.state.reg_date}
                view={this.state.view} like={this.state.like} alreadyLiked={this.state.alreadyLiked}/>
    );
  }
}

export default Post;
