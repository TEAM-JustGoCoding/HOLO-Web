import './Search.css';
import React, {useState, useEffect} from 'react';
import { images } from '../../images';
import { AiOutlineSearch } from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import queryString from 'query-string';
import axios from 'axios';
import { SystemSecurityUpdate } from '@mui/icons-material';


//>> 삭제 필요 <<
/*
var resultList = [
  {category: 'policy', id: 3, title: '정책 게시글', reg_date: '2022-02-05', nick_name: '옌', view: '500', like: '5'},
  {category: 'document', id: 3, title: '생활백서 게시글', reg_date: '2022-02-05', nick_name: '옌2', view: '500', like: '5'},
  {category: 'delivery', id: 3, title: '공동구매 게시글', reg_date: '2022-02-05', nick_name: '옌3', view: '500', accumulate: '100', goal: '1000'},
  {category: 'ott', id: 3, title: 'ott 게시글', reg_date: '2022-02-05', nick_name: '옌4', view: '500', accumulate: '1', goal: '5'},
  {category: 'faq', id: 3, title: 'FAQ 게시글'}
]sjr
*/

var resultList = [];

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
      <div className="searchTable">
        <div>
          <div><BoardTable type="All" list={sliceList()} searchQuery={props.searchQuery}></BoardTable></div>
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

function Search(props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [searchWord, setSearchWord] = useState(queryString.parse(window.location.search).word)
  const [searchQuery, setSearchQuery] = useState(queryString.parse(window.location.search).word)
  const [searchResult, setSearchResult] = useState(resultList)  // >>구현 필요 << 여기에 처음 게시글 검색 결과 넣기
  const [resultExist, setResultExist] = useState(null)

  console.log(queryString.parse(window.location.search).word);
  resultList = props.state.searchResult;
  console.log(resultList);
  //setSearchResult(resultList);
  resultList

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
  useEffect(()=>{
    setSearchResult(props.state.searchResult)
  }, [resultList])

  function search(){
    if(searchWord===""){
      setModalOpen(true)
    }
    else{
      console.log("검색어: ", searchWord);
      setSearchQuery(searchWord);
      setResultExist(null);
      sessionStorage.setItem('searchPage', 1);

      //1. 검색어 json 형식으로 php 서버에 전송
      axios.post("http://holo.dothome.co.kr/searchAll.php", JSON.stringify({word: searchWord}),{
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
    <div className="search all">
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

class AllSearch extends React.Component {
  constructor () {
    super ();

    //var pathname = window.location.pathname;
    
    this.state = {
      searchWord : "",
      searchResult : []
    };

    this.searchWord = queryString.parse(window.location.search).word;

  }

  componentDidMount(){
    //1. 검색어 json 형식으로 php 서버에 전송
    axios.post("http://holo.dothome.co.kr/searchAll.php", JSON.stringify({word: queryString.parse(window.location.search).word}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        //console.log(queryString.parse(window.location.search).word);
        console.log(response.data);
        this.setState({
          searchResult: response.data
        });
        resultList = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  };  
                                             

  render() {
    return(
      <Search state = {this.state}/>
    );
  }
}

export default AllSearch;
