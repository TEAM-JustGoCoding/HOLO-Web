import './Board.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../../images';
import {AiOutlineLeft, AiOutlineSearch} from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';


function ShowBoard(props) {
  var faqJson = props.faqInfo;

  const [page, setPage] = useState(1);

  function sliceList(){
    if (page === (faqJson.length/9))
      return faqJson.slice(9*(page-1), faqJson.length)
    else
      return faqJson.slice(9*(page-1), 9*page);
  }
  const handlePageChange = (page) => {
    setPage(page); 
    console.log("page: ",page);
  };

  return (
    <div>
      <div className="boardHeaderBar">
        <Link className="linkBackButton" to='/'>
          <button>
            <AiOutlineLeft className="moveBackImg"/>
          </button>
        </Link>
        <img src={images.logo} alt="Logo"/>
        <Link className="linkSearchButton" to='/faqsearch'>
          <button>
            <AiOutlineSearch className="moveSearchImg"/>
          </button>
        </Link>
      </div>
      <div className="boardCategoryBar">
          <div className="centerText">
            FAQ
          </div>
        </div>
      <div className='boardCenter'>
        <div className="boardTable">
          <div><BoardTable type="FAQ" list={sliceList()}></BoardTable></div>
        </div>
        <div className="boardPagination">
          <div><Pagination page={page} count={9} totalCount={faqJson.length} setPage={handlePageChange}></Pagination></div>
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
    fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/faq_to_json.php')
    .then(response => { return response.json();})
    .then(response => { 
                        var faqJson = [];
                        var obj = response;
                        //console.log(obj.length);
    
                        for(var i=0; i < obj.length; i++) {
                          faqJson.push(obj[i]);
                        }           
                       console.log(faqJson);

                       this.setState ({faq: faqJson});
                      });                           
  };
  render() {
    return(
      <ShowBoard faqInfo={this.state.faq}/>
    );
  }
}
export default Board;
