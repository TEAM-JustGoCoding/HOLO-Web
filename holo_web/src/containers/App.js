import { Route, Routes } from 'react-router-dom';
import Board from './Board';
import Search from './Search';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default App;