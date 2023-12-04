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
  TableRow
} from "@mui/material";
import { LoadingButton } from '@mui/lab';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";

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

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const UsersSummary = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDelete =  () => {
    setOpenDialogDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
  };
  const handleUserId = (id) => {
    setUserId(id);
  };

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
  const response = await axios.get('http://127.0.0.1/api/profiles')
  setListUsers(response.data?.data)
}

const deleteUser = async () => {
  setLoading(true);
  try {
    await axios.delete('http://127.0.0.1/api/profile/' +  userId)
    setLoading(false);
    setListUsers((current) =>
      current.filter((row) => row.id !== userId)
    );
    setOpenDialogDelete(false);
  } catch (e) {
    //setOpenMessage(true);
  }
};

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
          <TableCell align="left">N.</TableCell>
            <TableCell align="left">Código</TableCell>
            <TableCell align="center">Descripción</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell align="left">{index}</TableCell>
                <TableCell align="left">{subscriber.code}</TableCell>
                <TableCell align="center">{subscriber.description}</TableCell>
                <TableCell align="right">
                <a href={`/profiles/edit/${subscriber.id}`}>
                  <Button>
                  <Icon>edit</Icon>
                  </Button>
                </a>
                  <IconButton 
                  onClick={() => {
                    const funcion1 = handleOpenDialogDelete;
                    handleUserId(subscriber.id);
                    funcion1();
                 }}>
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

      <Dialog open={openDialogDelete} onClose={handleCloseDelete}>
        <DialogTitle>Eliminar Perfil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Está seguro de eliminar perfil?
          </DialogContentText>
          <ValidatorForm onSubmit={deleteUser} onError={() => null}>

        <LoadingButton
          type="submit"
          color="primary"
          loading={loading}
          variant="contained"
          sx={{ my: 2 }}
        >
          <Icon>done</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Eliminar</Span>
        </LoadingButton>

        <StyledButton color="inherit" variant="contained" type="button" onClick={handleCloseDelete}>
          <Icon>cancel</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Cerrar</Span>
        </StyledButton>

          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UsersSummary;