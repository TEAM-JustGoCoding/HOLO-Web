import './Board.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../../images';
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';

function ShowBoard(props) {
  var deliveryJson = props.deliveryInfo;
  var ottJson = props.ottInfo;

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
  constructor () {
    super ();

    this.state = {
      ott: [],
      delivery: []
    };
  }

  componentDidMount(){
    fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/ott_to_json.php')
    .then(response => { return response.json();})
    .then(response => { 
                        var ottJson = [];
                        var obj = response;
                        //console.log(obj.length);
    
                        for(var i=0; i < obj.length; i++) {
                          ottJson.push(obj[i]);
                        }           
                       console.log(ottJson);

                       this.setState ({ott: ottJson});
                      });   
  
   fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/delivery_to_json.php')
    .then(response => { return response.json();})
    .then(response => { 
                        var deliJson = [];
                        var obj = response;
                        //console.log(obj.length);
    
                        for(var i=0; i < obj.length; i++) {
                          deliJson.push(obj[i]);
                        }           
                       console.log(deliJson);

                       this.setState ({delivery: deliJson});
                      });                           
  };                         

  render() {
    return(
      <ShowBoard ottInfo={this.state.ott} deliveryInfo={this.state.delivery}/>
    );
  }
}
export default Board;
