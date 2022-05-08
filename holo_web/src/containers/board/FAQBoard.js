import './Board.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../../images';
import {AiOutlineLeft, AiOutlineSearch} from "react-icons/ai";
import BoardTable from '../../components/BoardTable';
import Pagination from '../../components/Pagination';

var faqJson = [];

/*
const faqList = [
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
    title: "위치 정보를 변경하고 싶어요."},
    { id: 6,
    title: "인증번호 문자가 오지 않아요."},
    { id: 7,
    title: "채팅 내용을 다른 사람이 볼 수 있나요?"},
    { id: 8,
    title: "거래 후기는 어떻게 진행하나요?"}
]
*/

//faq_post 받아오기
function getFAQ(){
    return fetch('https://stark-savannah-03205.herokuapp.com/http://holo.dothome.co.kr/faqJson.json')
    .then(response => { return response.json();})
        .then(response => { 
                        faqJson = [];
                        var obj = response;
                        //console.log(obj.length);
    
                        for(var i=0; i < obj.length; i++) {
                            faqJson.push(obj[i]);
                        }           
                        console.log(faqJson);
                        });
}


function ShowBoard() {
  getFAQ();
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
  render() {
    return(
      <ShowBoard/>
    );
  }
}
export default Board;
