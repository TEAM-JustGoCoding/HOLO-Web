import './Search.css';
import React, {useState} from 'react';
import { images } from '../../images';
import { AiOutlineSearch } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';
import axios from 'axios';

var result = [];  //결과를 저장할 전역변수

function ExistResults() {
  const [page, setPage] = useState(1);

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
        <div><BoardTable type="Ott" list={sliceList()}></BoardTable></div>
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
      return <ExistResults/>;
    default:
      return null
  }
}

function Search() {
  const [searchWord, setSearchWord] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const [resultExist, setResultExist] = useState(null)

  function getResult(){
    return fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/ottResult.json')
    .then(response => { return response.json();})
    .then(response => { 
                        var result = [];
                        var obj = response;
                        for(var i=0; i < obj.length; i++) {
                          result.push(obj[i]);
                        }     
                        setSearchResult(result);

                        console.log(searchResult);
                      });
  }

  function search(){
    //1. 검색어 json 형식으로 php 서버에 전송
    axios.post("http://holo.dothome.co.kr/searchOTT.php", JSON.stringify({word: searchWord}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(function(body) {
        console.log(body);
      })
      .catch(function(error) {
        console.log(error);
      });
    

    //2. 검색결과 받아오기
    getResult();

    result = searchResult;
    //console.log(result);

    if(result.length > 0){
      setResultExist(1);
    } else {
      setResultExist(0);
    }
  }

  function getResearchWord(val){
    setSearchWord(val.target.value)
  }

  return (
    <div className="rightSearch">
      <div className="searchHeaderBar">
        <input type="text" onChange={getResearchWord} placeholder="검색어를 입력해주세요"/>
        <button onClick={search}>
          <AiOutlineSearch className="searchImg"/>
        </button>
      </div>
      <div className="searchResults">
        <ShowResults results={resultExist}></ShowResults>
      </div>
    </div>
  );
}

export default Search;
