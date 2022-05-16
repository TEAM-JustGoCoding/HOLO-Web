import './Write.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import axios from 'axios';

axios.defaults.withCredentials = true;  //axios 전역설정

var Policy_state = {
  user : '',
  title : '',
  content : '',
  date : '',
  view : '',
  like : ''
};
var Document_state = {
  user : '',
  title : '',
  content : '',
  date : '',
  view : '',
  like : ''
};
var OTT_state = {
  user : '',
  title : '',
  content : '',
  date : '',
  limit_date : '',
  buy_location : '',
  accumulate : '',
  view : ''
};
var Delivery_state = {
  user : '',
  title : '',
  content : '',
  date : '',
  limit_date : '',
  buy_location : '',
  pickup_location : '',
  accumulate : '',
  view : ''
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

  Policy_state.user = props.user;
  Policy_state.title = props.title;
  Policy_state.content = props.content;
  Policy_state.date = props.reg_date;
  Policy_state.view = props.view;
  Policy_state.like = props.like;

  const P_titleChange = async (e) =>{
    setTitle(e.target.value)
    Policy_state.title = e.target.value;
  };
  function P_contentChange (e) {
    setContent(e.target.value)
    Policy_state.content = e.target.value;
  };

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' value={title} spellCheck="false" onChange={P_titleChange}/>
      <textarea id="content" className="infoContent" placeholder='내용을 입력하세요.' value={content} spellCheck="false" onChange={P_contentChange}/>
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

  Document_state.user = props.user;
  Document_state.title = props.title;
  Document_state.content = props.content;
  Document_state.date = props.reg_date;
  Document_state.view = props.view;
  Document_state.like = props.like;

  const D_titleChange = async (e) =>{
    setTitle(e.target.value)
    Document_state.title = e.target.value;
  };
  function D_contentChange (e) {
    setContent(e.target.value)
    Document_state.content = e.target.value;
  };

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' value={title} spellCheck="false" onChange={D_titleChange}/>
      <textarea id="content" className="infoContent" placeholder='내용을 입력하세요.' value={content} spellCheck="false" onChange={D_contentChange}/>
    </div>
  )
}

function OTTWrite(props){
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [limit_date, setLimitDate] = useState('')
  const [buy_location, setBuyLocation] = useState('')
  const [accumulate, setAccumulate] = useState('')

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
    setAccumulate(props.accumulate);
  }, [props.accumulate]);

  OTT_state.user = props.user;
  OTT_state.title = props.title;
  OTT_state.content = props.content;
  OTT_state.date = props.reg_date;
  OTT_state.limit_date = props.limit_date;
  OTT_state.buy_location = props.buy_location;
  OTT_state.accumulate = props.accumulate;
  OTT_state.view = props.view;

  function O_titleChange (e) {
    setTitle(e.target.value)
    OTT_state.title = e.target.value;
  };
  function O_contentChange (e) {
    setContent(e.target.value)
    OTT_state.content = e.target.value;
  };
  function O_accumulateChange (e) {
    setAccumulate(e.target.value)
    OTT_state.accumulate = e.target.value;
  }
  function O_buyDateChange (e) {
    setLimitDate(e.target.value)
    OTT_state.limit_date = e.target.value;
  }
  function O_buyLocationChange (e) {
    setBuyLocation(e.target.value)
    OTT_state.buy_location = e.target.value;
  }

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' value={title} spellCheck="false" onChange={O_titleChange}/>
      <input type='text' id="date" placeholder='구매 일시' value={limit_date} spellCheck="false" onChange={O_buyDateChange}/>
      <input type='text' id="buyLocation" className="contentInput" placeholder='OTT 플랫폼' value={buy_location} spellCheck="false" onChange={O_buyLocationChange}/>
      <input type='text' id="accumulate" className="contentInput" placeholder='목표 인원' value={accumulate} spellCheck="false" onChange={O_accumulateChange}/>
      <textarea id="content" className="ottContent" placeholder='내용을 입력하세요.' value={content} spellCheck="false" onChange={O_contentChange}/>
    </div>
  )
}

function DeliveryWrite(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [limit_date, setLimitDate] = useState('')
  const [buy_location, setBuyLocation] = useState('')
  const [pickup_location, setPickupLocation] = useState('')
  const [accumulate, setAccumulate] = useState('')

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
    setAccumulate(props.accumulate);
  }, [props.accumulate]);

  Delivery_state.user = props.user;
  Delivery_state.title = props.title;
  Delivery_state.content = props.content;
  Delivery_state.date = props.reg_date;
  Delivery_state.limit_date = props.limit_date;
  Delivery_state.buy_location = props.buy_location;
  Delivery_state.pickup_location = props.pickup_location;
  Delivery_state.accumulate = props.accumulate;
  Delivery_state.view = props.view;

  function G_titleChange (e) {
    setTitle(e.target.value)
    Delivery_state.title = e.target.value;
  };
  function G_contentChange (e) {
    setContent(e.target.value)
    Delivery_state.content = e.target.value;
  };
  function G_accumulateChange (e) {
    setAccumulate(e.target.value)
    Delivery_state.accumulate = e.target.value;
  }
  function G_buyLocationChange (e) {
    setBuyLocation(e.target.value)
    Delivery_state.buy_location = e.target.value;
  }
  function G_buyDateChange (e) {
    setLimitDate(e.target.value)
    Delivery_state.limit_date = e.target.value;
  }
  function G_pickupChange (e) {
    setPickupLocation(e.target.value)
    Delivery_state.pickupLocation = e.target.value;
  }

  return(
    <div className="writeInput">
      <input type='text' id="title" placeholder='제목' value={title} spellCheck="false" onChange={G_titleChange}/>
      <input type='text' id="date" placeholder='구매 일시' value={limit_date} spellCheck="false" onChange={G_buyDateChange}/>
      <input type='text' id="buyLocation" placeholder='구매처' value={buy_location} spellCheck="false" onChange={G_buyLocationChange}/>
      <input type='text' id="accumulate" placeholder='목표 금액' value={accumulate} spellCheck="false" onChange={G_accumulateChange}/>
      <input type='text' id="pickupLocation" placeholder='픽업 위치' value={pickup_location} spellCheck="false" onChange={G_pickupChange}/>
      <textarea id="content" className="deliveryContent" placeholder='내용을 입력하세요.' value={content} spellCheck="false" onChange={G_contentChange}/>
    </div>
  )
}

function ShowInput(props) {
  switch(props.category){
    case "policy":
      return <PolicyWrite category={props.category} id={props.id} user={props.user} title={props.title} 
                          content={props.content} reg_date={props.reg_date} view={props.view} like={props.like}/>;
    case "document":   
      return <DocumentWrite category={props.category} id={props.id} user={props.user} title={props.title} 
                            content={props.content} reg_date={props.reg_date} view={props.view} like={props.like}/>;
    case "ott":
      return <OTTWrite category={props.category} id={props.id} user={props.user} title={props.title} 
                        content={props.content} reg_date={props.reg_date} limit_date={props.limit_date}
                        buy_location={props.buy_location} accumulate={props.accumulate} view={props.view}/>;
    case "delivery":
      return <DeliveryWrite category={props.category} id={props.id} user={props.user} title={props.title} 
                            content={props.content} reg_date={props.reg_date} limit_date={props.limit_date}
                            buy_location={props.buy_location} pickup_location={props.pickup_location} accumulate={props.accumulate} view={props.view}/>;
    default:
      return null
  }
}

function ShowEdit(props) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  var category = "";
  if(props.category==="policy"){category="정책"}
  else if(props.category==="document"){category="생활백서"}
  else if(props.category==="delivery"){category="공동구매"}
  else if(props.category==="ott"){category="OTT구독"}

  const goBack = () => {
    navigate(-1)
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    goBack();
  };

  return (
    <div>
      <div className="writeHeaderBar">
        <button className="finButton" onClick={() => {goBack(); console.log(Policy_state)}}>취소</button>
        <button className="categoryButton">{category}</button>
        <button className="finButton" onClick={() => {openModal();}}>완료</button>
        <Modal type="Info" open={modalOpen} close={closeModal}>
          게시글 수정이 완료되었어요!
        </Modal>
      </div>
      <ShowInput category={props.category} id={props.id} user={props.user} title={props.title} 
                content={props.content} reg_date={props.reg_date} limit_date={props.limit_date}
                buy_location={props.buy_location} pickup_location={props.pickup_location} accumulate={props.accumulate}
                view={props.view} like={props.like}></ShowInput>
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
      accumulate : "",
      view : "",
      like : ""
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
            reg_date : response.data[0].reg_date,
            view : response.data[0].view,
            like : response.data[0].like });
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
            reg_date : response.data[0].reg_date,
            view : response.data[0].view,
            like : response.data[0].like });  
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
            view : response.data[0].view,
            accumulate : response.data[0].accumulate });  
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
            view : response.data[0].view,
            accumulate : response.data[0].accumulate });  
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
                buy_location={this.state.buy_location} pickup_location={this.state.pickup_location} accumulate={this.state.accumulate}
                view={this.state.view} like={this.state.like}/>
    );
  }
}
  
export default Edit;
