import './Post.css';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Cookies} from "react-cookie";
import Modal from '../../components/Modal';
import ReplyTable from '../../components/ReplyTable';
import {getProfileImg} from '../../firebase'
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import axios from 'axios';


function ShowPost(props) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(0);
  const [heart, setHeart] = useState(false);
  const [like, setLike] =useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [replyDeleteModal, setReplyDeleteModal] = useState(false);
  const [reReplyDeleteModal, setReReplyDeleteModal] = useState(false);
  const [reply, setReply] = useState('');
  const [replyNum, setReplyNum] = useState(0);
  const [replyList, setReplyList] = useState([]);
  const [replyId, setReplyId] = useState(null);
  const [reReplyId, setReReplyId] = useState(null);
  const [reReplyList, setReReplyList] = useState([]);

  var url = '?path=documentpost&id='+props.state.id;
  var id = props.state.id;
  var user_id = props.state.user_id;
  var user = props.state.user;
  var title = props.state.title;
  var content = props.state.content;
  var reg_date = props.state.reg_date;
  var view = props.state.view;
  var profile = props.state.profile;
  var ReplyList = props.state.replyList;
  var ReReplyList = props.state.reReplyList;

  useEffect(() => {
    setCurrentUser(props.state.currentUser);
  }, [props.state.currentUser])
  useEffect(() => {
    setHeart(props.state.alreadyLiked);
  }, [props.state.alreadyLiked]);
  useEffect(() => {
    setLike(props.state.like);
  }, [props.state.like]);
  useEffect(()=>{
    setReplyList(props.state.replyList);
  }, [props.state.replyList]);
  useEffect(()=>{
    setReplyNum(props.state.replyList.length + props.state.reReplyList.length);
  }, [props.state.replyList, props.state.reReplyList]);
  useEffect(()=>{
    setReReplyList(props.state.reReplyList);
  }, [props.state.reReplyList]);
  
  useEffect(()=>{
    setReplyList(ReplyList);
  }, [ReplyList]);
  useEffect(()=>{
    setReReplyList(ReReplyList);
  }, [ReReplyList]);
  
  function replyChange (e) {
    if (e.target.value.length > 200) {
      setReply(e.target.value.slice(0, 200))
    }
    else {
      setReply(e.target.value)
    }
  };

  const deleteMsg = "\n???????????? ?????????????????????????\n?????? ????????? ??????????????????.\n???????????? ??????????????????!"
  const deletePost = () => {
    setDeleteModal(false);

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
      window.Android.showToast("???????????? ?????? ??????!");
    }
    catch (e) {
      console.log("Android ??????!");
    }

    if(reply===''){
      setCheckModal(true)
    }
    else{
      setReply('');
      setReplyNum(replyNum+1);  //?????? ?????? ??????
      console.log("?????? ??????");
      var date = getToday();
  
      axios.post("http://holo.dothome.co.kr/commentDoc.php", JSON.stringify({writer: user, post: id, user: currentUser, content: reply, date: date}),{
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
            console.log("Android ??????!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      
      setTimeout(() => {
          axios.post("http://holo.dothome.co.kr/getCommentDoc.php", JSON.stringify({post: id}),
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
    
    setTimeout(() => {
        axios.post("http://holo.dothome.co.kr/getCommentDoc.php", JSON.stringify({post: id}),
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
    
    setReplyNum(replyNum-1);  //?????? ??????--
    setTimeout(() => {
      axios.post("http://holo.dothome.co.kr/getCommentDoc.php", JSON.stringify({post: id}),
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
    setReplyNum(replyNum+1);  //?????? ?????? ??????
    //?????? ?????? (?????? id, ?????? ??????)
      console.log("?????? ??????");
      var date = getToday();
  
      axios.post("http://holo.dothome.co.kr/replyDoc.php", 
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
            window.Android.sendCmtAlarm(type,toEmail, content, url);
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
          axios.post("http://holo.dothome.co.kr/getReplyDocument.php", JSON.stringify({post: id}),
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
    //?????? ?????? (?????? id, ?????? ??????)
    var date = getToday();

    axios.post("http://holo.dothome.co.kr/updateReplyDoc.php", JSON.stringify({reReplyId: reReplyId, content: reReplyContent, date: date}),
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
        axios.post("http://holo.dothome.co.kr/getReplyDocument.php", JSON.stringify({post: id}),
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
    
    axios.post("http://holo.dothome.co.kr/deleteReplyDoc.php", JSON.stringify({reReplyId: reReplyId}),
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
      axios.post("http://holo.dothome.co.kr/getReplyDocument.php", JSON.stringify({post: id}),
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
      <div className="postUser"><div><img src={profile} alt=" "/></div><span>{user}</span></div>
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
            {currentUser.toString()===user_id
             ?<div>
                <Link to={`/edit/document/${id}`}>
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

    this.state = {
       pathname : pathname,
       id : words[2],
       user_id : 37,  //????????? id
       user : "",
       score : 0,
       deal_count : 0,
       userMail : "",
       title : "",
       content : "",
       reg_date : "",
       view : "",
       like : "",
       alreadyLiked: "",
       replyList : [],
       reReplyList : [],
       currentUser: 82, //????????? ?????? ??????
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
    
    //???????????? ???????????? (?????????-??????,??????,????????????)
    axios.post("http://holo.dothome.co.kr/getDocInfo.php", JSON.stringify({postid: this.state.id}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        console.log(response.data);
        this.setState ({
          score : response.data.score,
          userMail: response.data.userMail,
          deal_count : response.data.deal_count});
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

    axios.post("http://holo.dothome.co.kr/findDocPost.php", JSON.stringify({postid: this.state.id}),{
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
          view : response.data[0].view,
          like : response.data[0].like });  
      })
      .catch(function(error) {
        console.log(error);
      });

    //???????????? ??????????????? ???????????? ?????? ???????????? ???????????? ??????
    //?????? ???????????? true???, ????????? false?????? ????????? ?????????
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
    
    //???????????? ?????? ?????? ???????????? ??????
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
    
    //???????????? ?????? ?????? ???????????? ??????
    axios.post("http://holo.dothome.co.kr/getReplyDocument.php", JSON.stringify({post: this.state.id}),
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
