import './Write.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import axios from 'axios';

axios.defaults.withCredentials = true;  //axios 전역설정

var Policy_state = {
  id : '',
  user : '',
  title : '',
  content : '',
  reg_date : ''
};
var Document_state = {
  id : '',
  user : '',
  title : '',
  content : '',
  reg_date : ''
};
var OTT_state = {
  id : '',
  user : '',
  title : '',
  content : '',
  reg_date : '',
  limit_date : '',
  buy_location : '',
  goal : ''
};
var Delivery_state = {
  id : '',
  user : '',
  title : '',
  content : '',
  reg_date : '',
  limit_date : '',
  buy_location : '',
  pickup_location : '',
  goal : ''
};

function PolicyWrite(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  Policy_state.id = props.id;
  Policy_state.user = props.user;
  Policy_state.title = title;
  Policy_state.content = content;
  Policy_state.reg_date = props.reg_date;

  function P_titleChange (e) {
    setTitle(e.target.value)
    Policy_state.title = title;
  };
  function P_contentChange (e) {
    if (e.target.value.length > 21845){
      setContent(e.target.value.slice(0,21845))
    }
    else {
      setContent(e.target.value)
    }
    Policy_state.content = content;
  };

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' value={title} spellCheck="false" onChange={P_titleChange} maxLength='50'/>
      <textarea id="content" className="infoContent" placeholder='내용을 입력하세요.' value={content} spellCheck="false" onChange={P_contentChange} maxLength='21845'/>
    </div>
  )
}

function DocumentWrite(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  Document_state.id = props.id;
  Document_state.user = props.user;
  Document_state.title = title;
  Document_state.content = content;
  Document_state.reg_date = props.reg_date;

  const D_titleChange = async (e) =>{
    setTitle(e.target.value)
    Document_state.title = title;
  };
  function D_contentChange (e) {
    if (e.target.value.length > 21845){
      setContent(e.target.value.slice(0,21845))
    }
    else {
      setContent(e.target.value)
    }
    Document_state.content = content;
  };

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' value={title} spellCheck="false" onChange={D_titleChange} maxLength='50'/>
      <textarea id="content" className="infoContent" placeholder='내용을 입력하세요.' value={content} spellCheck="false" onChange={D_contentChange} maxLength='21845'/>
    </div>
  )
}

function OTTWrite(props){
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [limit_date, setLimitDate] = useState('')
  const [buy_location, setBuyLocation] = useState('')
  const [goal, setGoal] = useState('')

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);
  useEffect(() => {
    setLimitDate(props.limit_date);
  }, [props.limit_date]);
  useEffect(() => {
    setBuyLocation(props.buy_location)
  }, [props.buy_location]);
  useEffect(() => {
    setGoal(props.goal);
  }, [props.goal]);

  OTT_state.id = props.id;
  OTT_state.user = props.user;
  OTT_state.title = title;
  OTT_state.content = content;
  OTT_state.reg_date = props.reg_date;
  OTT_state.limit_date = limit_date;
  OTT_state.buy_location = buy_location;
  OTT_state.goal = goal;

  function O_titleChange (e) {
    setTitle(e.target.value)
    OTT_state.title = title;
  };
  function O_contentChange (e) {
    if (e.target.value.length > 21845){
      setContent(e.target.value.slice(0,21845))
    }
    else {
      setContent(e.target.value)
    }
    OTT_state.content = content;
  };
  function O_goalChange (e) {
    setGoal(e.target.value)
    OTT_state.goal = goal;
  }
  function O_limitDateChange (e) {
    var temp_limit_date = e.target.value.replace('T',' ')+':00';
    setLimitDate(temp_limit_date)
    OTT_state.limit_date = limit_date;
  }
  function O_buyLocationChange (e) {
    setBuyLocation(e.target.value)
    OTT_state.buy_location = buy_location;
  }

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' value={title} spellCheck="false" onChange={O_titleChange} maxLength='50'/>
      <input type="datetime-local" id="limitDate" data-placeholder="구매 일시" value={limit_date.replace(" ","T").slice(0,16)} required aria-required="true" onChange={O_limitDateChange}/>
      <input type='text' id="buyLocation" className="contentInput" placeholder='OTT 플랫폼' value={buy_location} spellCheck="false" onChange={O_buyLocationChange} maxLength='50'/>
      <input type='number' id="goal" className="contentInput" min="0" placeholder='목표 인원' value={goal} onInput={(e)=>{e.target.value=e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')}} onChange={O_goalChange}/>
      <textarea id="content" className="ottContent" placeholder='내용을 입력하세요.' value={content} spellCheck="false" onChange={O_contentChange} maxLength='21845'/>
    </div>
  )
}

function DeliveryWrite(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [limit_date, setLimitDate] = useState('')
  const [buy_location, setBuyLocation] = useState('')
  const [pickup_location, setPickupLocation] = useState('')
  const [goal, setGoal] = useState('')

  Delivery_state.id = props.id;

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);
  useEffect(() => {
    setLimitDate(props.limit_date);
  }, [props.limit_date]);
  useEffect(() => {
    setBuyLocation(props.buy_location)
  }, [props.buy_location]);
  useEffect(() => {
    setPickupLocation(props.pickup_location)
  }, [props.pickup_location]);
  useEffect(() => {
    setGoal(props.goal);
  }, [props.goal]);

  Delivery_state.user = props.user;
  Delivery_state.title = title;
  Delivery_state.content = content;
  Delivery_state.reg_date = props.reg_date;
  Delivery_state.limit_date = limit_date;
  Delivery_state.buy_location = buy_location;
  Delivery_state.pickup_location = pickup_location;
  Delivery_state.goal = goal;

  function G_titleChange (e) {
    setTitle(e.target.value)
    Delivery_state.title = title;
  };
  function G_contentChange (e) {
    if (e.target.value.length > 21845){
      setContent(e.target.value.slice(0,21845))
    }
    else {
      setContent(e.target.value)
    }
    Delivery_state.content = content;
  };
  function G_goalChange (e) {
    setGoal(e.target.value)
    Delivery_state.goal = goal;
  }
  function G_buyLocationChange (e) {
    setBuyLocation(e.target.value)
    Delivery_state.buy_location = buy_location;
  }
  function G_limitDateChange (e) {
    var temp_limit_date = e.target.value.replace('T',' ')+':00';
    setLimitDate(temp_limit_date)
    Delivery_state.limit_date = limit_date;
  }
  function G_pickupChange (e) {
    setPickupLocation(e.target.value)
    Delivery_state.pickup_location = pickup_location;
  }

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' value={title} spellCheck="false" onChange={G_titleChange} maxLength='50'/>
      <input type="datetime-local" id="limitDate" data-placeholder="구매 일시" value={limit_date.replace(" ","T").slice(0,16)} required aria-required="true" onChange={G_limitDateChange}/>
      <input type='text' id="buyLocation" placeholder='구매처' value={buy_location} spellCheck="false" onChange={G_buyLocationChange} maxLength='50'/>
      <input type='number' id="goal" min="0" placeholder='목표 금액' value={goal} onInput={(e)=>{e.target.value=e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')}} onChange={G_goalChange}/>
      <input type='text' id="pickupLocation" placeholder='픽업 위치' value={pickup_location} spellCheck="false" onChange={G_pickupChange} maxLength='50'/>
      <textarea id="content" className="deliveryContent" placeholder='내용을 입력하세요.' value={content} spellCheck="false" onChange={G_contentChange} maxLength='21845'/>
    </div>
  )
}

function ShowInput(props) {
  switch(props.category){
    case "policy":
      return <PolicyWrite category={props.category} id={props.id} user={props.user} title={props.title} 
                          content={props.content} reg_date={props.reg_date}/>;
    case "document":   
      return <DocumentWrite category={props.category} id={props.id} user={props.user} title={props.title} 
                            content={props.content} reg_date={props.reg_date}/>;
    case "ott":
      return <OTTWrite category={props.category} id={props.id} user={props.user} title={props.title} 
                        content={props.content} reg_date={props.reg_date} limit_date={props.limit_date}
                        buy_location={props.buy_location} goal={props.goal}/>;
    case "delivery":
      return <DeliveryWrite category={props.category} id={props.id} user={props.user} title={props.title} 
                            content={props.content} reg_date={props.reg_date} limit_date={props.limit_date}
                            buy_location={props.buy_location} pickup_location={props.pickup_location} goal={props.goal}/>;
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
    case "policy":
      Policy_state.reg_date = date;       
      PolicySubmit(Policy_state);
      return;
    case "document": 
      Document_state.reg_date = date;
      DocSubmit(Document_state);
      return;
    case "ott":
      OTT_state.reg_date = date;
      OTTSubmit(OTT_state);
      return;
    case "delivery":
      Delivery_state.reg_date = date;
      DeliverySubmit(Delivery_state);
      return;
    default:
      return null
  }
}

function PolicySubmit(data){
  console.log(JSON.stringify(data));
  axios.post("http://holo.dothome.co.kr/updatePolicy.php", JSON.stringify(data),{
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
  console.log(JSON.stringify(Document_state));
    axios.post("http://holo.dothome.co.kr/updateDoc.php", JSON.stringify(data),{
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
  console.log(JSON.stringify(OTT_state));
  axios.post("http://holo.dothome.co.kr/updateOtt.php", JSON.stringify(data),{
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
  console.log(JSON.stringify(Delivery_state));
  axios.post("http://holo.dothome.co.kr/updateDelivery.php", JSON.stringify(data),{
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

function ShowEdit(props) {
  const navigate = useNavigate();
  const [checkModal, setCheckModal] = useState(false);
  const [finModal, setFinModal] = useState(false);

  var category = "";
  if(props.category==="policy"){category="정책"}
  else if(props.category==="document"){category="생활백서"}
  else if(props.category==="delivery"){category="공동구매"}
  else if(props.category==="ott"){category="OTT구독"}

  const goBack = () => {
    navigate(-1)
  };
  const openFinModal = () => {
    setFinModal(true);
  };
  const closeFinModal = () => {
    setFinModal(false);
    goBack();
  };
  const checkFin = (category) => {
    switch(category){
      case "policy":
        if(Policy_state.title===''||Policy_state.content===''){setCheckModal(true)}
        else{openFinModal(); postDB(category);}
        return;
      case "document": 
        if(Document_state.title===''||Document_state.content===''){setCheckModal(true)}
        else{openFinModal(); postDB(category);}
      return;
      case "ott":
        if(OTT_state.title===''||OTT_state.content===''||OTT_state.limit_date===''||OTT_state.buy_location===''
          ||OTT_state.goal===''){setCheckModal(true)}
        else{openFinModal(); postDB(category);}
        return;
      case "delivery":
        if(Delivery_state.title===''||Delivery_state.content===''||Delivery_state.limit_date===''||Delivery_state.buy_location===''
          ||Delivery_state.pickup_location===''||Delivery_state.goal===''){setCheckModal(true)}
        else{openFinModal(); postDB(category);}
        return;
      default:
        return null
    }
  }

  return (
    <div>
      <div className="writeHeaderBar">
        <button className="finButton" onClick={() => {goBack();}}>취소</button>
        <button className="categoryButton" disabled>{category}</button>
        <button className="finButton" onClick={() => {checkFin(props.category);}}>완료</button>
        <Modal type="Info" open={checkModal} close={()=>setCheckModal(false)}>내용을 모두 입력해주세요!</Modal>
        <Modal type="Info" open={finModal} close={closeFinModal}>게시글 수정이 완료되었어요!</Modal>
      </div>
      <ShowInput category={props.category} id = {props.id} user={props.user} title={props.title} 
                content={props.content} reg_date={props.reg_date} limit_date={props.limit_date}
                buy_location={props.buy_location} pickup_location={props.pickup_location} goal={props.goal}/>
    </div>
  );
}

class Edit extends React.Component {
  constructor () {
    super ();
  
    var pathname = window.location.pathname;
    var words = pathname.split('/');

    this.state = {
      category: words[2],
      id : words[3],
      user : "",
      title : "",
      content : "",
      reg_date : "",
      limit_date : "",
      buy_location : "",
      pickup_location : "",
      goal: ""
    };
  
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount(){
    console.log(this.state.id);

    if(this.state.category==="policy"){
      axios.post("http://holo.dothome.co.kr/findPolicyPost.php", JSON.stringify({postid: this.state.id}),{
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      })
        .then(response => {
          console.log(response.data[0]);
          this.setState ({
            user: response.data[0].nick_name,
            title: response.data[0].title,
            content: response.data[0].content,
            reg_date : response.data[0].reg_date
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    else if(this.state.category==="document"){
      axios.post("http://holo.dothome.co.kr/findDocPost.php", JSON.stringify({postid: this.state.id}),{
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      })
        .then(response => {
          console.log(response.data[0]);
          this.setState ({
            user: response.data[0].nick_name,
            title: response.data[0].title,
            content: response.data[0].content,
            reg_date : response.data[0].reg_date
          });  
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    else if(this.state.category==="delivery"){
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
            goal : response.data[0].goal
          });  
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    else if(this.state.category==="ott"){
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
            goal : response.data[0].goal
           });  
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };                         
  
  render() {
    return(
      <ShowEdit category={this.state.category} id = {this.state.id} user={this.state.user} title={this.state.title} 
                content={this.state.content} reg_date={this.state.reg_date} limit_date={this.state.limit_date}
                buy_location={this.state.buy_location} pickup_location={this.state.pickup_location} goal={this.state.goal}/>
    );
  }
}
  
export default Edit;
