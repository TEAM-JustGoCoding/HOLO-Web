import './Search.css';
import React, {useState, useEffect} from 'react';
import { images } from '../../images';
import { AiOutlineSearch } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import axios from 'axios';

function ExistResults(props) {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);

  useEffect(()=> {
    if(sessionStorage.getItem('searchPage')){
      setPage(parseInt(sessionStorage.getItem('searchPage')))
    }
  }, [])
  useEffect(()=> {
    setResult(props.searchResult);
  },[props.searchResult])

  function sliceList(){
    if (page === (result.length/10))
      return result.slice(10*(page-1), result.length)
    else
      return result.slice(10*(page-1), 10*page);
  }
  const handlePageChange = (page) => {
    setPage(page);
    sessionStorage.setItem('searchPage', page)
  };

  return(
    <div>
      <div className="searchTable-FAQ">
        <div>
          <div><BoardTable type="FAQ" list={sliceList()} searchQuery={props.searchQuery}></BoardTable></div>
        </div>
      </div>
      <div className="searchPagination">
        <div><Pagination page={page} count={10} totalCount={result.length} setPage={handlePageChange}></Pagination></div>
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
  switch(props.resultExist){
    case 0:
      return <NoResults/>;
    case 1:
      return <ExistResults searchQuery={props.searchQuery} searchResult={props.searchResult}/>;
    default:
      return null
  }
}

function Search() {
  const [modalOpen, setModalOpen] = useState(false)
  const [searchWord, setSearchWord] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const [resultExist, setResultExist] = useState(null)
  
  useEffect(()=>{
    if(sessionStorage.getItem('searchWord')!=null){setSearchWord(sessionStorage.getItem('searchWord'))}
    if(sessionStorage.getItem('searchQuery')!=null){setSearchQuery(sessionStorage.getItem('searchQuery'))}
    if(JSON.parse(sessionStorage.getItem('searchResult'))!=null){setSearchResult(JSON.parse(sessionStorage.getItem('searchResult')))}
    if(sessionStorage.getItem('searchExist')!=null){setResultExist(sessionStorage.getItem('searchExist'))}
  }, [])
  useEffect(()=>{
    sessionStorage.setItem('searchWord', searchWord)
  }, [searchWord])
  useEffect(()=>{
    sessionStorage.setItem('searchQuery', searchQuery)
  }, [searchQuery])
  useEffect(()=>{
    if(searchResult === null) { return; } //검색 결과 동기화 해결 후 삭제
    else if(searchResult.length > 0) { setResultExist(1); }
    else { setResultExist(0); }
    sessionStorage.setItem('searchResult', JSON.stringify(searchResult))
  }, [searchResult])
  useEffect(()=>{
    sessionStorage.setItem('searchExist', resultExist)
  }, [resultExist])

  function search(){
    if(searchWord===""){
      setModalOpen(true)
    }
    else{
      console.log("검색어: ",searchWord);
      setSearchQuery(searchWord);
      setResultExist(null);
      sessionStorage.setItem('searchPage', 1);

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
    }
  }

  function getResearchWord(val){
    setSearchWord(val.target.value)
  }

  return (
    <div className="search faq">
      <div className="searchHeaderBar">
        <input type="text" value={searchWord} onChange={getResearchWord} placeholder="검색어를 입력해주세요" maxLength='50'/>
        <button onClick={search}>
          <AiOutlineSearch className="searchImg"/>
        </button>
      </div>
      <div className="searchResults">
        <ShowResults resultExist={resultExist} searchQuery={searchQuery} searchResult={searchResult}></ShowResults>
        <Modal type="Info" open={modalOpen} close={()=>setModalOpen(false)}>검색어를 입력해주세요!</Modal>
      </div>
    </div>
  );
}

export default Search;
