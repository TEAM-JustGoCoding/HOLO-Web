import './Board.css';
import React, {useState, useEffect} from 'react';
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
    if (page === (likeJson.length/10))
      return likeJson.slice(10*(page-1), likeJson.length)
    else
      return likeJson.slice(10*(page-1), 10*page);
  }
  const handlePageChange = (page) => {
    setPage(page); 
    console.log("page: ",page);
  };

  return (
    <div>
      <div className="boardHeaderBar">
        <div className="leftText">
          관심글
        </div>
      </div>
      <div className='likeBoardCenter'>
        <div className="likeBoardTable">
          <div>
            <div><BoardTable type="Like" list={sliceList()}></BoardTable></div>
          </div>
        </div>
        <div className="boardPagination">
          <div><Pagination page={page} count={10} totalCount={likeJson.length} setPage={handlePageChange}></Pagination></div>
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
