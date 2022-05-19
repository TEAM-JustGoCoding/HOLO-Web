import './Write.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import axios from 'axios';

axios.defaults.withCredentials = true;  //axios 전역설정

var Policy_state = {
  user : '25',
  title : '',
  content : '',
  date : '',
  view : '0',
  like : '0'
};
var Document_state = {
  user : '25',
  title : '',
  content : '',
  date : '',
  view : '0',
  like : '0'
};
var OTT_state = {
  user : '25',
  title : '',
  content : '',
  date : '',
  buy_date : '0',
  buyLocation : '0',
  goal : '1',
  view : '0',
  like : '0'
};
var Delivery_state = {
  user : '25',
  title : '',
  content : '',
  date : '',
  buy_date : '0',
  buyLocation : '0',
  pickupLocation : '0',
  goal : '10000',
  view : '0',
  like : '0'
};

function PolicyWrite() {
  const P_titleChange = async (e) =>{
    Policy_state.title = e.target.value;
  };
  function P_contentChange (e) {
    Policy_state.content = e.target.value;
  };

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false" onChange={P_titleChange}/>
      <textarea id="content" className="infoContent" placeholder='내용을 입력하세요.' spellCheck="false" onChange={P_contentChange}/>
    </div>
  )
}

function DocumentWrite() {
  const D_titleChange = async (e) =>{
    Document_state.title = e.target.value;
  };
  function D_contentChange (e) {
    Document_state.content = e.target.value;
  };

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false" onChange={D_titleChange}/>
      <textarea id="content" className="infoContent" placeholder='내용을 입력하세요.' spellCheck="false" onChange={D_contentChange}/>
    </div>
  )
}

function OTTWrite(){
  function O_titleChange (e) {
    OTT_state.title = e.target.value;
  };
  function O_contentChange (e) {
    OTT_state.content = e.target.value;
  };
  function O_goalChange (e) {
    OTT_state.goal = e.target.value;
  }
  function O_buyDateChange (e) {
    OTT_state.buy_date = e.target.value;
  }
  function O_buyLocationChange (e) {
    OTT_state.buyLocation = e.target.value;
  }

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false" onChange={O_titleChange}/>
      <input type='text' id="date" placeholder='구매 일시' spellCheck="false" onChange={O_buyDateChange}/>
      <input type='text' id="buyLocation" className="contentInput" placeholder='OTT 플랫폼' spellCheck="false" onChange={O_buyLocationChange}/>
      <input type='text' id="accumulate" className="contentInput" placeholder='목표 인원' spellCheck="false" onChange={O_goalChange}/>
      <textarea id="content" className="ottContent" placeholder='내용을 입력하세요.' spellCheck="false" onChange={O_contentChange}/>
    </div>
  )
}

function DeliveryWrite() {
  function G_titleChange (e) {
    Delivery_state.title = e.target.value;
  };
  function G_contentChange (e) {
    Delivery_state.content = e.target.value;
  };
  function G_goalChange (e) {
    Delivery_state.goal = e.target.value;
  }
  function G_buyLocationChange (e) {
    Delivery_state.buyLocation = e.target.value;
  }
  function G_buyDateChange (e) {
    Delivery_state.buy_date = e.target.value;
  }
  function G_pickupChange (e) {
    Delivery_state.pickupLocation = e.target.value;
  }

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false" onChange={G_titleChange}/>
      <input type='text' id="date" placeholder='구매 일시' spellCheck="false" onChange={G_buyDateChange}/>
      <input type='text' id="buyLocation" placeholder='구매처' spellCheck="false" onChange={G_buyLocationChange}/>
      <input type='text' id="accumulate" placeholder='목표 금액' spellCheck="false" onChange={G_goalChange}/>
      <input type='text' id="pickupLocation" placeholder='픽업 위치' spellCheck="false" onChange={G_pickupChange}/>
      <textarea id="content" className="deliveryContent" placeholder='내용을 입력하세요.' spellCheck="false" onChange={G_contentChange}/>
    </div>
  )
}

function ShowInput(props) {
  switch(props.category){
    case "정책":
      return <PolicyWrite/>;
    case "생활백서":   
      return <DocumentWrite/>;
    case "OTT구독":
      return <OTTWrite/>;
    case "공동구매":
      return <DeliveryWrite/>;
    default:
      return null
  }
}

function getToday(){
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  return year + "-" + month + "-" + day + " " + time;
}


function postDB(category){
  var date = getToday();

  switch(category){
    case "정책":
      Policy_state.date = date;
      console.log(JSON.stringify(Policy_state));
      PolicySubmit(Policy_state);
      return;
    case "생활백서": 
      Document_state.date = date;
      console.log(JSON.stringify(Document_state));
      DocSubmit(Document_state);
      return;
    case "OTT구독":
      OTT_state.date = date;
      console.log(JSON.stringify(OTT_state));
      OTTSubmit(OTT_state);
      return;
    case "공동구매":
      Delivery_state.date = date;
      console.log(JSON.stringify(Delivery_state));
      DeliverySubmit(Delivery_state);
      return;
    default:
      return null
  }
}

function PolicySubmit(data){
  axios.post("http://holo.dothome.co.kr/TestSendPolicyJson.php", JSON.stringify(data),{
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

function DocSubmit(data){
    axios.post("http://holo.dothome.co.kr/TestSendDocJson.php", JSON.stringify(data),{
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

function OTTSubmit(data){
  axios.post("http://holo.dothome.co.kr/sendOTTjson.php", JSON.stringify(data),{
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

function DeliverySubmit(data){
  axios.post("http://holo.dothome.co.kr/sendDeliveryJson.php", JSON.stringify(data),{
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

function Write() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("정책");
  const [dropdownOpen, setDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const goBack = () => {
    navigate(-1)
  };
  const openDropdown = () => {
    setDropdown(true);
  };
  const closeDropdown = (selectCategory) => {
    setDropdown(false);
    setCategory(selectCategory);
  };
  const openModal = () => {
    setModalOpen(true);
    console.log(document.getElementById('title').value)
  };
  const closeModal = () => {
    setModalOpen(false);
    goBack();
  };

  return (
    <div>
      <div className="writeHeaderBar">
        <button className="finButton" onClick={goBack}>취소</button>
        <button className="categoryButton" onClick={openDropdown}>{category}</button>
        <Dropdown open={dropdownOpen} close={closeDropdown}></Dropdown>
        <button className="finButton" onClick={() => {openModal(); postDB(category);}}>완료</button>
        <Modal type="Info" open={modalOpen} close={closeModal}>
          게시글 작성이 완료되었어요!
        </Modal>
      </div>
      <ShowInput category={category}></ShowInput>
    </div>
  );
}


export default Write;
