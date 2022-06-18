import './Write.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import axios from 'axios';
import {Cookies} from "react-cookie";

axios.defaults.withCredentials = true;  //axios 전역설정

var Policy_state = {
  user : '32',
  title : '',
  content : '',
  reg_date : ''
};
var Document_state = {
  user : '32',
  title : '',
  content : '',
  reg_date : ''
};
var OTT_state = {
  user : '32',
  title : '',
  content : '',
  reg_date : '',
  limit_date : '',
  buy_location : '',
  goal : ''
};
var Delivery_state = {
  user : '32',
  title : '',
  content : '',
  reg_date : '',
  limit_date : '',
  buy_location : '',
  pickup_location : '',
  town_location : '양호동',
  goal : ''
};

function initState() {
  Policy_state.title=''; Policy_state.content='';
  Document_state.title=''; Document_state.content='';
  OTT_state.title=''; OTT_state.content=''; OTT_state.limit_date=''; OTT_state.buy_location=''; OTT_state.goal='';
  Delivery_state.title='';Delivery_state.content='';Delivery_state.limit_date=''; Delivery_state.buy_location='';Delivery_state.pickup_location='';Delivery_state.goal='';
}

function PolicyWrite() {
  function P_titleChange (e) {
    Policy_state.title = e.target.value;
  };
  function P_contentChange (e) {
    if (e.target.value.length > 21845) {
      Policy_state.content = e.target.value.slice(0,21845);
    }
    else {
      Policy_state.content = e.target.value;
    }
  };

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false" onChange={P_titleChange} maxLength='50'/>
      <textarea id="content" className="infoContent" placeholder='내용을 입력하세요.' spellCheck="false" onChange={P_contentChange} maxLength='21845'/>
    </div>
  )
}

function DocumentWrite() {
  function D_titleChange (e) {
    Document_state.title = e.target.value;
  };
  function D_contentChange (e) {
    if (e.target.value.length > 21845) {
      Document_state.content = e.target.value.slice(0,21845);
    }
    else {
      Document_state.content = e.target.value;
    }
  };

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false" onChange={D_titleChange} maxLength='50'/>
      <textarea id="content" className="infoContent" placeholder='내용을 입력하세요.' spellCheck="false" onChange={D_contentChange} maxLength='21845'/>
    </div>
  )
}

function OTTWrite(){
  function O_titleChange (e) {
    OTT_state.title = e.target.value;
  };
  function O_contentChange (e) {
    if (e.target.value.length > 21845) {
      OTT_state.content = e.target.value.slice(0,21845);
    }
    else {
      OTT_state.content = e.target.value;
    }
  };
  function O_goalChange (e) {
    if (e.target.value.length > 2){
      e.target.value = parseInt(String(e.target.value).slice(0,2));
    }
    OTT_state.goal = e.target.value;
  }
  function O_limitDateChange (e) {
    var temp_limit_date = e.target.value.replace('T',' ')+':00';
    OTT_state.limit_date = temp_limit_date;
  }
  function O_buyLocationChange (e) {
    OTT_state.buy_location = e.target.value;
  }

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false" onChange={O_titleChange} maxLength='50'/>
      <input type="datetime-local" id="limitDate" data-placeholder="구매 일시" required aria-required="true" onChange={O_limitDateChange}/>
      <input type='text' id="buyLocation" className="contentInput" placeholder='OTT 플랫폼' spellCheck="false" onChange={O_buyLocationChange} maxLength='50'/>
      <input type='number' id="goal" className="contentInput" min="0" max="10" placeholder='목표 인원 (10명 이하)' onInput={(e)=>{e.target.value=e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')}} onChange={O_goalChange} maxLength='2'/>
      <textarea id="content" className="ottContent" placeholder='내용을 입력하세요.' spellCheck="false" onChange={O_contentChange} maxLength='21845'/>
    </div>
  )
}

function DeliveryWrite() {
  function G_titleChange (e) {
    Delivery_state.title = e.target.value;
  };
  function G_contentChange (e) {
    if (e.target.value.length > 21845) {
      Delivery_state.content = e.target.value.slice(0,21845);
    }
    else {
      Delivery_state.content = e.target.value;
    }
  };
  function G_goalChange (e) {
    if (e.target.value.length > 7) {
      e.target.value = parseInt(String(e.target.value).slice(0,7));
    }
    Delivery_state.goal = e.target.value;
  }
  function G_buyLocationChange (e) {
    Delivery_state.buy_location = e.target.value;
  }
  function G_limitDateChange (e) {
    var temp_limit_date = e.target.value.replace('T',' ')+':00';
    Delivery_state.limit_date = temp_limit_date;
  }
  function G_pickupChange (e) {
    Delivery_state.pickup_location = e.target.value;
  }

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' spellCheck="false" onChange={G_titleChange} maxLength='50'/>
      <input type="datetime-local" id="limitDate" data-placeholder="구매 일시" required aria-required="true" onChange={G_limitDateChange}/>
      <input type='text' id="buyLocation" placeholder='구매처' spellCheck="false" onChange={G_buyLocationChange} maxLength='50'/>
      <input type='number' id="goal" min="0"  max="1000000" placeholder='목표 금액 (100만원 이하)' onInput={(e)=>{e.target.value=e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')}} onChange={G_goalChange} maxLength='7'/>
      <input type='text' id="pickupLocation" placeholder='픽업 위치' spellCheck="false" onChange={G_pickupChange} maxLength='50'/>
      <textarea id="content" className="deliveryContent" placeholder='내용을 입력하세요.' spellCheck="false" onChange={G_contentChange} maxLength='21845'/>
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
  var cookies = new Cookies()

  switch(category){
    case "정책":
      Policy_state.reg_date = date;    
      if(cookies.get('uid')){
        Policy_state.user = cookies.get('uid');
      }
      console.log(JSON.stringify(Policy_state));
      PolicySubmit(Policy_state);
      initState();
      return;
    case "생활백서": 
      Document_state.reg_date = date;
      if(cookies.get('uid')){
        Document_state.user = cookies.get('uid');
      }
      console.log(JSON.stringify(Document_state));
      DocSubmit(Document_state);
      initState();
      return;
    case "OTT구독":
      OTT_state.reg_date = date;
      if(cookies.get('uid')){
        OTT_state.user = cookies.get('uid');
      }
      console.log(JSON.stringify(OTT_state));
      OTTSubmit(OTT_state);
      initState();
      return;
    case "공동구매":
      Delivery_state.reg_date = date;
      if(cookies.get('uid')){
        Delivery_state.user = cookies.get('uid');
      }
      console.log(JSON.stringify(Delivery_state));
      DeliverySubmit(Delivery_state);
      initState();
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
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const [ottCheckModalOpen, setOttCheckModalOpen] = useState(false);
  const [deliveryCheckModalOpen, setDeliveryCheckModalOpen] = useState(false);
  const [finModalOpen, setFinModalOpen] = useState(false);

  var cookies = new Cookies()

  if(cookies.get('uid')){
    Policy_state.user = cookies.get('uid');
    Document_state.user = cookies.get('uid');
    OTT_state.user = cookies.get('uid');
    Delivery_state.user = cookies.get('uid');
  }

  if(cookies.get('town')){
    Delivery_state.town_location = cookies.get('town');
  }

  useEffect(()=>{
    switch(queryString.parse(window.location.search).select){
      case 'policy':
        setCategory("정책");
        break;
      case 'document':
        setCategory("생활백서");
        break;
      case 'delivery':
        setCategory("공동구매");
        break;
      case 'ott':
        setCategory("OTT구독");
        break;
      default:
        return null;
    }
  }, []);

  const goBack = () => {
    navigate(-1)
  };
  const openDropdown = () => {
    setDropdown(true);
  };
  const closeDropdown = (selectCategory) => {
    setDropdown(false);
    setCategory(selectCategory);
    initState();
  };
  const openFinModal = () => {
    setFinModalOpen(true);
  };
  const closeFinModal = () => {
    setFinModalOpen(false);
    goBack();
  };
  const checkFin = (category) => {
    switch(category){
      case "정책":
        if(Policy_state.title===''||Policy_state.content===''){setCheckModalOpen(true)}
        else{openFinModal(); postDB(category);}
        return;
      case "생활백서": 
        if(Document_state.title===''||Document_state.content===''){setCheckModalOpen(true)}
        else{openFinModal(); postDB(category);}
      return;
      case "OTT구독":
        if(OTT_state.title===''||OTT_state.content===''||OTT_state.limit_date===''||OTT_state.buy_location===''
          ||OTT_state.goal===''){setCheckModalOpen(true)}
        else if(OTT_state.goal>10){setOttCheckModalOpen(true)}
        else{openFinModal(); postDB(category);}
        return;
      case "공동구매":
        if(Delivery_state.title===''||Delivery_state.content===''||Delivery_state.limit_date===''||Delivery_state.buy_location===''
          ||Delivery_state.pickup_location===''||Delivery_state.goal===''){setCheckModalOpen(true)}
        else if(Delivery_state.goal>1000000){setDeliveryCheckModalOpen(true)}
        else{openFinModal(); postDB(category);}
        return;
      default:
        return null
    }
  }

  return (
    <div>
      <div className="writeHeaderBar">
        <button className="finButton" onClick={goBack}>취소</button>
        <button className="categoryButton" onClick={openDropdown}>{category}</button>
        <Dropdown open={dropdownOpen} close={closeDropdown}></Dropdown>
        <button className="finButton" onClick={() => {checkFin(category);}}>완료</button>
        <Modal type="Info" open={checkModalOpen} close={()=>setCheckModalOpen(false)}>내용을 모두 입력해주세요!</Modal>
        <Modal type="Info" open={ottCheckModalOpen} close={()=>setOttCheckModalOpen(false)}>목표 인원은 10명 이하로 입력해주세요!</Modal>
        <Modal type="Info" open={deliveryCheckModalOpen} close={()=>setDeliveryCheckModalOpen(false)}>목표 금액은 100만원 이하로 입력해주세요!</Modal>
        <Modal type="Info" open={finModalOpen} close={closeFinModal}>게시글 작성이 완료되었어요!</Modal>
      </div>
      <ShowInput category={category}></ShowInput>
    </div>
  );
}


export default Write;
