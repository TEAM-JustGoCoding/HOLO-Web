import './Board.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../images';
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import BoardTable from '../components/BoardTable';
import Pagination from '../components/Pagination';

var poliJson=[];
var infoJson=[];

function getPolicyJson() {
	return fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/policyBoardJson.json')
  .then(response => { return response.json();})
	.then(response => { 
                      poliJson = [];
                      var obj = response;
                      //console.log(obj.length);
  
                      for(var i=0; i < obj.length; i++) {
                        poliJson.push(obj[i]);
                      }           
                      console.log(poliJson);
                    });
}

function getInfoJson() {
	return fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/infoBoardJson.json')
	.then(response => { return response.json();})
	.then(response => { 
                      infoJson = [];
                      var obj = response;
                      for(var i=0; i < obj.length; i++) {
                        infoJson.push(obj[i]);
                      }     
                      console.log(infoJson);
                    });
}

const policyList = [
  {
    id: 1,
    title: "🔥 1인 가구 맞춤형 주거상담소",
    date: "2022-03-17",
    writer: "정리 최고",
    view: "256",
    like: "50"
  },
  {
    id: 2,
    title: "🔥 1인 가구를 위한 이벤트",
    date: "2022-04-06",
    writer: "라이언",
    view: "100",
    like: "12"
  },
  {
    id: 3,
    title: "🔥 스마트 플러그 지원 사업",
    date: "2022-09-04",
    writer: "도라미",
    view: "200",
    like: "150"
  },
  {
    id: 4,
    title: "대학생 임대주택 공급 및 지원",
    date: "2022-06-17",
    writer: "도라미",
    view: "20",
    like: "2"
  },
  {
    id: 5,
    title: "보람일자리사업 1인가구 상담헬퍼 모집",
    date: "2021-11-21",
    writer: "정책공유봇",
    view: "78",
    like: "6"
  },
  {
    id: 6,
    title: "1인 가구 정책 모음",
    date: "2022-01-16",
    writer: "정책공유봇",
    view: "216",
    like: "112"
  },
  {
    id: 7,
    title: "1인 가구 정리 수납 컨설팅",
    date: "2022-09-04",
    writer: "우네",
    view: "18",
    like: "3"
  }
]
const infoList = [
  {
    id: 1,
    title: "🔥 쌀에 벌레 방지하기",
    date: "2022-03-15",
    writer: "귤귤이",
    view: "240",
    like: "96"
  },
  {
    id: 2,
    title: "🔥 양파 보관하는 꿀팁!",
    date: "2022-01-23",
    writer: "우네",
    view: "248",
    like: "135"
  },
  {
    id: 3,
    title: "🔥 돼지고기 잡냄새 없애는 방법 공유해요",
    date: "2022-04-11",
    writer: "옌",
    view: "13",
    like: "1"
  },
  {
    id: 4,
    title: "탄 냄비 세척하는 방법이에용",
    date: "2022-02-12",
    writer: "옌",
    view: "20",
    like: "2"
  },
  {
    id: 5,
    title: "청소할때 유용한 꿀템 TOP 15",
    date: "2021-12-25",
    writer: "우네",
    view: "136",
    like: "42"
  },
  {
    id: 6,
    title: "예쁜 꽃 시들지 않게 하는 법!",
    date: "2022-02-02",
    writer: "먼지선생",
    view: "32",
    like: "21"
  },
  {
    id: 7,
    title: "분리수거는 이렇게 합시다!",
    date: "2022-01-03",
    writer: "먼지선생",
    view: "18",
    like: "3"
  }
]

function search(){
  console.log("검색")
}

function ShowBoard() {
  const [select, setSelect] = useState("left");
  
  getPolicyJson();
  getInfoJson();
  
  return (
    <div>
      <div className="boardHeaderBar">
        <div></div>
        <img src={images.logo} alt="Logo"/>
        <Link className="linkSearchButton" to={select === "left" ? '/policysearch' : '/documentsearch'}>
          <button onClick={search}>
            <AiOutlineSearch className="moveSearchImg"/>
          </button>
        </Link>
      </div>
      <div className="boardButtonBar">
        <button className="leftButton" onClick={() => { setSelect("left"); /*getPolicyJson();*/}} >정책</button>
        <button className="rightButton" onClick={() => { setSelect("right"); /*getInfoJson();*/}}>생활백서</button>
      </div>
      <div className={`board ${select === "left" ? 'left' : 'right'}`}>
        <div className="boardTable">
          <div><BoardTable list={select === "left" ? policyList : infoList}></BoardTable></div>
        </div>
        <Link to='/write'>
          <button className="moveWriteButton">
            <AiOutlinePlus className="moveWriteImg"/>
          </button>
        </Link>
        <div className="boardPagination">
          <div><Pagination></Pagination></div>
        </div>
      </div>
    </div>
  );
}


class Board extends React.Component {
  inifunc() {
    
  }

  render() {
    return(
      <ShowBoard/>
    );
  }
}
export default Board;
