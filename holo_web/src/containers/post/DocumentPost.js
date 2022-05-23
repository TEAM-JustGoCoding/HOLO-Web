import './Post.css';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import ReplyTable from '../../components/ReplyTable';
import {images} from '../../images';
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import axios from 'axios';

//var likeUser = 32;  //29,32~37  //좋아요를 누르려는 임의의 유저

function ShowPost(props) {
  const navigate = useNavigate();
  const [heart, setHeart] = useState(false);
  const [like, setLike] =useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [replyDeleteModalOpen, setReplyDeleteModalOpen] = useState(false);
  const [reply, setReply] = useState('');
  const [replyNum, setReplyNum] = useState(0);
  const [replyEdit, setReplyEdit] = useState(false);

  console.log(typeof(props.alreadyLiked));

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
  var likeUser = props.likeUser;
  
  var replyList = props.replyList;
  
  function replyChange (e) {
    setReply(e.target.value)
  };

  const deleteMsg = "\n게시글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const deletePost = () => {
    setDeleteModalOpen(false);

    axios.post("http://holo.dothome.co.kr/deleteDoc.php", JSON.stringify({id: id}),{
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
  
    axios.post("http://holo.dothome.co.kr/likeDoc.php", JSON.stringify({id: id, user: likeUser}),{
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
  
    axios.post("http://holo.dothome.co.kr/likeDocCancel.php", JSON.stringify({id: id, user: likeUser}),{
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

  function submitReply(){
    setReply('');
    setReplyNum(replyNum+1);  //댓글 개수 증가
    console.log("댓글 등록")
    //댓글 작성 구현 (reply 변수값 등록)
  }
  
  const setEditReply = (replyContent) => {
    setReplyEdit(true);
    setReply(replyContent);
  }
  const editReply = () => {
    setReplyEdit(false);
    setReply('');
    console.log("댓글 수정")
    //댓글 수정 구현 (reply 변수값 반영)
  }

  const replyDeleteMsg = "\n댓글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const deleteReply = () => {
    setReplyDeleteModalOpen(false);
    console.log("댓글 삭제")
    //댓글 삭제 구현
  }

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
          <div className="postEtc2">
            <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
            {heart
              ? <AiFillHeart className="heartIcon red" onClick={() => { setHeart(false); decreaseHeart();}}/>
              : <AiOutlineHeart className="heartIcon" onClick={() => { setHeart(true); increaseHeart(); }}/>
            }
            {like}
            <div>
              <Link to={`/edit/document/${id}`}>
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
      <div className="postReply">
        <div><BiMessageDetail style={{fontSize: '3.5vh'}}/> 댓글 {replyNum}</div>
        {replyEdit
          ? <div className="replyEditInput">
              <textarea placeholder='수정할 댓글을 입력해주세요.' value={reply} spellCheck="false"  onChange={replyChange}></textarea>
              <div className="replyEditButton">
                <button onClick={() => {editReply();}} style={{marginBottom: '3px'}}>수정</button>
                <button onClick={() => {setReplyEdit(false); setReply('');}}>취소</button>
              </div>
            </div>
          : <div className="replyInput">
              <textarea placeholder='댓글을 입력해주세요.' value={reply} spellCheck="false" onChange={replyChange}></textarea>
              <button onClick={() => {submitReply()}}>등록</button>
            </div>
        }

        <div className="replyTable">
          <ReplyTable type="Reply" list={replyList} editFuc={setEditReply} deleteFuc={()=>{setReplyDeleteModalOpen(true);}}/>
        </div>
        <Modal type="Check" open={replyDeleteModalOpen} close={()=>{setReplyDeleteModalOpen(false);}} submit={deleteReply}>
          {replyDeleteMsg}
        </Modal>
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
       likeUser : 32,
       title : "",
       content : "",
       reg_date : "",
       view : "",
       like : "",
       alreadyLiked: "",
       replyList : [{id: 1, user: "우네", content: "안녕하세용", date: "2022-05-23 05:08:00"},
       {id: 2, user: "먼지", content: "와! 이건 정말 대박 정보!", date: "2022-05-23 05:08:00"},
       {id: 3, user: "구리", content: "와 진짜 짱이에용 ㅠ\n감사합니당~", date: "2022-05-23 05:08:00"},
       {id: 4, user: "옌", content: "무야호~", date: "2022-05-23 05:08:00"}]   //임의 댓글 데이터
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

    //게시글을 이용하려는 사용자가 이미 좋아요를 눌렀는지 검사
    //이미 눌렀으면 true를, 아니면 false라는 응답을 얻게됨
    axios.post("http://holo.dothome.co.kr/alreadyLikeDoc.php", JSON.stringify({id: this.state.id, user: this.state.likeUser}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {    
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
                view={this.state.view} like={this.state.like} alreadyLiked = {this.state.alreadyLiked} likeUser = {this.state.likeUser}
                replyList={this.state.replyList}/>
    );
  }
}

export default Post;
