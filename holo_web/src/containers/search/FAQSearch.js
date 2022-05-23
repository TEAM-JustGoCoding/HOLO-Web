import './Search.css';
import React, {useState} from 'react';
import { images } from '../../images';
import { AiOutlineSearch } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import axios from 'axios';

var result = [];  //결과를 저장할 전역변수

function ExistResults(props) {
  const [page, setPage] = useState(1);
  //const [result, setResults] = useState(null);

  //setResults(props.resultList);
  result = props.resultList;

  function sliceList(){
    if (page === (result.length/8))
      return result.slice(8*(page-1), result.length)
    else
      return result.slice(8*(page-1), 8*page);
  }
  const handlePageChange = (page) => {
    setPage(page); 
    console.log("page: ",page);
  };

  return(
    <div>
      <div className="searchTable">
        <div><BoardTable type="FAQ" list={sliceList()}></BoardTable></div>
      </div>
      <div className="searchPagination">
        <div><Pagination page={page} count={8} totalCount={result.length} setPage={handlePageChange}></Pagination></div>
      </div>
    </div>
  )
}
function NoResults() {
  const msg = "앗! 검색 결과가 없어요!\n 다시 검색해주세요!"
  return(
    <div className="NoResults">
      <img src={images.noResults} alt="NoResultsImg"/>
      <h1>{msg}</h1>
    </div>
  );
}
function ShowResults(props) {
  switch(props.results){
    case 0:
      return <NoResults/>;
    case 1:
      return <ExistResults resultList={props.resultList}/>;
    default:
      return null
  }
}

function Search() {
  const [modalOpen, setModalOpen] = useState(false)
  const [searchWord, setSearchWord] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const [resultExist, setResultExist] = useState(null)

  function search(){
    if(searchWord===""){
      setModalOpen(true)
    }
    else{
      console.log("검색어: ",searchWord);
      //1. 검색어 json 형식으로 php 서버에 전송
      axios.post("http://holo.dothome.co.kr/searchFAQ.php", JSON.stringify({word: searchWord}),{
        withCredentials: false,
        headers: {"Content-Type": "application/json"}
      })
        .then(response => {
          console.log(response.data);
          setSearchResult(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
      

      //2. 검색결과 받아오기
      //getResult();
      result = searchResult;

      if(result.length > 0) { setResultExist(1); }
      else { setResultExist(0); }
    }
  }

  function getResearchWord(val){
    setSearchWord(val.target.value)
  }

  return (
    <div className="leftSearch">
      <div className="searchHeaderBar">
        <input type="text" onChange={getResearchWord} placeholder="검색어를 입력해주세요"/>
        <button onClick={search}>
          <AiOutlineSearch className="searchImg"/>
        </button>
      </div>
      <div className="searchResults">
        <ShowResults results={resultExist} resultList={searchResult}></ShowResults>
        <Modal type="Info" open={modalOpen} close={()=>setModalOpen(false)}>
          검색어를 입력해주세요!
        </Modal>
      </div>
    </div>
  );
}

export default Search;
