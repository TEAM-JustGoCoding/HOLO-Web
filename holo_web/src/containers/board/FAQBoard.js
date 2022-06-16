import './Board.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../../images';
import {AiOutlineSearch} from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';
import axios from 'axios';


function ShowBoard(props) {
  var faqJson = props.faqInfo;

  const [page, setPage] = useState(1);

  function sliceList(){
    if (page === (faqJson.length/10))
      return faqJson.slice(10*(page-1), faqJson.length)
    else
      return faqJson.slice(10*(page-1), 10*page);
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
      <div className="boardCategoryBar faq">
        <div className="centerText">
          FAQ
        </div>
      </div>
      <div className='faqBoardCenter'>
        <div className="boardTable">
          <div>
            <div><BoardTable type="FAQ" list={sliceList()}></BoardTable></div>
          </div>
        </div>
        <div className="boardPagination">
          <div><Pagination page={page} count={10} totalCount={faqJson.length} setPage={handlePageChange}></Pagination></div>
        </div>
      </div>
    </div>
  );
}


class Board extends React.Component {
  constructor () {
    super ();

    this.state = {
      faq: []
    };
  }

  componentDidMount(){
    //faq 글 불러오기
    axios.post("http://holo.dothome.co.kr/faq_to_json.php", JSON.stringify({temp: "faq"}),{
          withCredentials: false,
          headers: {"Content-Type": "application/json"}
        })
          .then(response => {
            console.log(response.data);
            this.setState ({
              faq: response.data
            });  
          })
          .catch(function(error) {
            console.log(error);
          });                         
  };
  render() {
    return(
      <ShowBoard faqInfo={this.state.faq}/>
    );
  }
}
export default Board;
