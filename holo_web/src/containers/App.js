import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import InfoBoard from './board/InfoBoard';
import DealBoard from './board/DealBoard';
import FAQBoard from './board/FAQBoard';
import LikeBoard from './board/LikeBoard';
import PolicyPost from './post/PolicyPost';
import DocumentPost from './post/DocumentPost';
import DeliveryPost from './post/DeliveryPost';
import OttPost from './post/OttPost';
import FAQPost from './post/FAQPost';
import PolicySearch from './search/PolicySearch';
import DocumentSearch from './search/DocumentSearch';
import DeliverySearch from './search/DeliverySearch';
import OttSearch from './search/OttSearch';
import FAQSearch from './search/FAQSearch';
import Write from './write/Write';
import Edit from './write/Edit';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/infoboard" element={<InfoBoard />} />
      <Route path="/dealboard" element={<DealBoard />} />
      <Route path="/faqboard" element={<FAQBoard/>}/>
      <Route path="/likeboard" element={<LikeBoard/>}/>
      <Route path="/policypost/:id" element={<PolicyPost/>}/>
      <Route path="/documentpost/:id" element={<DocumentPost/>}/>
      <Route path="/deliverypost/:id" element={<DeliveryPost/>}/>
      <Route path="/ottpost/:id" element={<OttPost/>}/>
      <Route path="/faqpost/:id" element={<FAQPost/>}/>
      <Route path="/policysearch" element={<PolicySearch />} />
      <Route path="/documentsearch" element={<DocumentSearch />} />
      <Route path="/deliverysearch" element={<DeliverySearch/>}/>
      <Route path="/ottsearch" element={<OttSearch/>}/>
      <Route path="/faqsearch" element={<FAQSearch/>}/>
      <Route path="/write" element={<Write />} />
      <Route path="/edit/policy/:id" element={<Edit />} />
      <Route path="/edit/document/:id" element={<Edit />} />
      <Route path="/edit/delivery/:id" element={<Edit />} />
      <Route path="/edit/ott/:id" element={<Edit />} />
    </Routes>
  );
};

export default App;