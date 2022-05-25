import './Post.css';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import ReplyTable from '../../components/ReplyTable';
import {images} from '../../images';
import { AiOutlineEye } from "react-icons/ai";
import { FaRegLaugh, FaRegLaughSquint } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import axios from 'axios';

function ShowPost(props) {
  const navigate = useNavigate();
  const [participation, setParticipation] = useState(false);
  const [participationModalOpen, setParticipationModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [replyDeleteModalOpen, setReplyDeleteModalOpen] = useState(false);
  const [reply, setReply] = useState('');
  const [replyNum, setReplyNum] = useState(0);
  const [replyEdit, setReplyEdit] = useState(false);
  const [replyList, setReplyList] = useState([]);
  const [replyId, setReplyId] = useState(null);

  useEffect(()=>{
    setReplyList(props.replyList);
  }, [props.replyList]);
  useEffect(()=>{
    setReplyNum(props.replyList.length);
  }, [props.replyList]);

  var id = props.id;
  var user = props.user;
  var title = props.title;
  var content = props.content;
  var reg_date = props.reg_date;
  var limit_date = props.limit_date;
  var buy_location = props.buy_location;
  var goal = props.goal;
  var accumulate = props.accumulate;
  var view = props.view;
  var likeUser = props.likeUser;

  
  function replyChange (e) {
    setReply(e.target.value)
  };

  const participationMsg = "\nOTT 구독자 모집에 참여하시겠습니까?\n신중하게 결정해주세요!"
  const participationPost = () => {
    setParticipationModalOpen(false);
    setParticipation(true);
    console.log("OTT 구독자 추가!")
    //OTT 구독자 참여 DB 반영
  }

  const cancelMsg = "\n참여를 취소하시겠습니까?\n신중하게 결정해주세요!"
  const cancelPost = () => {
    setCancelModalOpen(false);
    setParticipation(false);
    console.log("OTT 구독 취소!")
    //OTT 구독자 참여 취소 DB 반영
  }

  const deleteMsg = "\n게시글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const deletePost = () => {
    setDeleteModalOpen(false);

    axios.post("http://holo.dothome.co.kr/deleteOtt.php", JSON.stringify({id: id}),{
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

  function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  
    return year + "-" + month + "-" + day + " " + time;
  }

  function submitReply(){
    setReply('');
    setReplyNum(replyNum+1);  //댓글 개수 증가
    console.log("댓글 등록");
    var date = getToday();

    //댓글 작성 구현 (reply 변수값 등록)
    axios.post("http://holo.dothome.co.kr/commentOtt.php", JSON.stringify({post: id, user: likeUser, content: reply, date: date}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(function(body) {
        console.log(body);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    //댓글업데이트
      axios.post("http://holo.dothome.co.kr/getCommentOtt.php", JSON.stringify({post: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {
        //console.log(response.data);
        
        setReplyList(response.data);
        console.log(replyList);
        //setReplyNum(replyList.length);
        
      })
      .catch(function(error) {
        console.log(error);
      });
  
  }
  
  const setEditReply = (replyId, replyContent) => {
    setReplyId(replyId)
    setReplyEdit(true);
    setReply(replyContent);
  }
  const editReply = () => {
    setReplyEdit(false);
    setReply('');
    var date = getToday();

    //댓글 수정 구현 (reply 변수값 반영)
    axios.post("http://holo.dothome.co.kr/updateCommentOtt.php", JSON.stringify({id: replyId, content: reply, date: date}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {   
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    //댓글 업데이트
    axios.post("http://holo.dothome.co.kr/getCommentOtt.php", JSON.stringify({post: id}),
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
    console.log("댓글 삭제")

    //댓글 삭제 구현
    axios.post("http://holo.dothome.co.kr/deleteCommentOtt.php", JSON.stringify({replyId: replyId}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    //댓글업데이트
    axios.post("http://holo.dothome.co.kr/getCommentOtt.php", JSON.stringify({post: id}),
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

  return (
    <div>
      <div className="postHeaderBar">
        <div>OTT 구독</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postUser"><img src={images.user} alt="User"/>{user}</div>
      <div className="postRegDate">{reg_date}</div>
      <div className="postContent">
        <div className="postDealContent">
            결제 일시: {limit_date} <br/>
            구매처: {buy_location} <br/>
            목표 인원: {goal} <br/>
            달성 인원: {accumulate}
        </div>
        {content}
        <div className="postEtc">
          {participation
              ? <button className="participationButton pink" onClick={() => { setCancelModalOpen(true); }}><FaRegLaughSquint/>   참여 완료!</button>
              : <button className="participationButton skyblue" onClick={() => { setParticipationModalOpen(true); }}><FaRegLaugh/>   참여 신청!</button>
          }
          <Modal type="Check" open={participationModalOpen} close={()=>{setParticipationModalOpen(false);}} submit={participationPost}>
            {participationMsg}
          </Modal>
          <Modal type="Check" open={cancelModalOpen} close={()=>{setCancelModalOpen(false);}} submit={cancelPost}>
            {cancelMsg}
          </Modal>
          <div className="postEtc2">
            <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
            <div>
              <Link to={`/edit/ott/${id}`}>
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
          <ReplyTable type="Reply" list={replyList} editFunc={setEditReply} deleteFunc={setDeleteReply}/>
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
       likeUser : 33, //외부유저
       title : "",
       content : "",
       reg_date : "",
       limit_date : "",
       buy_location : "",
       goal : "",
       accumulate : "",
       view : "",
       replyList : []   //임의 댓글 데이터
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    console.log(this.state.id);

    axios.post("http://holo.dothome.co.kr/findOTTPost.php", JSON.stringify({postid: this.state.id}),{
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
          limit_date : response.data[0].limit_date,
          buy_location :response.data[0].buy_location,
          goal : response.data[0].goal,
          view : response.data[0].view,
          accumulate : response.data[0].accumulate });  
      })
      .catch(function(error) {
        console.log(error);
      });

    //게시글에 달린 댓글 불러오는 부분
    axios.post("http://holo.dothome.co.kr/getCommentOtt.php", JSON.stringify({post: this.state.id}),
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
      <ShowPost id = {this.state.id} user={this.state.user} title={this.state.title} content={this.state.content} reg_date={this.state.reg_date}
                limit_date={this.state.limit_date} buy_location={this.state.buy_location} 
                goal={this.state.goal} view={this.state.view} accumulate={this.state.accumulate} replyList={this.state.replyList}
                likeUser={this.state.likeUser}/>
    );
  }
}

export default Post;
