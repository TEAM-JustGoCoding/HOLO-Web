import './Board.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../../images';
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';


function ShowBoard(props) {
  //const a = await getPolicyJson();
  //const b = await getDocumentJson();
  var policyJson = props.poliInfo;
  var documentJson = props.docInfo;

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
  constructor () {
    super ();

    this.state = {
      policy: [],
      document: []
    };
  }

  componentDidMount(){
    fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/policy_to_json.php')
    .then(response => { return response.json();})
    .then(response => { 
                        var policyJson = [];
                        var obj = response;
                        //console.log(obj.length);
    
                        for(var i=0; i < obj.length; i++) {
                          policyJson.push(obj[i]);
                        }           
                       console.log(policyJson);

                       this.setState ({policy: policyJson});
                      });

    fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/doc_to_json.php')
     .then(response => { return response.json();})
    .then(response => { 
        var documentJson = [];
         var obj = response;
         //console.log(obj.length);
                      
         for(var i=0; i < obj.length; i++) {
            documentJson.push(obj[i]);
          }           
          console.log(documentJson);
                  
         this.setState ({document: documentJson});
     });                               
  };

  render() {
    return(
      <ShowBoard poliInfo={this.state.policy} docInfo={this.state.document}/>
    );
  }
}

export default Board;
