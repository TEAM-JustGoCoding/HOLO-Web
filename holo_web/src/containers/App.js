import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import InfoBoard from './board/InfoBoard';
import FAQBoard from './board/FAQBoard';
import FAQPost from './post/FAQPost';
import PolicySearch from './search/PolicySearch';
import DocumentSearch from './search/DocumentSearch';
import FAQSearch from './search/FAQSearch';
import Write from './write/Write';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/infoboard" element={<InfoBoard />} />
      <Route path="/faqboard" element={<FAQBoard/>}/>
      <Route path="/faqpost/:id" element={<FAQPost/>}/>
      <Route path="/policysearch" element={<PolicySearch />} />
      <Route path="/documentsearch" element={<DocumentSearch />} />
      <Route path="/faqsearch" element={<FAQSearch/>}/>
      <Route path="/write" element={<Write />} />
    </Routes>
  );
};

export default App;