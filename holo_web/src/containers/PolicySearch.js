import './Search.css';
import React, {useState} from 'react';
import { images } from '../images';
import { AiOutlineSearch } from "react-icons/ai";
import BoardTable from '../components/BoardTable';
import Pagination from '../components/Pagination';

const list = [
  {
    id: 1,
    title: "1인 가구 맞춤형 주거상담소",
    date: "2022-03-17",
    writer: "정리 최고",
    view: "256",
    like: "50"
  },
  {
    id: 2,
    title: "1인 가구를 위한 이벤트",
    date: "2022-04-06",
    writer: "라이언",
    view: "100",
    like: "12"
  },
  {
    id: 3,
    title: "1인 가구 정리 수납 컨설팅",
    date: "2021-11-21",
    writer: "정책공유봇",
    view: "78",
    like: "6"
  },
  {
    id: 4,
    title: "1인 가구 정책 모음",
    date: "2022-01-16",
    writer: "정책공유봇",
    view: "216",
    like: "112"
  }
]

function ExistResults() {
  const [page, setPage] = useState(1);

  function sliceList(){
    if (page === (list.length/8))
      return list.slice(8*(page-1), list.length)
    else
      return list.slice(8*(page-1), 8*page);
  }
  const handlePageChange = (page) => {
    setPage(page); 
    console.log("page: ",page);
  };

  return(
    <div>
      <div className="searchTable">
        <div><BoardTable type="Info" list={sliceList()}></BoardTable></div>
      </div>
      <div className="searchPagination">
        <div><Pagination page={page} count={8} totalCount={list.length} setPage={handlePageChange}></Pagination></div>
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

  function search(){
    console.log(searchWord)
    switch(searchWord){
      case "No":
        setSearchResult(0);
        break;
      case "Yes":
        setSearchResult(1);
        break;
      default:
        setSearchResult(null);
        break;
    }
  }
  function getResearchWord(val){
    setSearchWord(val.target.value)
  }

  return (
    <div className="policySearch">
      <div className="searchHeaderBar">
        <input type="text" onChange={getResearchWord} placeholder="검색어를 입력해주세요"/>
        <button onClick={search}>
          <AiOutlineSearch className="searchImg"/>
        </button>
      </div>
      <div className="searchResults">
        <ShowResults results={searchResult}></ShowResults>
      </div>
    </div>
  );
}

export default Search;