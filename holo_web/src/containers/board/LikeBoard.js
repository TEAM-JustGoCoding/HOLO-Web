import './Board.css';
import React, {useState, useEffect} from 'react';
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';
import axios from 'axios';

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
      user: 32,  //29 시도해볼 것
      policy: [],
      document: []
    };
  }

  componentDidMount(){
    //정책 관심글 가져오기
    axios.post("http://holo.dothome.co.kr/getLikedPolicy.php", JSON.stringify({user: this.state.user}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        console.log(response.data);
        this.setState ({
          policy: response.data
        });  
      })
      .catch(function(error) {
        console.log(error);
      });
    
    //생활백서 관심글 가져오기
    axios.post("http://holo.dothome.co.kr/getLikedDoc.php", JSON.stringify({user: this.state.user}),{
      withCredentials: false,
      headers: {"Content-Type": "application/json"}
    })
      .then(response => {
        console.log(response.data);
        this.setState ({
          document: response.data
        });  
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return(
      <ShowBoard poliInfo={this.state.policy} docInfo={this.state.document}/>
    );
  }
}
export default Board;
