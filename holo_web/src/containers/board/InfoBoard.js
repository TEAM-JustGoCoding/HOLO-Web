import './Board.css';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import {images} from '../../images';
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';
import axios from 'axios';

function ShowBoard(props) {
  var poliInfo = props.poliInfo;
  var docInfo = props.docInfo;
  var hotPoliInfo = props.hotPoliInfo;
  var hotDocInfo = props.hotDocInfo;

  const [select, setSelect] = useState("policy")
  const [page, setPage] = useState(1);
  const [policyJson, setPolicyJson] = useState([]);
  const [documentJson, setDocumentJson] = useState([]);

  useEffect(()=> {
    if(window.location.search){
        setSelect(queryString.parse(window.location.search).select)
      }
  },[])

  useEffect(()=> {
    setPolicyJson([...hotPoliInfo,...poliInfo])
    setDocumentJson([...hotDocInfo,...docInfo])
  },[poliInfo, docInfo, hotPoliInfo, hotDocInfo])

  function sliceList(){
    switch(select){
      case "policy":
        if (page === (policyJson.length/10 ))
          return policyJson.slice(10*(page-1), policyJson.length)
        else
          return policyJson.slice(10*(page-1), 10*page);
      case "document":
        if (page === (documentJson.length/10))
          return documentJson.slice(10*(page-1), documentJson.length)
        else
          return documentJson.slice(10*(page-1), 10*page);
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
        <Link className="linkSearchButton" to={select==="policy"?'/policysearch':'/documentsearch'}>
          <button>
            <AiOutlineSearch className="moveSearchImg"/>
          </button>
        </Link>
      </div>
      <div className="boardCategoryBar">
        <button className="leftButton policy" onClick={() => { setSelect("policy"); setPage(1);/*getPolicyJson();*/}} >정책</button>
        <button className="rightButton document" onClick={() => { setSelect("document"); setPage(1); /*getDocumentJson();*/}}>생활백서</button>
      </div>
      <div className={`board ${select === "policy" ? 'left policy' : 'right document'}`}>
        <div className="boardTable">
          <div>
            <div>
              <BoardTable type={`${select === "policy" ? 'Policy' : 'Document'}`} list={sliceList()}></BoardTable>
            </div>
          </div>
        </div>
        <Link to={`/write?select=${select==="policy"?"policy":"document"}`}>
          <button className="moveWriteButton">
            <AiOutlinePlus className="moveWriteImg"/>
          </button>
        </Link>
        <div className="boardPagination">
          <div>
            {select === "policy"
              ? <Pagination page={page} count={10} totalCount={policyJson.length} setPage={handlePageChange}></Pagination>
              : <Pagination page={page} count={10} totalCount={documentJson.length} setPage={handlePageChange}></Pagination>
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
      policy: [],
      document: [],
      hotPolicy: [],
      hotDocument: []
    };
  }

  componentDidMount(){
    //공동구매 글 불러오기
    axios.post("http://holo.dothome.co.kr/policy_to_json.php", JSON.stringify({temp: "policy"}),{
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      })
        .then(response => {
          console.log(response.data);
          this.setState ({
            policy: response.data
          });  
        })
        .catch(function(error) {
          console.log(error);
        });          
  
    //document 글 불러오기
    axios.post("http://holo.dothome.co.kr/doc_to_json.php", JSON.stringify({temp: "doc"}),{
          withCredentials: false,
          headers: {"Content-Type": "application/json"}
        })
          .then(response => {
            console.log(response.data);
            this.setState ({
              document: response.data
            });  
          })
          .catch(function(error) {
            console.log(error);
          });                    
  };

  render() {
    return(
      <ShowBoard poliInfo={this.state.policy} docInfo={this.state.document}
                 hotPoliInfo={this.state.hotPolicy} hotDocInfo={this.state.hotDocument}/>
    );
  }
}

export default Board;
