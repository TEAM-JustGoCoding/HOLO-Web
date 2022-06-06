import './Post.css';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Cookies} from "react-cookie";
import Modal from '../../components/Modal';
import ReplyTable from '../../components/ReplyTable';
import {images} from '../../images';
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import axios from 'axios';

var reReplyList = [
  {id: 1, reply_id: '53', nick_name: "우네", user_id: 34, content: "댓글 1번에 답글!", date: "2022-05-23 17:12:04"},
  {id: 2, reply_id: '54', nick_name: "해서", user_id: 28, content: "댓글 2번에 답글!", date: "2022-05-23 17:12:04"}
]

function ShowPost(props) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(34); //초기값 수정 필요
  const [heart, setHeart] = useState(false);
  const [like, setLike] =useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const [replyDeleteModalOpen, setReplyDeleteModalOpen] = useState(false);
  const [reReplyDeleteModalOpen, setReReplyDeleteModalOpen] = useState(false);
  const [reply, setReply] = useState('');
  const [replyNum, setReplyNum] = useState(0);
  const [replyList, setReplyList] = useState([]);
  const [replyId, setReplyId] = useState(null);
  const [reReplyId, setReReplyId] = useState(null);

  useEffect(() => {
    setCurrentUser(props.currentUser);
  }, [props.currentUser])
  useEffect(() => {
    setHeart(props.alreadyLiked);
  }, [props.alreadyLiked]);
  useEffect(() => {
    setLike(props.like);
  }, [props.like]);
  useEffect(()=>{
    setReplyList(props.replyList);
  }, [props.replyList]);
  useEffect(()=>{
    setReplyNum(props.replyList.length);
  }, [props.replyList]);

  var id = props.id;
  var user_id = props.user_id;
  var user = props.user;
  var title = props.title;
  var content = props.content;
  var reg_date = props.reg_date;
  var view = props.view;
  var url = props.path;
  
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
  
    axios.post("http://holo.dothome.co.kr/likeDoc.php", JSON.stringify({id: id, user: currentUser}),{
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
  
    axios.post("http://holo.dothome.co.kr/likeDocCancel.php", JSON.stringify({id: id, user: currentUser}),{
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

  function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  
    return year + "-" + month + "-" + day + " " + time;
  }

  function submitReply(){
    try {
      //Android.showToast("게시글에 댓글 작성!");
    }
    catch (e) {
      console.log("Android 없음!");
    }

    if(reply===''){
      setCheckModalOpen(true)
    }
    else{
      setReply('');
      setReplyNum(replyNum+1);  //댓글 개수 증가
      console.log("댓글 등록");
      var date = getToday();

      axios.post("http://holo.dothome.co.kr/commentDoc.php", JSON.stringify({writer: user, post: id, user: currentUser, content: reply, date: date}),{
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      })
      .then(response => {   
        var type = "comment";
        var toEmail = response.data;
        var content = reply;

        try {
          //Android.sendCmtAlarm(type,toEmail, content, url);
          console.log(type,toEmail, content, url);
        }
        catch (e) {
          console.log("Android 없음!");
        }
      })
        .catch(function(error) {
          console.log(error);
        });
      
      axios.post("http://holo.dothome.co.kr/getCommentDoc.php", JSON.stringify({post: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        setReplyList(response.data);
        console.log(replyList);
        //setReplyNum(replyList.length);
      })
      .catch(function(error) {
        console.log(error);
      });
      }
  }
  
  const editReply = (replyId, replyContent) => {
    var date = getToday();

    axios.post("http://holo.dothome.co.kr/updateCommentDoc.php", JSON.stringify({id: replyId, content: replyContent, date: date}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {   
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    axios.post("http://holo.dothome.co.kr/getCommentDoc.php", JSON.stringify({post: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {   
        setReplyList(response.data);  
        console.log(replyList);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const replyDeleteMsg = "\n댓글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const setDeleteReply = (replyId) => {
    setReplyDeleteModalOpen(true);
    setReplyId(replyId);
  }
  const deleteReply = () => {
    setReplyDeleteModalOpen(false);

    axios.post("http://holo.dothome.co.kr/deleteCommentDoc.php", JSON.stringify({replyId: replyId}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    setReplyNum(replyNum-1);  //댓글 개수 증가
    axios.post("http://holo.dothome.co.kr/getCommentDoc.php", JSON.stringify({post: id}),
    {
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    }).then(response => {        
      setReplyList(response.data);
      console.log(replyList);
      //setReplyNum(replyList.length);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  const submitReReply = (replyId, reReplyContent) => {
    console.log("답글 등록")
    //답글 등록 (댓글 id, 답글 내용)
  }

  const editReReply = (reReplyId, reReplyContent) => {
    console.log("답글 수정")
    //답글 수정 (답글 id, 답글 내용)
  }

  const reReplyDeleteMsg = "\n답글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const setDeleteReReply = (reReplyId) => {
    setReReplyDeleteModalOpen(true);
    setReReplyId(reReplyId);
  }
  const deleteReReply = () => {
    setReReplyDeleteModalOpen(false);
    console.log("답글 삭제")
    //답글 삭제 (삭제할 답글 id = reReplyId)
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
            {currentUser===user_id
             ?<div>
                <Link to={`/edit/document/${id}`}>
                  <button className="postEtcButton">수정</button>
                </Link>
                <button className="postEtcButton" onClick={() => {setDeleteModalOpen(true);}}>삭제</button>
              </div>
             :<div/>
            }
          </div>
        </div>
      </div>
      <div className="postReply">
        <div><BiMessageDetail style={{fontSize: '3.5vh'}}/> 댓글 {replyNum}</div>
        <div className="replyInput">
            <textarea placeholder='댓글을 입력해주세요.' value={reply} spellCheck="false" onChange={replyChange}></textarea>
            <button onClick={() => {submitReply()}}>등록</button>
        </div>
        <div className="replyTable">
          <ReplyTable currentUser={currentUser} replyList={replyList} replyEditFunc={editReply} replyDeleteFunc={setDeleteReply}
                      reReplyList={reReplyList} reReplySubmitFunc={submitReReply} reReplyEditFunc={editReReply} reReplyDeleteFunc={setDeleteReReply}/>
        </div>
      </div>
      <Modal type="Check" open={deleteModalOpen} close={()=>{setDeleteModalOpen(false);}} submit={deletePost}>
        {deleteMsg}
      </Modal>
      <Modal type="Info" open={checkModalOpen} close={()=>setCheckModalOpen(false)}>
        내용을 입력해주세요!
      </Modal>
      <Modal type="Check" open={replyDeleteModalOpen} close={()=>{setReplyDeleteModalOpen(false);}} submit={deleteReply}>
        {replyDeleteMsg}
      </Modal>
      <Modal type="Check" open={reReplyDeleteModalOpen} close={()=>{setReReplyDeleteModalOpen(false);}} submit={deleteReReply}>
        {reReplyDeleteMsg}
      </Modal>
    </div>
  );
}

class Post extends React.Component {
  constructor () {
    super ();

    var pathname = window.location.pathname;
    var words = pathname.split('/');

    this.state = {
       pathname : pathname,
       user_id : 37,  //작성자 id
       id : words[2],
       user : "",
       title : "",
       content : "",
       reg_date : "",
       view : "",
       like : "",
       alreadyLiked: "",
       replyList : [],
       currentUser: 34, //초기값 수정 필요  
    };

    var cookies = new Cookies()

    if(cookies.get('uid')){
      this.state.currentUser = cookies.get('uid')
    }

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
    axios.post("http://holo.dothome.co.kr/alreadyLikeDoc.php", JSON.stringify({id: this.state.id, user: this.state.currentUser}),
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
    
    //게시글에 달린 댓글 불러오는 부분
    axios.post("http://holo.dothome.co.kr/getCommentDoc.php", JSON.stringify({post: this.state.id}),
    {
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    }).then(response => {
      console.log(response.data);
      
      this.setState({
        replyList : response.data
      });
      
    })
    .catch(function(error) {
      console.log(error);
    });       
  };  
                                             

  render() {
    return(
      <ShowPost path={this.state.pathname} id = {this.state.id} user_id={this.state.user_id} user={this.state.user} title={this.state.title} 
                content={this.state.content} reg_date={this.state.reg_date} view={this.state.view} like={this.state.like}
                alreadyLiked = {this.state.alreadyLiked} currentUser = {this.state.currentUser} replyList={this.state.replyList}/>
    );
  }
}

export default Post;
