import './Board.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../../images';
import { AiOutlineLeft, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';

var deliveryJson=[{id: 0, title: "마라탕 먹으실 분", nick_name: "마라탕탕", reg_date: "2022-05-09 12:35", limit_date: "2022-05-09 19:00", buy_location: "라화쿵푸 옥계점", pickup_location: "금오공대 푸름관 3동 앞", goal: 20000, accumulate: 12000, view: 123}];
var ottJson=[{id: 0, title: "같이 넷플릭스 봅시당", nick_name: "김태리짱", reg_date: "2022-05-09 12:35", limit_date: "2022-05-09", buy_location: "넷플릭스", goal: 4, accumulate: 3, view: 123}];

function getDeliveryJson() {

}
function getOTTJson() {

}

function ShowBoard() {
  const [select, setSelect] = useState("delivery");
  const [page, setPage] = useState(1);

  function sliceList(){
    switch(select){
      case "delivery":
        if (page === (deliveryJson.length/7))
          return deliveryJson.slice(7*(page-1), deliveryJson.length)
        else
          return deliveryJson.slice(7*(page-1), 7*page);
      case "ott":
        if (page === (ottJson.length/7))
          return ottJson.slice(7*(page-1), ottJson.length)
        else
          return ottJson.slice(7*(page-1), 7*page);
      default:
        return null
    }
  }
  const handlePageChange = (page) => {
    setPage(page); 
    console.log("page: ",page);
  };

  getDeliveryJson();
  getOTTJson();
  
  return (
    <div>
      <div className="boardHeaderBar">
        <Link className="linkBackButton" to='/'>
          <button>
            <AiOutlineLeft className="moveBackImg"/>
          </button>
        </Link>
        <img src={images.logo} alt="Logo"/>
        <Link className="linkSearchButton" to={select === "delivery" ? '/deliverysearch' : '/ottsearch'}>
          <button>
            <AiOutlineSearch className="moveSearchImg"/>
          </button>
        </Link>
      </div>
      <div className="boardCategoryBar">
        <button className="leftButton" onClick={() => { setSelect("delivery"); setPage(1);/*getDeliveryJson();*/}} >공동구매</button>
        <button className="rightButton" onClick={() => { setSelect("ott"); setPage(1); /*getOttJson();*/}}>OTT 구독</button>
      </div>
      <div className={`board ${select === "delivery" ? 'left' : 'right'}`}>
        <div className="boardTable">
          <div><BoardTable type={`${select === "delivery" ? 'Delivery' : 'Ott'}`} list={sliceList()}></BoardTable></div>
        </div>
        <Link to='/write'>
          <button className="moveWriteButton">
            <AiOutlinePlus className="moveWriteImg"/>
          </button>
        </Link>
        <div className="boardPagination">
          <div>
            {select === "delivery"
              ? <Pagination page={page} count={7} totalCount={deliveryJson.length} setPage={handlePageChange}></Pagination>
              : <Pagination page={page} count={7} totalCount={ottJson.length} setPage={handlePageChange}></Pagination>
            }
          </div>
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
