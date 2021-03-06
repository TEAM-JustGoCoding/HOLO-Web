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
  const [currentUser, setCurrentUser] = useState(0);
  const [participation, setParticipation] = useState(false);
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);
  const [refuseModal, setRefuseModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [participationModal, setParticipationModal] = useState(false); 
  const [participationCheckMsg, setParticipationCheckMsg] = useState("");
  const [participationCheckModal, setParticipationCheckModal] = useState(false);
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
  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const successMsg = "\n????????? ?????????????????????????\n?????? ????????? ??????????????????.\n???????????? ??????????????????!"
  const successPost = () => {
    setSuccessModal(false);
    //???????????? ?????? ??????
    axios.post("http://holo.dothome.co.kr/DeliveryEnd.php", JSON.stringify({id: id, starter: user}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        //????????? ???????????? ????????? ???????????? ??????        
        if(response.data['complete'] === "true"){
          console.log("?????? ??? ?????????!");

          var hostEmail = response.data['starter'];
          var partner = response.data['mates'];
          var boardTitle = title;

          try {
            window.Android.createChatRoom(hostEmail, partner, boardTitle);
          }
          catch (e) {
            console.log("Android ??????!");
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const refuseMsg = "\n?????? ????????? ?????????????????????????\n?????? ????????? ??????????????????.\n???????????? ??????????????????!"
  const setRefuseUser = (mail) => {
    setRefuseModal(true);
    setRefuseUserMail(mail)
  }
  const refuseUser = () => {
    setRefuseModal(false);
    setManageModal(false);
    //????????? ??????
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
          console.log("Android ??????!");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    
    //?????? ????????????
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
  
    //accumulate ????????????
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

  const participationMsg = "\n??????????????? ????????? ????????? ??????????????????.\n???????????? ????????? ?????? ????????? ???????????????.\n???????????? ??????????????????!";
  const participationPost = (money) => {
    console.log(money)
    if(money<=0){
      setParticipationCheckMsg("?????? ????????? 1??? ???????????? ??????????????????!")
      setParticipationCheckModal(true)
    }
    else if(money>1000000){
      setParticipationCheckMsg("?????? ????????? 100?????? ????????? ??????????????????!")     
      setParticipationCheckModal(true)
    }
    else{
      setParticipationModal(false);
      setParticipation(true);
  
      //???????????? ??????
      axios.post("http://holo.dothome.co.kr/DeliveryParticipate.php", JSON.stringify({id: id, starter: user, user: currentUser, money: money}),{
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      })
        .then(response => {
          //????????? ???????????? ????????? ???????????? ??????        
          if(response.data['complete'] === "true"){
            console.log("?????? ??? ?????????!");
  
            var hostEmail = response.data['starter'];
            var partner = response.data['mates'];
            var boardTitle = title;
  
            try {
              window.Android.createChatRoom(hostEmail, partner, boardTitle);
            }
            catch (e) {
              console.log("Android ??????!");
            }
          }
          
        })
        .catch(function(error) {
          console.log(error);
        });
      
      //accumulate ????????????
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
  };
  
  const cancelMsg = "\n????????? ?????????????????????????\n???????????? ??????????????????!"
  const cancelPost = () => {
    setCancelModal(false);
    setParticipation(false);
    console.log("???????????? ?????? ??????!")
    //???????????? ?????? ?????? DB ??????
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
    
    //accumulate ????????????
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

  const deleteMsg = "\n???????????? ?????????????????????????\n?????? ????????? ??????????????????.\n???????????? ??????????????????!"
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
      setReplyNum(replyNum+1);  //?????? ?????? ??????
      console.log("?????? ??????");
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
          console.log("Android ??????!");
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

  const replyDeleteMsg = "\n????????? ?????????????????????????\n?????? ????????? ??????????????????.\n???????????? ??????????????????!"
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
    console.log("?????? ??????")
    setReplyNum(replyNum+1);  //?????? ?????? ??????
    //?????? ?????? (?????? id, ?????? ??????)
      console.log("?????? ??????");
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
            console.log("Android ??????!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    
    //?????? ????????????
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
    console.log("?????? ??????")
    //?????? ?????? (?????? id, ?????? ??????)
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
    
    //?????? ????????????
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

  const reReplyDeleteMsg = "\n????????? ?????????????????????????\n?????? ????????? ??????????????????.\n???????????? ??????????????????!"
  const setDeleteReReply = (reReplyId) => {
    setReReplyDeleteModal(true);
    setReReplyId(reReplyId);
  }
  const deleteReReply = () => {
    setReReplyDeleteModal(false);
    console.log("?????? ??????")
    //?????? ?????? (????????? ?????? id = reReplyId)

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
    
    setReplyNum(replyNum-1);  //?????? ?????? ??????
    //?????? ????????????
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
        <div>????????????</div>
      </div>
      <div className="postTitle">{title}</div>
      <div className="postUser"><div><img src={profile} alt=" " onClick={()=>setUserInfoModal(true)}/></div><span>{user}</span></div>
      <div className="postRegDate">{reg_date}</div>
      <div className="postContent">
        <div className="postDealContent">
            ?????? ??????: {limit_date} <br/>
            ?????????: {buy_location} <br/>
            ?????? ??????: {pickup_location} <br/>
            ?????? ??????: {priceToString(goal)}??? <br/>
            ?????? ??????: {priceToString(accumulate)}???
        </div>
        {content}
        <div className="postEtc">
          {currentUser.toString()===user_id
            ?<button className="dealButton purple" onClick={()=>{setManageModal(true);}}><FaRegLaughBeam/>   ?????? ??????!</button>
            :<div>
              {participation
              ? <button className="dealButton pink" onClick={() => { setCancelModal(true); }}><FaRegLaughSquint/>   ?????? ??????!</button>
              : <button className="dealButton skyblue" onClick={() => { setParticipationModal(true); }}><FaRegLaugh/>   ?????? ??????!</button>
              }
             </div>
          }
          <div className="postEtc2">
            <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
            {currentUser.toString()===user_id
             ?<div>
                <Link to={`/edit/delivery/${id}`}>
                  <button className="postEtcButton">??????</button>
                </Link>
                <button className="postEtcButton" onClick={() => {setDeleteModal(true);}}>??????</button>
              </div>
             :<div/>
            }
          </div>
        </div>
      </div>
      <div className="postReply">
        <div><BiMessageDetail style={{fontSize: '3.5vh'}}/> ?????? {replyNum}</div>
        <div className="replyInput">
          <textarea placeholder='????????? ??????????????????.' value={reply} spellCheck="false" onChange={replyChange} maxLength='200'></textarea>
          <button onClick={() => {submitReply()}}>??????</button>
        </div>
        <div className="replyTable">
          <ReplyTable currentUser={currentUser} replyList={replyList} replyEditFunc={editReply} replyDeleteFunc={setDeleteReply}
                      reReplyList={reReplyList} reReplySubmitFunc={submitReReply} reReplyEditFunc={editReReply} reReplyDeleteFunc={setDeleteReReply}/>
        </div>
      </div>
      <Modal type="Info" open={userInfoModal} close={()=>{setUserInfoModal(false);}}>{user+"?????? ????????? "+score+"/5??? ?????????.\n?????? ?????? ????????? "+deal_count+"??? ?????????."}</Modal>
      <Modal type="Deal" open={manageModal} close={()=>{setManageModal(false);}} submit={()=>{setSuccessModal(true);}} refuse={setRefuseUser} list={participationList}>?????? ??????</Modal>
      <Modal type="Check" open={refuseModal} close={()=>{setRefuseModal(false);}} submit={refuseUser}>{refuseMsg}</Modal>
      <Modal type="Check" open={successModal} close={()=>{setSuccessModal(false);}} submit={successPost}>{successMsg}</Modal>
      <Modal type="Input" open={participationModal} close={()=>{setParticipationModal(false);}} submit={participationPost}>{participationMsg}</Modal>
      <Modal type="Info" open={participationCheckModal} close={()=>{setParticipationCheckModal(false)}}>{participationCheckMsg}</Modal>
      <Modal type="Check" open={cancelModal} close={()=>{setCancelModal(false);}} submit={cancelPost}>{cancelMsg}</Modal>
      <Modal type="Check" open={deleteModal} close={()=>{setDeleteModal(false);}} submit={deletePost}>{deleteMsg}</Modal>
      <Modal type="Info" open={checkModal} close={()=>setCheckModal(false)}>????????? ??????????????????!</Modal>
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
       user_id : 35,  //????????? id
       user : "", //????????? ?????????
       score : 0, //????????? ??????
       deal_count : 0, //????????? ????????????,
       participationList: [], //?????? ????????? ??????
       userMail : "", //????????? ?????????
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
       currentUser : 82,
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
    //???????????? ???????????? (?????????-??????,??????,???????????? / ??????????????????-??????,??????,?????????,????????????,????????????)
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
        if(sessionStorage.getItem(response.data.userMail)===null){
          getProfileImg(response.data.userMail).then((img) => {
            this.setState ({
              profile: img
            })
            sessionStorage.setItem(response.data.userMail, img)
          });
        }
        else{
          this.setState ({
            profile: sessionStorage.getItem(response.data.userMail)
          })
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    //????????? ???????????? ????????????
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

    //???????????? ??????????????? ???????????? ?????? ????????? ????????? ??????
    //?????? ???????????? true???, ????????? false?????? ????????? ?????????
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
    
    //???????????? ?????? ?????? ???????????? ??????
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

    //???????????? ?????? ?????? ???????????? ??????
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
