import './Post.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import {images} from '../../images';
import { AiOutlineEye } from "react-icons/ai";
import { FaRegLaugh, FaRegLaughSquint } from "react-icons/fa";
import axios from 'axios';

function ShowPost(props) {
  const [participation, setParticipation] = useState(false);
  const [participationModalOpen, setParticipationModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  const participationMsg = "\nOTT 구독자 모집에 참여하시겠습니까?\n신중하게 결정해주세요!"
  const participationPost = () => {
    setParticipationModalOpen(false);
    setParticipation(true);
    console.log("OTT 구독자 추가!")
    //OTT 구독자 모집 참여 DB 반영
  };
  
  const deleteMsg = "\n게시글을 삭제하시겠습니까?\n추후 복구는 불가능합니다.\n신중하게 결정해주세요!"
  const deletePost = () => {
    setDeleteModalOpen(false);
    console.log("게시글 삭제!")
    //게시글 삭제 DB 반영
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
              ? <button className="participationButton pink" onClick={() => { setInfoModalOpen(true); }}><FaRegLaughSquint/>   참여 완료!</button>
              : <button className="participationButton skyblue" onClick={() => { setParticipationModalOpen(true); }}><FaRegLaugh/>   참여 신청!</button>
          }
          <Modal type="Check" open={participationModalOpen} close={()=>{setParticipationModalOpen(false);}} submit={participationPost}>
            {participationMsg}
          </Modal>
          <Modal type="Info" open={infoModalOpen} close={()=>{setInfoModalOpen(false);}}>
            이미 참여한 게시글이에요!
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
       title : "",
       content : "",
       reg_date : "",
       limit_date : "",
       buy_location : "",
       goal : "",
       accumulate : "",
       view : ""
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
                     
  };                         


  render() {
    return(
      <ShowPost id = {this.state.id} user={this.state.user} title={this.state.title} content={this.state.content} reg_date={this.state.reg_date}
                limit_date={this.state.limit_date} buy_location={this.state.buy_location} 
                goal={this.state.goal} view={this.state.view} accumulate={this.state.accumulate}/>
    );
  }
}

export default Post;