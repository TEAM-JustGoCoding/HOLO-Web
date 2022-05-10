import './Board.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../../images';
import { AiOutlineLeft, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';

var policyJson=[];
var documentJson=[];

function getPolicyJson() {
	return fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/policyJson.json')
  .then(response => { return response.json();})
	.then(response => { 
                      policyJson = [];
                      var obj = response;
                      //console.log(obj.length);
  
                      for(var i=0; i < obj.length; i++) {
                        policyJson.push(obj[i]);
                      }           
                      console.log(policyJson);
                    });
  
 /*
  axios.get("http://holo.dothome.co.kr/policyJson.json",{
    withCredentials: false
  })
      .then(function(body) {
        console.log(typeof(body));
      })
      .catch(function(error) {
        console.log(error);
      });
*/
}

function getDocumentJson() {
	return fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/docJson.json')
	.then(response => { return response.json();})
	.then(response => { 
                      documentJson = [];
                      var obj = response;
                      for(var i=0; i < obj.length; i++) {
                        documentJson.push(obj[i]);
                      }     
                      console.log(documentJson);
                    });
}

function ShowBoard() {
  const [select, setSelect] = useState("policy");
  const [page, setPage] = useState(1);

  function sliceList(){
    switch(select){
      case "policy":
        if (page === (policyJson.length/7))
          return policyJson.slice(7*(page-1), policyJson.length)
        else
          return policyJson.slice(7*(page-1), 7*page);
      case "document":
        if (page === (documentJson.length/7))
          return documentJson.slice(7*(page-1), documentJson.length)
        else
          return documentJson.slice(7*(page-1), 7*page);
      default:
        return null
    }
  }
  const handlePageChange = (page) => {
    setPage(page); 
    console.log("page: ",page);
  };

  getPolicyJson();
  getDocumentJson();
  
  return (
    <div>
      <div className="boardHeaderBar">
        <div></div>
        <img src={images.logo} alt="Logo"/>
        <Link className="linkSearchButton" to={select === "policy" ? '/policysearch' : '/documentsearch'}>
          <button>
            <AiOutlineSearch className="moveSearchImg"/>
          </button>
        </Link>
      </div>
      <div className="boardCategoryBar">
        <button className="leftButton" onClick={() => { setSelect("policy"); setPage(1);/*getPolicyJson();*/}} >정책</button>
        <button className="rightButton" onClick={() => { setSelect("document"); setPage(1); /*getDocumentJson();*/}}>생활백서</button>
      </div>
      <div className={`board ${select === "policy" ? 'left' : 'right'}`}>
        <div className="boardTable">
          <div><BoardTable type={`${select === "policy" ? 'Policy' : 'Document'}`} list={sliceList()}></BoardTable></div>
        </div>
        <Link to='/write'>
          <button className="moveWriteButton">
            <AiOutlinePlus className="moveWriteImg"/>
          </button>
        </Link>
        <div className="boardPagination">
          <div>
            {select === "policy"
              ? <Pagination page={page} count={7} totalCount={policyJson.length} setPage={handlePageChange}></Pagination>
              : <Pagination page={page} count={7} totalCount={documentJson.length} setPage={handlePageChange}></Pagination>
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
