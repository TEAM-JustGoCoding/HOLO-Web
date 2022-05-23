import './Post.css';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import ReplyTable from '../../components/ReplyTable';
import {images} from '../../images';
import { AiOutlineEye } from "react-icons/ai";
import { FaRegLaugh, FaRegLaughSquint } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import axios from 'axios';

var replyList = [{id: 1, user: "우네", content: "안녕하세용", date: "2022-05-23 05:08:00"},
{id: 2, user: "먼지", content: "와! 이건 정말 대박 정보!", date: "2022-05-23 05:08:00"},
{id: 3, user: "구리", content: "와 진짜 짱이에용 ㅠ\n감사합니당~", date: "2022-05-23 05:08:00"},
{id: 4, user: "옌", content: "무야호~", date: "2022-05-23 05:08:00"}]

function ShowPost(props) {
  //const {id} = useParams();
  const navigate = useNavigate();
  const [participation, setParticipation] = useState(false);
  const [participationModalOpen, setParticipationModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [replyDeleteModalOpen, setReplyDeleteModalOpen] = useState(false);
  const [reply, setReply] = useState('');
  const [replyNum, setReplyNum] = useState(0);
  const [replyEdit, setReplyEdit] = useState(false);

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

  function replyChange (e) {
    setReply(e.target.value)
  };

  const participationMsg = "\n공동구매에 참여할 금액을 작성해주세요.\n입력하신 금액은 참여 현황에 반영됩니다.\n신중하게 작성해주세요!\n0원 이하는 입력할 수 없습니다.";
  const participationPost = (money) => {
    setParticipationModalOpen(false);
    setParticipation(true);
    console.log(money+"원! 공동구매 금액 추가!")
    //공동구매 참여 DB 반영
  };
  
  const cancelMsg = "\n참여를 취소하시겠습니까?\n신중하게 결정해주세요!"
  const cancelPost = () => {
    setCancelModalOpen(false);
    setParticipation(false);
    console.log("공동구매 참여 취소!")
    //공동구매 참여 취소 DB 반영
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
          <Modal type="Input" open={participationModalOpen} close={() => {setParticipationModalOpen(false);}} submit={participationPost}>
            {participationMsg}
          </Modal>
          <Modal type="Check" open={cancelModalOpen} close={()=>{setCancelModalOpen(false);}} submit={cancelPost}>
            {cancelMsg}
          </Modal>
          <div className="postEtc2">
            <AiOutlineEye style={{ fontSize: '3.5vh', marginRight: '1vh'}}/>{view}
            <div>
              <Link to={`/edit/delivery/${id}`}>
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

    //console.log(window.location.href); // http://localhost:3000/deliverypost/4
    var pathname = window.location.pathname;
    var words = pathname.split('/');
    console.log(words[2]);

    this.state = {
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
       view : ""
    };

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
                     
  };                         

  render() {
    return(
      <ShowPost id = {this.state.id} user={this.state.user} title={this.state.title} content={this.state.content} reg_date={this.state.reg_date}
                limit_date={this.state.limit_date} buy_location={this.state.buy_location} pickup_location={this.state.pickup_location} 
                goal={this.state.goal} view={this.state.view} accumulate={this.state.accumulate}/>
    );
  }
}

export default Post;