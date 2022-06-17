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
      case 'policyboard':
        navigate('/infoboard?select=policy'); break;
      case 'documentboard':
        navigate('/infoboard?select=document'); break;
      case 'deliveryboard':
        navigate('/dealboard?select=delivery'); break;
      case 'ottboard':
        navigate('/dealboard?select=ott'); break;
      case 'policypost':
        navigate('/policypost/'+queryString.parse(window.location.search).id); break;
      case 'documentpost':
        navigate('/documentpost/'+queryString.parse(window.location.search).id); break;
      case 'deliverypost':
        navigate('/deliverypost/'+queryString.parse(window.location.search).id); break;
      case 'ottpost':
        navigate('/ottpost/'+queryString.parse(window.location.search).id); break;
      case 'faqboard':
        navigate('/faqboard'); break;
      case 'likeboard':
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