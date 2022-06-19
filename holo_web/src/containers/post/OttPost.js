import './Post.css';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import ReplyTable from '../../components/ReplyTable';
import {getProfileImg} from '../../firebase'
import { AiOutlineEye } from "react-icons/ai";
import { FaRegLaughBeam, FaRegLaugh, FaRegLaughSquint } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import axios from 'axios';
import {Cookies} from "react-cookie";

function ShowPost(props) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(28); //초기값 수정 필요
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);
  const [refuseModal, setRefuseModal] = useState(false);
  const [participation, setParticipation] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [participationModal, setParticipationModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [replyDeleteModal, setReplyDeleteModal] = useState(false);
  const [reReplyDeleteModal, setReReplyDeleteModal] = useState(false);
  const [refuseUserMail, setRefuseUserMail] = useState('');
  const [reply, setReply] = useState('');
  const [replyNum, setReplyNum] = useState(0);
  const [replyList, setReplyList] = useState([]);
  const [replyId, setReplyId] = useState(null);
  const [reReplyId, setReReplyId] = useState(null);
  const [reReplyList, setReReplyList] = useState([]);
  const [accumulate, setAccumulate] = useState(props.state.accumulate);

  console.log(props.state.accumulate);

  useEffect(() => {
    setCurrentUser(props.state.currentUser);
  }, [props.state.currentUser])
  useEffect(()=>{
    setReplyList(props.state.replyList);
  }, [props.state.replyList]);
  useEffect(()=>{
    setReplyNum(props.state.replyList.length + props.state.reReplyList.length);
  }, [props.state.replyList, props.state.reReplyList]);
  useEffect(()=>{
    setParticipation(props.state.alreadyParticipated);
  }, [props.state.alreadyParticipated]);
  useEffect(()=>{
    setReReplyList(props.state.reReplyList);
  }, [props.state.reReplyList]);
  useEffect(()=>{
    for(let i=0;i<replyList.length;i++){
      getProfileImg(replyList[i].mail).then((img) => {
        replyList[i].profile = img
      })
    }
  }, [replyList])
  useEffect(()=>{
    for(let i=0;i<reReplyList.length;i++){
      getProfileImg(reReplyList[i].mail).then((img) => {
        reReplyList[i].profile = img
      })
    }
  }, [reReplyList])
  //---------------새로 추가한 부분----------------
  useEffect(()=>{
    setReplyList(ReplyList);
  }, [ReplyList]);
  useEffect(()=>{
    setReReplyList(ReReplyList);
  }, [ReReplyList]);
  useEffect(()=>{
    setAccumulate(props.state.accumulate);
  }, [props.state.accumulate]);

  var url = '?path=ottpost&id='+props.state.id;
  var id = props.state.id;
  var user_id = props.state.user_id;
  var user = props.state.user;
  var score = props.state.score;
  var deal_count = props.state.deal_count;
  var participationList = props.state.participationList;
  var title = props.state.title;
  var content = props.state.content;
  var reg_date = props.state.reg_date;
  var limit_date = props.state.limit_date;
  var buy_location = props.state.buy_location;
  var goal = props.state.goal;
  var view = props.state.view;
  var profile = props.state.profile;
  var ReplyList = props.state.replyList;
  var ReReplyList = props.state.reReplyList;

  function replyChange (e) {
    if (e.target.value.length > 200) {
      setReply(e.target.value.slice(0, 200))
    }
    else {
      setReply(e.target.value)
    }
  };

  const successMsg = "\n모집을 마감하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const successPost = () => {
    setSuccessModal(false);
    console.log("OTT 모집 마감!")
    //OTT 모집 마감
    axios.post("http://holo.dothome.co.kr/OTTEnd.php", JSON.stringify({id: id, starter: user}),{
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
            window.Android.createChatRoom(hostEmail, partner, boardTitle);
          }
          catch (e) {
            console.log("Android 없음!");
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const refuseMsg = "\n해당 신청을 거절하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const setRefuseUser = (mail) => {
    setRefuseModal(true);
    setRefuseUserMail(mail)
  }
  const refuseUser = () => {
    setRefuseModal(false); 
    setManageModal(false);
    axios.post("http://holo.dothome.co.kr/OttDeclineParticipate.php", JSON.stringify({id: id, refuseTo: refuseUserMail}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        try {
          var toEmail = refuseUserMail;
          var Title = title;
          window.Android.sendRefuseDeal(toEmail, Title);
        }
        catch (e) {
          console.log("Android 없음!");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const participationMsg = "\nOTT 구독자 모집에 참여하시겠습니까?\n신중하게 결정해주세요!"
  const participationPost = () => {
    setParticipationModal(false);
    setParticipation(true);
    console.log("OTT 구독자 추가!")
    //OTT 구독자 참여 DB 반영

    axios.post("http://holo.dothome.co.kr/OttParticipate.php", JSON.stringify({id: id, starter: user, user: currentUser}),{
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
            window.Android.createChatRoom(hostEmail, partner, boardTitle);
          }
          catch (e) {
            console.log("Android 없음!");
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    
    //accumulate 업데이트
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/findOTTPost.php", JSON.stringify({postid: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        setAccumulate(response.data[0].accumulate);
      })
      .catch(function(error) {
        console.log(error);
      })
    }, 100);
  }

  const cancelMsg = "\n참여를 취소하시겠습니까?\n신중하게 결정해주세요!"
  const cancelPost = () => {
    setCancelModal(false);
    setParticipation(false);
    console.log("OTT 구독 취소!")
    //OTT 구독자 참여 취소 DB 반영

    axios.post("http://holo.dothome.co.kr/OttCancelParticipate.php", JSON.stringify({id: id, user: currentUser}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(function(body) {
        console.log(body);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    //accumulate 업데이트
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/findOTTPost.php", JSON.stringify({postid: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        setAccumulate(response.data[0].accumulate);
      })
      .catch(function(error) {
        console.log(error);
      })
    }, 100);
  }

  const deleteMsg = "\n게시글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const deletePost = () => {
    setDeleteModal(false);

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
    if(reply===''){
      setCheckModal(true)
    }
    else{
      setReply('');
      setReplyNum(replyNum+1);  //댓글 개수 증가
      console.log("댓글 등록");
      var date = getToday();
      axios.post("http://holo.dothome.co.kr/commentOtt.php", JSON.stringify({writer: user,post: id, user: currentUser, content: reply, date: date}),{
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      })
      .then(response => {   
        var type = "comment";
        var toEmail = JSON.stringify(response.data);
        var content = reply;

        try {
          window.Android.sendCmtAlarm(type,toEmail, content, url);
        }
        catch (e) {
          console.log("Android 없음!");
        }
      })
        .catch(function(error) {
          console.log(error);
        });
      
      //댓글 업데이트
      setTimeout(() => {
        axios.post("http://holo.dothome.co.kr/getCommentOtt.php", JSON.stringify({post: id}),
        {
          withCredentials: false,
          headers: {"Content-Type": "application/json"}
        }).then(response => {        
          setReplyList(response.data);
          ReplyList = response.data;

          //setReplyNum(replyList.length);
        })
        .catch(function(error) {
          console.log(error);
        })
      }, 100);
    }
  }
  
  const editReply = (replyId, replyContent) => {
    var date = getToday();

    axios.post("http://holo.dothome.co.kr/updateCommentOtt.php", JSON.stringify({id: replyId, content: replyContent, date: date}),
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
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/getCommentOtt.php", JSON.stringify({post: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        setReplyList(response.data);
        ReplyList = response.data;

        //setReplyNum(replyList.length);
      })
      .catch(function(error) {
        console.log(error);
      })
    }, 100);
  }

  const replyDeleteMsg = "\n댓글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const setDeleteReply = (replyId) => {
    setReplyDeleteModal(true);
    setReplyId(replyId);
  }
  const deleteReply = () => {
    setReplyDeleteModal(false);

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

    //댓글 업데이트
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/getCommentOtt.php", JSON.stringify({post: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        setReplyList(response.data);
        ReplyList = response.data;

        //setReplyNum(replyList.length);
      })
      .catch(function(error) {
        console.log(error);
      })
    }, 100);
  }

  const submitReReply = (replyId, reReplyContent) => {
    console.log("답글 등록")
    setReplyNum(replyNum+1);  //댓글 개수 증가
    //답글 등록 (댓글 id, 답글 내용)
      console.log("답글 등록");
      var date = getToday();
  
      axios.post("http://holo.dothome.co.kr/replyOtt.php", 
                JSON.stringify({writer: user, reply_id: replyId, user: currentUser, content: reReplyContent, date: date}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      })
        .then(response => {   
          var type = "subComment";
          var toEmail = JSON.stringify(response.data);
          var content = reReplyContent;

          try {
            window.Android.sendCmtAlarm(type, toEmail, content, url);
          }
          catch (e) {
            console.log("Android 없음!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });

    //답글 업데이트
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/getReplyOtt.php", JSON.stringify({post: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        setReReplyList(response.data);
        ReReplyList = response.data;
        //setReplyNum(replyList.length);
      })
      .catch(function(error) {
        console.log(error);
      })
    }, 100);
  }

  const editReReply = (reReplyId, reReplyContent) => {
    console.log("답글 수정")
   
    var date = getToday();

    axios.post("http://holo.dothome.co.kr/updateReplyOtt.php", JSON.stringify({reReplyId: reReplyId, content: reReplyContent, date: date}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {   
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    //답글 업데이트
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/getReplyOtt.php", JSON.stringify({post: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        setReReplyList(response.data);
        ReReplyList = response.data;
        //setReplyNum(replyList.length);
      })
      .catch(function(error) {
        console.log(error);
      })
    }, 100);
  }

  const reReplyDeleteMsg = "\n답글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const setDeleteReReply = (reReplyId) => {
    setReReplyDeleteModal(true);
    setReReplyId(reReplyId);
  }
  const deleteReReply = () => {
    setReReplyDeleteModal(false);
    console.log("답글 삭제")
    //답글 삭제 (삭제할 답글 id = reReplyId)
    axios.post("http://holo.dothome.co.kr/deleteReplyOtt.php", JSON.stringify({reReplyId: reReplyId}),
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

    //답글 업데이트
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/getReplyOtt.php", JSON.stringify({post: id}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        setReReplyList(response.data);
        ReReplyList = response.data;
        //setReplyNum(replyList.length);
      })
      .catch(function(error) {
        console.log(error);
      })
    }, 100);
  }

  return (
    <div>
      <div className="postHeaderBar">
        <div>OTT 구독</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postUser"><div><img src={profile} alt=" "/></div><span>{user}</span></div>
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
          {currentUser.toString()===user_id
            ?<button className="dealButton purple" onClick={()=>{setManageModal(true);}}><FaRegLaughBeam/>   모집 관리!</button>
            :<div>
              {participation
                ? <button className="dealButton pink" onClick={() => { setCancelModal(true); }}><FaRegLaughSquint/>   참여 완료!</button>
                : <button className="dealButton skyblue" onClick={() => { setParticipationModal(true); }}><FaRegLaugh/>   참여 신청!</button>
              }
            </div>
          }
          <div className="postEtc2">
            <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
            {currentUser.toString()===user_id
             ?<div>
                <Link to={`/edit/ott/${id}`}>
                  <button className="postEtcButton">수정</button>
                </Link>
                <button className="postEtcButton" onClick={() => {setDeleteModal(true);}}>삭제</button>
              </div>
             :<div/>
            }
          </div>
        </div>
      </div>
      <div className="postReply">
        <div><BiMessageDetail style={{fontSize: '3.5vh'}}/> 댓글 {replyNum}</div>
        <div className="replyInput">
          <textarea placeholder='댓글을 입력해주세요.' value={reply} spellCheck="false" onChange={replyChange} maxLength='200'></textarea>
          <button onClick={() => {submitReply()}}>등록</button>
        </div>
        <div className="replyTable">
          <ReplyTable currentUser={currentUser} replyList={replyList} replyEditFunc={editReply} replyDeleteFunc={setDeleteReply}
                      reReplyList={reReplyList} reReplySubmitFunc={submitReReply} reReplyEditFunc={editReReply} reReplyDeleteFunc={setDeleteReReply}/>
        </div>
      </div>
      <Modal type="Info" open={userInfoModal} close={()=>{setUserInfoModal(false);}}>{user+"님의 별점은 "+score+"/5점 입니다.\n거래 참여 횟수는 "+deal_count+"회 입니다."}</Modal>
      <Modal type="Deal" open={manageModal} close={()=>{setManageModal(false);}} submit={()=>{setSuccessModal(true);}} refuse={setRefuseUser} list={participationList}>모집 현황</Modal>
      <Modal type="Check" open={refuseModal} close={()=>{setRefuseModal(false);}} submit={refuseUser}>{refuseMsg}</Modal>
      <Modal type="Check" open={successModal} close={()=>{setSuccessModal(false);}} submit={successPost}>{successMsg}</Modal>
      <Modal type="Check" open={participationModal} close={()=>{setParticipationModal(false);}} submit={participationPost}>{participationMsg}</Modal>
      <Modal type="Check" open={cancelModal} close={()=>{setCancelModal(false);}} submit={cancelPost}>{cancelMsg}</Modal>
      <Modal type="Check" open={deleteModal} close={()=>{setDeleteModal(false);}} submit={deletePost}>{deleteMsg}</Modal>
      <Modal type="Info" open={checkModal} close={()=>setCheckModal(false)}>내용을 입력해주세요!</Modal>
      <Modal type="Check" open={replyDeleteModal} close={()=>{setReplyDeleteModal(false);}} submit={deleteReply}>{replyDeleteMsg}</Modal>
      <Modal type="Check" open={reReplyDeleteModal} close={()=>{setReReplyDeleteModal(false);}} submit={deleteReReply}>{reReplyDeleteMsg}</Modal>
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
       user_id : 32,  //작성자 id
       user : "",
       score : 0, //작성자 평점
       deal_count : 0, //작성자 거래횟수,
       participationList: [], //거래 참여자 정보
       userMail : "", //작성자 이메일
       title : "",
       content : "",
       reg_date : "",
       limit_date : "",
       buy_location : "",
       goal : "",
       accumulate : "",
       view : "",
       replyList : [],   //임의 댓글 데이터
       reReplyList : [],
       currentUser : 28,
       alreadyParticipated : "false",
       profile: ''
    };

    var cookies = new Cookies()

    if(cookies.get('uid')){
      this.state.currentUser = cookies.get('uid')
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    console.log(this.state.id);
    //거래정보 불러오기 (작성자-메일,평점,거래횟수 / 거래참여자들-메일,평점,닉네임,거래횟수,참여금액)
    axios.post("http://holo.dothome.co.kr/getOttInfo.php", JSON.stringify({postid: this.state.id}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        console.log(response.data);
        this.setState ({
          score : response.data.score,
          userMail: response.data.userMail,
          deal_count : response.data.deal_count,
          participationList : response.data.participationList});  
        getProfileImg(response.data.userMail).then((img) => {
          this.setState ({
            profile: img})
        });
      })
      .catch(function(error) {
        console.log(error);
      });

      //게시글 상세정보 불러오기
      axios.post("http://holo.dothome.co.kr/findOTTPost.php", JSON.stringify({postid: this.state.id}),{
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      })
      .then(response => {
        console.log(response.data[0]);
        this.setState ({
          user_id : response.data[0].uid,
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

    //게시글을 이용하려는 사용자가 이미 참여를 했는지 검사
    //이미 눌렀으면 true를, 아니면 false라는 응답을 얻게됨
    axios.post("http://holo.dothome.co.kr/OttAlreadyParticipated.php", JSON.stringify({id: this.state.id, user: this.state.currentUser}),
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
    
    //게시글에 달린 답글 불러오는 부분
    axios.post("http://holo.dothome.co.kr/getReplyOtt.php", JSON.stringify({post: this.state.id}),
    {
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    }).then(response => {
      console.log(response.data);
      
      this.setState({
        reReplyList : response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  };                         

  render() {
    return(
      <ShowPost state={this.state}/>
    );
  }
}

export default Post;
