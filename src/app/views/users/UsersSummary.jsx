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
  Grid
} from "@mui/material";
import { LoadingButton } from '@mui/lab';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
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

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const UsersSummary = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpen] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [password]);

  const handleClickOpen = () => {
    setPassword('')
    setConfirmPassword('')
    setOpen(true);
  };
  const handleOpenDialogDelete =  () => {
    setOpenDialogDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
  };
  const handleUserId = (id) => {
    setUserId(id);
  };

  const handleClose = () => {
    setOpen(false);
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
  const response = await axios.get('http://127.0.0.1/api/users')
  setListUsers(response.data?.data)
}

const handleChangePass = (event) => {
  event.persist();
  setPassword(event.target.value);
};
const handleChangePassConfirm = (event) => {
  event.persist();
  setConfirmPassword(event.target.value);
};

const editPassword = async () => {
  setLoading(true);
  const user = {'password': password};
  try {
    await axios.patch('http://127.0.0.1/api/changeUserPassword/' +  userId, user)
    setLoading(false);
  } catch (e) {
    //setOpenMessage(true);
  }
};

const deleteUser = async () => {
  setLoading(true);
  try {
    await axios.delete('http://127.0.0.1/api/user/' +  userId)
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
                  <IconButton
                  onClick={() => {
                     const funcion1 = handleClickOpen;
                     handleUserId(subscriber.id);
                     funcion1();
                  }}
                  >
                    <Icon>password</Icon>
                  </IconButton>
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

    <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Resetear Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cambiar el password de acceso al usuario
          </DialogContentText>
          <ValidatorForm onSubmit={editPassword} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              name="password"
              type="password"
              label="Password (Min length 8)"
              value={password || ""}
              onChange={handleChangePass}
              validators={["required", "minStringLength: 8"]}
              errorMessages={["Campo obligatorio"]}
            />

            <TextField
              type="password"
              name="confirmPassword"
              onChange={handleChangePassConfirm}
              label="Confirm Password"
              value={confirmPassword || ""}
              validators={["required", "isPasswordMatch"]}
              errorMessages={["Campo obligatorio", "password no coincide"]}
            />

          </Grid>
          </Grid>

        <LoadingButton
          type="submit"
          color="primary"
          loading={loading}
          variant="contained"
          sx={{ my: 2 }}
        >
          <Icon>done</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Guardar</Span>
        </LoadingButton>

        <StyledButton color="inherit" variant="contained" type="button" onClick={handleClose}>
          <Icon>cancel</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Cerrar</Span>
        </StyledButton>

          </ValidatorForm>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialogDelete} onClose={handleCloseDelete}>
        <DialogTitle>Eliminar Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Está seguro de eliminar usuario?
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