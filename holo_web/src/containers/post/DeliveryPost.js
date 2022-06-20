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
  const [participation, setParticipation] = useState(false);
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);
  const [refuseModal, setRefuseModal] = useState(false);
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
  const [participationList, setParticipationList] = useState(props.state.participationList);

  var url = '?path=deliverypost&id='+props.state.id;
  var id = props.state.id;
  var user_id = props.state.user_id;
  var user = props.state.user;
  var score = props.state.score;
  var deal_count = props.state.deal_count;
  //var ParticipationList = props.state.participationList;
  var title = props.state.title;
  var content = props.state.content;
  var reg_date = props.state.reg_date;
  var limit_date = props.state.limit_date;
  var buy_location = props.state.buy_location;
  var pickup_location = props.state.pickup_location;
  var goal = props.state.goal;
  var view = props.state.view;
  var profile = props.state.profile;
  var ReplyList = props.state.replyList;
  var ReReplyList = props.state.reReplyList;
  
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
    setReplyList(ReplyList);
  }, [ReplyList]);
  useEffect(()=>{
    setReReplyList(ReReplyList);
  }, [ReReplyList]);
  useEffect(()=>{
    setAccumulate(props.state.accumulate);
  }, [props.state.accumulate]);
  useEffect(()=>{
    setParticipationList(props.state.participationList);
  }, [props.state.participationList]);
  
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
    //공동구매 모집 마감
    axios.post("http://holo.dothome.co.kr/DeliveryEnd.php", JSON.stringify({id: id, starter: user}),{
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
    //참여자 거절
    axios.post("http://holo.dothome.co.kr/DeliveryDeclineParticipate.php", JSON.stringify({id: id, refuseTo: refuseUserMail}),{
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
    
    //명단 업데이트
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/getDeliveryInfo.php", JSON.stringify({postid: id}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
      })
      .then(response => {
        console.log(response.data.participationList);
        setParticipationList(response.data.participationList);
      })
      .catch(function(error) {
        console.log(error);
      });
    }, 100);
  
    //accumulate 업데이트
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/findDeliveryPost.php", JSON.stringify({postid: id}),
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

  const participationMsg = "\n공동구매에 참여할 금액을 작성해주세요.\n입력하신 금액은 참여 현황에 반영됩니다.\n신중하게 작성해주세요!\n0원 이하는 입력할 수 없습니다.";
  const participationPost = (money) => {
    setParticipationModal(false);
    setParticipation(true);
    console.log(money+"원! 공동구매 금액 추가!")

    //공동구매 참여
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
      axios.post("http://holo.dothome.co.kr/findDeliveryPost.php", JSON.stringify({postid: id}),
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
  };
  
  const cancelMsg = "\n참여를 취소하시겠습니까?\n신중하게 결정해주세요!"
  const cancelPost = () => {
    setCancelModal(false);
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
    
    //accumulate 업데이트
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/findDeliveryPost.php", JSON.stringify({postid: id}),
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
      setCheckModal(true)
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
        var toEmail = JSON.stringify(response.data);
        var content = reply;

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
     
      setTimeout(() => {
          axios.post("http://holo.dothome.co.kr/getCommentDelivery.php", JSON.stringify({post: id}),
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
      
    setTimeout(() => {
        axios.post("http://holo.dothome.co.kr/getCommentDelivery.php", JSON.stringify({post: id}),
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
    
    setTimeout(() => {
        axios.post("http://holo.dothome.co.kr/getCommentDelivery.php", JSON.stringify({post: id}),
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
  
      axios.post("http://holo.dothome.co.kr/replyDelivery.php", 
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
      axios.post("http://holo.dothome.co.kr/getReplyDelivery.php", JSON.stringify({post: id}),
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
    //답글 수정 (답글 id, 답글 내용)
    var date = getToday();

    axios.post("http://holo.dothome.co.kr/updateReplyDelivery.php", JSON.stringify({reReplyId: reReplyId, content: reReplyContent, date: date}),
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
      axios.post("http://holo.dothome.co.kr/getReplyDelivery.php", JSON.stringify({post: id}),
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

    axios.post("http://holo.dothome.co.kr/deleteReplyDelivery.php", JSON.stringify({reReplyId: reReplyId}),
      {
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      }).then(response => {        
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    
    setReplyNum(replyNum-1);  //댓글 개수 감소
    //답글 업데이트
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/getReplyDelivery.php", JSON.stringify({post: id}),
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
        <div>공동구매</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postUser"><div><img src={profile} alt=" " onClick={()=>setUserInfoModal(true)}/></div><span>{user}</span></div>
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
                <Link to={`/edit/delivery/${id}`}>
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
      <Modal type="Input" open={participationModal} close={()=>{setParticipationModal(false);}} submit={participationPost}>{participationMsg}</Modal>
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
       user_id : 35,  //작성자 id
       user : "", //작성자 닉네임
       score : 0, //작성자 평점
       deal_count : 0, //작성자 거래횟수,
       participationList: [], //거래 참여자 정보
       userMail : "", //작성자 이메일
       title : "",
       content : "",
       reg_date : "",
       limit_date : "",
       buy_location : "",
       pickup_location : "",
       goal : "",
       accumulate : "",
       view : "",
       replyList : [],
       currentUser : 28,
       reReplyList : [],
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
    axios.post("http://holo.dothome.co.kr/getDeliveryInfo.php", JSON.stringify({postid: this.state.id}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
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
    axios.post("http://holo.dothome.co.kr/findDeliveryPost.php", JSON.stringify({postid: this.state.id}),{
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

    //게시글에 달린 답글 불러오는 부분
    axios.post("http://holo.dothome.co.kr/getReplyDelivery.php", JSON.stringify({post: this.state.id}),
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
