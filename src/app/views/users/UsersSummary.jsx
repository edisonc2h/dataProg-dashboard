import {
  Box,
  Icon,
  Button,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios.js'

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const UsersSummary = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [usersList, setListUsers] = useState([]);

  useEffect(()=>{
    getUsers();
  },[]);

const getUsers = async () => {
  const response = await axios.get('http://127.0.0.1/api/users')
  setListUsers(response.data?.data)
}

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
          <TableCell align="left">N.</TableCell>
            <TableCell align="left">Login</TableCell>
            <TableCell align="center">Apellidos Nombre</TableCell>
            <TableCell align="center">Num. Documento</TableCell>
            <TableCell align="center">Entidad Financiera</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell align="left">{index}</TableCell>
                <TableCell align="left">{subscriber.username}</TableCell>
                <TableCell align="center">{subscriber.lastname} {subscriber.name}</TableCell>
                <TableCell align="center">{subscriber.documentNumber}</TableCell>
                <TableCell align="center">{subscriber.financialInstitution}</TableCell>
                <TableCell align="center">{subscriber.status}</TableCell>
                <TableCell align="right">
                <a href={`/users/edit/${subscriber.id}`}>
                  <Button>
                  <Icon>edit</Icon>
                  </Button>
                </a>
                  <IconButton >
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton>
                    <Icon>password</Icon>
                  </IconButton>
                  <IconButton>
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={usersList?.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
};

export default UsersSummary;