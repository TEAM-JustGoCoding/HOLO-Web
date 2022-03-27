import './Search.css';
import {useState} from 'react';
import { AppBar, Box, Toolbar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from "styled-components";
import noResultsImg from "../images/noResults.png"

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #9dc3e6;
    width: 100vw;
    height: 10vh;
    display: flex;
    align-items: center;
    color: #757575;
  }
`;

export default function Search() {
  const [searchWord, setSearchWord] = useState(null)
  const msg = "앗! 검색 결과가 없어요!\n 다시 검색해주세요!"

  function search(){
    console.log(searchWord)
  }
  function getResearchWord(val){
    setSearchWord(val.target.value)
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static">
          <Toolbar>
            <input className="Input" type="text" onChange={getResearchWord} placeholder="검색어를 입력해주세요"/>
            <IconButton
              onClick={search}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </StyledAppBar>
      </Box>
      <div className="NoResults">
        <img className="NoResultsImg" src={noResultsImg} alt="NoResultsImg"/>
        <h1 className="NoResultsMsg">{msg}</h1>
      </div>
    </div>
  );
}