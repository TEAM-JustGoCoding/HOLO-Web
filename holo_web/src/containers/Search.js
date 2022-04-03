import './Search.css';
import React, {useState} from 'react';
import { images } from '../images';
import { AiOutlineSearch } from "react-icons/ai";


function ExistResults() {
  const msg = "검색 완료!\n 이것은 결과에요!"
  return(
    <h1 className="NoResultsMsg">{msg}</h1>
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
    <div>
      <div className="headerBar">
        <input className="Input" type="text" onChange={getResearchWord} placeholder="검색어를 입력해주세요"/>
        <button className="searchButton" onClick={search}>
          <AiOutlineSearch className="searchImg"/>
        </button>
      </div>
      <ShowResults results={searchResult}></ShowResults>
    </div>
  );
}

export default Search;