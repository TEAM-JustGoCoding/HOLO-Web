import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import InfoBoard from './InfoBoard';
import PolicySearch from './PolicySearch';
import DocumentSearch from './DocumentSearch';
import Write from './Write';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/infoboard" element={<InfoBoard />} />
      <Route path="/policysearch" element={<PolicySearch />} />
      <Route path="/documentsearch" element={<DocumentSearch />} />
      <Route path="/write" element={<Write />} />
    </Routes>
  );
};

export default App;