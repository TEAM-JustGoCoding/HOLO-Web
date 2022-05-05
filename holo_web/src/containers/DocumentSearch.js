import './Search.css';
import React, {useState} from 'react';
import { images } from '../images';
import { AiOutlineSearch } from "react-icons/ai";
import BoardTable from '../components/BoardTable';
import Pagination from '../components/Pagination';

const list = [
  {
    id: 1,
    title: "돼지고기 잡냄새 없애는 방법 공유해요",
    date: "2022-04-11",
    writer: "옌",
    view: "13",
    like: "1"
  },
  {
    id: 2,
    title: "탄 냄비 세척하는 방법이에용",
    date: "2022-02-12",
    writer: "옌",
    view: "20",
    like: "2"
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
    <div className="documentSearch">
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