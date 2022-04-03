import './Board.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {images} from '../images';
import { AiOutlineSearch } from "react-icons/ai";


function search(){
  console.log("검색")
}

function ShowBoard() {
  const [select, setSelect] = useState("left")
  
  return (
    <div>
      <div className="headerBar">
        <img className="logo" src={images.logo} alt="Logo"/>
        <Link className="linkSearchButton" to='/search'>
          <button className="moveSearchButton" onClick={search}>
            <AiOutlineSearch className="moveSearchImg"/>
          </button>
        </Link>
      </div>
      <div className="buttonBar">
        <button className="leftButton" onClick={() => setSelect("left")}>정책</button>
        <button className="rightButton" onClick={() => setSelect("right")}>생활백서</button>
      </div>
      <div className={`board ${select === "left" ? 'left' : 'right'}`}>
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