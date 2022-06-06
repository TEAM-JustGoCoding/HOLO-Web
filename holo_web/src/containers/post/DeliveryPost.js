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
import {Cookies} from "react-cookie";

var reReplyList = [
  {id: 1, reply_id: '18', nick_name: "해서", user_id: 28, content: "나두", date: "2022-05-23 17:12:04"}
]

function ShowPost(props) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(34); //초기값 수정 필요
  const [participation, setParticipation] = useState(false);
  const [participationModalOpen, setParticipationModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
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
  useEffect(()=>{
    setReplyList(props.replyList);
  }, [props.replyList]);
  useEffect(()=>{
    setReplyNum(props.replyList.length);
  }, [props.replyList]);
  useEffect(()=>{
    setParticipation(props.alreadyParticipated);
  }, [props.alreadyParticipated]);


  var id = props.id;
  var user = props.user;
  var title = props.title;
  var content = props.content;
  var reg_date = props.reg_date;
  var limit_date = props.limit_date;
  var buy_location = props.buy_location;
  var pickup_location = props.pickup_location;
  var goal = props.goal;
  var accumulate = props.accumulate;
  var view = props.view;
  var url = props.path;
  
  
  function replyChange (e) {
    setReply(e.target.value)
  };

  const participationMsg = "\n공동구매에 참여할 금액을 작성해주세요.\n입력하신 금액은 참여 현황에 반영됩니다.\n신중하게 작성해주세요!\n0원 이하는 입력할 수 없습니다.";
  const participationPost = (money) => {
    setParticipationModalOpen(false);
    setParticipation(true);
    console.log(money+"원! 공동구매 금액 추가!")
    //공동구매 참여 DB 반영
    axios.post("http://holo.dothome.co.kr/DeliveryParticipate.php", JSON.stringify({id: id, starter: user, user: currentUser, money: money}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        //채팅방 개설하는 코드를 여기에다 작성        
        if(response.data['complete'] === "true"){
          console.log("거래 다 완료됨!");

          var hostEmail = response.data['starter'];
          var partner = response.data['mates'];
          var boardTitle = title;

          try {
            //Android.createChatRoom(hostEmail, partner, boardTitle);
            console.log(hostEmail, partner, boardTitle);
          }
          catch (e) {
            console.log("Android 없음!");
          }
        }
        
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  
  const cancelMsg = "\n참여를 취소하시겠습니까?\n신중하게 결정해주세요!"
  const cancelPost = () => {
    setCancelModalOpen(false);
    setParticipation(false);
    console.log("공동구매 참여 취소!")
    //공동구매 참여 취소 DB 반영
    axios.post("http://holo.dothome.co.kr/DeliveryCancelParticipate.php", JSON.stringify({id: id, user: currentUser}),{
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

  const deleteMsg = "\n게시글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const deletePost = () => {
    setDeleteModalOpen(false);
    axios.post("http://holo.dothome.co.kr/deleteDelivery.php", JSON.stringify({id: id}),{
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
    if(reply===''){
      setCheckModalOpen(true)
    }
    else{
      setReply('');
      setReplyNum(replyNum+1);  //댓글 개수 증가
      console.log("댓글 등록");
      var date = getToday();
  
      axios.post("http://holo.dothome.co.kr/commentDelivery.php", JSON.stringify({writer: user, post: id, user: currentUser, content: reply, date: date}),{
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
     
      axios.post("http://holo.dothome.co.kr/getCommentDelivery.php", JSON.stringify({post: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {
        console.log(response.data);
        
        setReplyList(response.data);
        //setReplyNum(replyList.length);
        
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
  
  const editReply = (replyId, replyContent) => {
    var date = getToday();

    axios.post("http://holo.dothome.co.kr/updateCommentDelivery.php", JSON.stringify({id: replyId, content: replyContent, date: date}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {   
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    axios.post("http://holo.dothome.co.kr/getCommentDelivery.php", JSON.stringify({post: id}),
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

    axios.post("http://holo.dothome.co.kr/deleteCommentDelivery.php", JSON.stringify({replyId: replyId}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    axios.post("http://holo.dothome.co.kr/getCommentDelivery.php", JSON.stringify({post: id}),
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
            달성 금액: {accumulate}
        </div>
        {content}
        <div className="postEtc">
          {participation
              ? <button className="participationButton pink" onClick={() => { setCancelModalOpen(true); }}><FaRegLaughSquint/>   참여 완료!</button>
              : <button className="participationButton skyblue" onClick={() => { setParticipationModalOpen(true); }}><FaRegLaugh/>   참여 신청!</button>
          }
          <div className="postEtc2">
            <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
            <div>
              <Link to={`/edit/delivery/${id}`}>
                <button className="postEtcButton">수정</button>
              </Link>
              <button className="postEtcButton" onClick={() => {setDeleteModalOpen(true);}}>삭제</button>
            </div>
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
          <ReplyTable replyList={replyList} replyEditFunc={editReply} replyDeleteFunc={setDeleteReply}
                      reReplyList={reReplyList} reReplySubmitFunc={submitReReply} reReplyEditFunc={editReReply} reReplyDeleteFunc={setDeleteReReply}/>
        </div>
      </div>
      <Modal type="Input" open={participationModalOpen} close={() => {setParticipationModalOpen(false);}} submit={participationPost}>
        {participationMsg}
      </Modal>
      <Modal type="Check" open={cancelModalOpen} close={()=>{setCancelModalOpen(false);}} submit={cancelPost}>
        {cancelMsg}
      </Modal>
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
    console.log(words[2]);

    this.state = {
       pathname : pathname,
       id : words[2],
       user : "",
       title : "",
       content : "",
       reg_date : "",
       limit_date : "",
       buy_location : "",
       pickup_location : "",
       goal : "",
       accumulate : "",
       view : "",
       replyList : [],   //임의 댓글 데이터
       currentUser : 25,
       alreadyParticipated : "false"
    };

    var cookies = new Cookies()

    if(cookies.get('uid')){
      this.state.currentUser = cookies.get('uid')
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    console.log(this.state.id);

    axios.post("http://holo.dothome.co.kr/findDeliveryPost.php", JSON.stringify({postid: this.state.id}),{
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
          pickup_location : response.data[0].pickup_location,
          goal : response.data[0].goal,
          view : response.data[0].view,
          accumulate : response.data[0].accumulate });  
      })
      .catch(function(error) {
        console.log(error);
      });

    //게시글을 이용하려는 사용자가 이미 참여를 했는지 검사
    //이미 눌렀으면 true를, 아니면 false라는 응답을 얻게됨
    axios.post("http://holo.dothome.co.kr/DeliveryAlreadyParticipated.php", JSON.stringify({id: this.state.id, user: this.state.currentUser}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {    
        this.setState({
          alreadyParticipated : response.data
        });
        
        console.log(this.state.alreadyParticipated);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    //게시글에 달린 댓글 불러오는 부분
    axios.post("http://holo.dothome.co.kr/getCommentDelivery.php", JSON.stringify({post: this.state.id}),
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
      <ShowPost path = {this.state.pathname} id = {this.state.id} user={this.state.user} title={this.state.title} content={this.state.content} reg_date={this.state.reg_date}
                limit_date={this.state.limit_date} buy_location={this.state.buy_location} pickup_location={this.state.pickup_location} 
                goal={this.state.goal} view={this.state.view} accumulate={this.state.accumulate}
                replyList={this.state.replyList} currentUser={this.state.currentUser} alreadyParticipated = {this.state.alreadyParticipated}/>
    );
  }
}

export default Post;
