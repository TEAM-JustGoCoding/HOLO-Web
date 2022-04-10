import './Search.css';
import React, {useState} from 'react';
import { images } from '../images';
import { AiOutlineSearch } from "react-icons/ai";
import BoardTable from '../components/BoardTable';

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
  return(
    <div className="searchTable">
      <BoardTable list={list}></BoardTable>
    </div>
  )
}
function NoResults() {
  const msg = "앗! 검색 결과가 없어요!\n 다시 검색해주세요!"
  return(
    <div className="NoResults">
      <img className="NoResultsImg" src={images.noResults} alt="NoResultsImg"/>
      <h1 className="NoResultsMsg">{msg}</h1>
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
    <div className="infoSearch">
      <div className="headerBar">
        <input className="Input" type="text" onChange={getResearchWord} placeholder="검색어를 입력해주세요"/>
        <button className="searchButton" onClick={search}>
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