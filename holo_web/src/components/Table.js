import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(1)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(title, day, writer, view, like) {
  return {title, day, writer, view, like};
}

const rows = [
  createData('🔥 1인 가구 맞춤형 주거상담소', '2022-03-17', '정리 최고', 564, 159),
  createData('1인 가구 정리 수납 컨설팅', '2022-03-20', '정리 최고', 102, 80),
  createData('스마트 플러그 지원 사업', '2022-03-17', '사업왕', 84, 10),
  createData('대학생 임대주택 공급 및 지원', '2022-01-11', '임대 주택', 27, 8),
  createData('1인 가구 정책 모음', '2022-05-12', '정책공유', 24, 4),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>제목</TableCell>
            <TableCell align="right">날짜</TableCell>
            <TableCell align="right">작성자</TableCell>
            <TableCell align="right">조회수</TableCell>
            <TableCell align="right">좋아요</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.day}</TableCell>
              <TableCell align="right">{row.writer}</TableCell>
              <TableCell align="right">{row.view}</TableCell>
              <TableCell align="right">{row.like}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}