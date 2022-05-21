import './Board.css';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../../images';
import {AiOutlineSearch} from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';


function ShowBoard(props) {
  var poliInfo = props.poliInfo;
  var docInfo = props.docInfo;

  const [page, setPage] = useState(1);
  const [likeJson, setLikeJson] = useState([]);

  useEffect(()=> {
      setLikeJson([...poliInfo, ...docInfo])
  },[poliInfo, docInfo])

  function sliceList(){
    if (page === (likeJson.length/7))
      return likeJson.slice(7*(page-1), likeJson.length)
    else
      return likeJson.slice(7*(page-1), 7*page);
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
        <Link className="linkSearchButton" to='/faqsearch'>
          <button>
            <AiOutlineSearch className="moveSearchImg"/>
          </button>
        </Link>
      </div>
      <div className="boardCategoryBar">
          <div className="centerText">
            관심글
          </div>
        </div>
      <div className='boardCenter'>
        <div className="boardTable">
          <div><BoardTable type="Like" list={sliceList()}></BoardTable></div>
        </div>
        <div className="boardPagination">
          <div><Pagination page={page} count={9} totalCount={likeJson.length} setPage={handlePageChange}></Pagination></div>
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
    this.setState ({policy: [{id: "12345", title: "정책 좋아요 게시물 제목 클릭 금지", content: "정책 좋아요 게시물 내용",  nick_name: "우네",
    reg_date: "2022-05-01 12:00:00", like: "10000", view: "50000", category: "정책"}]}) //좋아요 게시물 구현 후 삭제
    this.setState ({document: [{id: "12345", title: "생활 좋아요 게시물 제목 클릭 금지", content: "생활 좋아요 게시물 내용",  nick_name: "우네",
    reg_date: "2022-05-01 12:00:00", like: "1", view: "5", category: "생활백서"}]}) //좋아요 게시물 구현 후 삭제   
  };
  render() {
    return(
      <ShowBoard poliInfo={this.state.policy} docInfo={this.state.document}/>
    );
  }
}
export default Board;
