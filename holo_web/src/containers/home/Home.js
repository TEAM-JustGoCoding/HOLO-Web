import './Home.css';
import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {images} from '../../images';

function Home() {
  sessionStorage.removeItem('boardSelect');
  sessionStorage.removeItem('boardPage');
  sessionStorage.removeItem('searchWord');
  sessionStorage.removeItem('searchQuery');
  sessionStorage.removeItem('searchResult');
  sessionStorage.removeItem('seachExist');
  sessionStorage.removeItem('seachPage');

  const navigate = useNavigate();

  useEffect(()=> {
    if(sessionStorage.getItem('navigateHistory')===null){
      switch(queryString.parse(window.location.search).path){
        case 'policyboard':
          navigate('/infoboard?select=policy');
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        case 'documentboard':
          navigate('/infoboard?select=document');
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        case 'deliveryboard':
          navigate('/dealboard?select=delivery');
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        case 'ottboard':
          navigate('/dealboard?select=ott');
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        case 'faqboard':
          navigate('/faqboard');
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        case 'likeboard':
          navigate('/likeboard');
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        case 'policypost':
          navigate('/policypost/'+queryString.parse(window.location.search).id);
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        case 'documentpost':
          navigate('/documentpost/'+queryString.parse(window.location.search).id);
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        case 'deliverypost':
          navigate('/deliverypost/'+queryString.parse(window.location.search).id);
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        case 'ottpost':
          navigate('/ottpost/'+queryString.parse(window.location.search).id);
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        case 'allsearch' :
          navigate('/allsearch?word='+queryString.parse(window.location.search).word);
          sessionStorage.setItem('navigateHistory', 'true');
          break;
        default:
          return null
      }
    }
    else{
      try {
        window.Android.exitWebview();
      }
      catch (e) {
        window.history.back()
      }
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