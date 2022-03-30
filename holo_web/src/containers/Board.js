import { AppBar, Box, Toolbar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from "styled-components";
import Logo from "../images/logo.png"
import './Board.css';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #9dc3e6;
    width: 100vw;
    height: 10vh;
    display: flex;
    color: #757575;
  }
`;

function search(){
  console.log("검색")
}

/*
export default function Board() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static">
          <Toolbar>
            <img className="Logo" src={Logo} alt="Logo"/>
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
    </div>
  );
}
*/

class Board extends React.Component {
  render() {
    return (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
              <Toolbar>
                <img className="Logo" src={Logo} alt="Logo"/>
                <Link to='/search'>
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
                </Link>
              </Toolbar>
            </StyledAppBar>
          </Box>
        </div>
    );
  }
}
export default Board;