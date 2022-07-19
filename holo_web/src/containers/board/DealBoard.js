import './Board.css';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import {images} from '../../images';
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';
import {Cookies} from "react-cookie";
import axios from 'axios';

function ShowBoard(props) {
  var deliveryJson = props.deliveryInfo;
  var ottJson = props.ottInfo;

  const [select, setSelect] = useState("delivery");
  const [page, setPage] = useState(1);

  useEffect(()=> {
    if(sessionStorage.getItem('boardSelect')!=null){
      setSelect(sessionStorage.getItem('boardSelect'))
    }
    else if(window.location.search){
      setSelect(queryString.parse(window.location.search).select)
    }
    if(sessionStorage.getItem('boardPage')!=null){
      setPage(parseInt(sessionStorage.getItem('boardPage')))
    }
    sessionStorage.setItem('searchWord', "")
    sessionStorage.setItem('searchQuery', "")
    sessionStorage.setItem('searchResult', null)
    sessionStorage.setItem('searchExist', null)
    sessionStorage.setItem('searchPage', 1)
  },[])

  function sliceList(){
    switch(select){
      case "delivery":
        if (page === (deliveryJson.length/10))
          return deliveryJson.slice(10*(page-1), deliveryJson.length)
        else
          return deliveryJson.slice(10*(page-1), 10*page);
      case "ott":
        if (page === (ottJson.length/10))
          return ottJson.slice(10*(page-1), ottJson.length)
        else
          return ottJson.slice(10*(page-1), 10*page);
      default:
        return null
    }
  }

  const handlePageChange = (page) => {
    setPage(page);
    sessionStorage.setItem('boardPage', page)
  };

  return (
    <div>
      <div className="boardHeaderBar">
        <div></div>
        <img src={images.logo} alt="Logo"/>
        <Link className="linkSearchButton" to={select === "delivery" ? '/deliverysearch' : '/ottsearch'}>
          <button>
            <AiOutlineSearch className="moveSearchImg"/>
          </button>
        </Link>
      </div>
      <div className="boardCategoryBar">
        <button className="leftButton delivery" onClick={() => { setSelect("delivery"); sessionStorage.setItem('boardSelect', "delivery"); setPage(1); sessionStorage.setItem('boardPage', "1");}} >공동구매</button>
        <button className="rightButton ott" onClick={() => { setSelect("ott"); sessionStorage.setItem('boardSelect', "ott"); setPage(1); sessionStorage.setItem('boardPage', "1");}}>OTT 구독</button>
      </div>
      <div className={`board ${select === "delivery" ? 'left delivery' : 'right ott'}`}>
        <div className="boardTable">
          <div>
            <div><BoardTable type={`${select === "delivery" ? 'Delivery' : 'Ott'}`} list={sliceList()}></BoardTable></div>
          </div>
        </div>
        <Link  to={`/write?select=${select==="delivery"?"delivery":"ott"}`}>
          <button className="moveWriteButton">
            <AiOutlinePlus className="moveWriteImg"/>
          </button>
        </Link>
        <div className="boardPagination">
          <div>
            {select === "delivery"
              ? <Pagination page={page} count={10} totalCount={deliveryJson.length} setPage={handlePageChange}></Pagination>
              : <Pagination page={page} count={10} totalCount={ottJson.length} setPage={handlePageChange}></Pagination>
            }
          </div>
        </div>
      </div>
    </div>
  );
}


class Board extends React.Component {
  constructor () {
    super ();

    this.state = {
      ott: [],
      delivery: [],
      town_location: "거의동" //거의동, 옥계동, 양덕동 등 다양하게 테스트 가능
    };

    var cookies = new Cookies()

    if(cookies.get('town')){
      this.state.town_location = cookies.get('town')
    }
  }

  componentDidMount(){ 
    //공동구매 글 불러오기
    axios.post("http://holo.dothome.co.kr/delivery_to_json.php", JSON.stringify({town_location: this.state.town_location}),{
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      })
        .then(response => {
          console.log(response.data);
          this.setState ({
            delivery: response.data
          });  
        })
        .catch(function(error) {
          console.log(error);
        });          
  
    //OTT 글 불러오기
    axios.post("http://holo.dothome.co.kr/ott_to_json.php", JSON.stringify({town_location: this.state.town_location}),{
          withCredentials: false,
          headers: {"Content-Type": "application/json"}
        })
          .then(response => {
            console.log(response.data);
            this.setState ({
              ott: response.data
            });  
          })
          .catch(function(error) {
            console.log(error);
          }); 
    };       

  render() {
    return(
      <ShowBoard ottInfo={this.state.ott} deliveryInfo={this.state.delivery}/>
    );
  }
}
export default Board;
