import { Route, Routes } from 'react-router-dom';
import Board from './Board';
import PolicySearch from './PolicySearch';
import InfoSearch from './InfoSearch';
import Write from './Write';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="/policysearch" element={<PolicySearch />} />
      <Route path="/infosearch" element={<InfoSearch />} />
      <Route path="/write" element={<Write />} />
    </Routes>
  );
};

export default App;