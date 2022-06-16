import './Home.css';
import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {images} from '../../images';

function Home() {
  //window.sessionStorage.clear();
  const navigate = useNavigate();

  useEffect(()=> {
    switch(queryString.parse(window.location.search).path){
      case 'policy':
        navigate('/infoboard?select=policy'); break;
      case 'document':
        navigate('/infoboard?select=document'); break;
      case 'delivery':
        navigate('/dealboard?select=delivery'); break;
      case 'ott':
        navigate('/dealboard?select=ott'); break;
      case 'faq':
        navigate('/faqboard'); break;
      case 'like':
        navigate('/likeboard'); break;
      default:
        return null
    }
  },[])

  return (
    <div>
        <div className="homeHeaderBar">
            <img src={images.logo} alt="Logo"/>
            <Link className="linkMenuButton" to='/infoboard'>
                <button>알아가요</button>
            </Link>
            <Link className="linkMenuButton" to='/dealboard'>
              <button>같이해요</button>
            </Link>
            <Link className="linkMenuButton" to="/faqboard">
              <button>궁금해요</button>
            </Link>
        </div>
        <div className="home"></div>
    </div>
  );
}

export default Home;