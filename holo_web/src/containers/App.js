import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import InfoBoard from './board/InfoBoard';
import DealBoard from './board/DealBoard';
import FAQBoard from './board/FAQBoard';
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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/infoboard" element={<InfoBoard />} />
      <Route path="/dealboard" element={<DealBoard />} />
      <Route path="/faqboard" element={<FAQBoard/>}/>
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
    </Routes>
  );
};

export default App;