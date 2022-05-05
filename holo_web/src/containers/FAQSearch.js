import './Search.css';
import React, {useState} from 'react';
import { images } from '../images';
import { AiOutlineSearch } from "react-icons/ai";
import BoardTable from '../components/BoardTable';
import Pagination from '../components/Pagination';

const list = [
    { id: 0,
    title: "채팅방을 삭제했어요. 복구할 수 있나요?"},
    { id: 1,
      title: "게시글은 어떻게 삭제하나요? (게시글 삭제하기)"},
    { id: 2,
    title: "프로필 사진과 닉네임을 변경하고 싶어요."},
    { id: 3,
    title: "HOLO 뜻이 뭔가요? (왜 HOLO 인가요?)"},
    { id: 4,
    title: "HOLO에서 지켜야 할 매너"},
    { id: 5,
    title: "위치 정보를 변경하고 싶어요."}                           
]

function ExistResults() {
  const [page, setPage] = useState(1);

  function sliceList(){
    if (page === (list.length/10))
      return list.slice(10*(page-1), list.length)
    else
      return list.slice(10*(page-1), 10*page);
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
        <div><Pagination page={page} count={10} totalCount={list.length} setPage={handlePageChange}></Pagination></div>
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
    <div className="faqSearch">
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