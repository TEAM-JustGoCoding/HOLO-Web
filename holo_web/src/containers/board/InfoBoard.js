import './Board.css';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../../images';
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';

function ShowBoard(props) {
  var poliInfo = props.poliInfo;
  var docInfo = props.docInfo;
  var hotPoliInfo = props.hotPoliInfo;
  var hotDocInfo = props.hotDocInfo;

  const [select, setSelect] = useState("policy");
  const [page, setPage] = useState(1);
  const [policyJson, setPolicyJson] = useState([]);
  const [documentJson, setDocumentJson] = useState([]);

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
          <div>
            <div>
              <BoardTable type={`${select === "policy" ? 'Policy' : 'Document'}`} list={sliceList()}></BoardTable>
            </div>
          </div>
        </div>
        <Link to='/write'>
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
    fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/policy_to_json.php')
    .then(response => { return response.json();})
    .then(response => { 
          var policyJson = [];
          var obj = response;

          for(var i=0; i < obj.length; i++) {
            policyJson.push(obj[i]);
            policyJson[i]['hot']=false
          }           
          console.log(policyJson);

          this.setState ({policy: policyJson});
          this.setState ({hotPolicy: [{id: "12345", title: "정책 핫 게시물 제목 클릭 금지", content: "정책 핫 게시물 내용",  nick_name: "우네",
                          reg_date: "2022-05-01 12:00:00", like: "10000", view: "50000", hot: true}]}) //핫게시물 구현 후 삭제
        });

    fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/doc_to_json.php')
    .then(response => { return response.json();})
    .then(response => { 
         var documentJson = [];
         var obj = response;
                      
         for(var i=0; i < obj.length; i++) {
            documentJson.push(obj[i]);
            documentJson[i]['hot']=false
          }           
          console.log(documentJson);
                  
         this.setState ({document: documentJson});
         this.setState ({hotDocument: [{id: "12345", title: "생활 핫 게시물 제목 클릭 금지", content: "생활 핫 게시물 내용",  nick_name: "우네",
                         reg_date: "2022-05-01 12:00:00", like: "1000", view: "5000", hot: true}]}) //핫게시물 구현 후 삭제
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
