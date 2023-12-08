import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {Icon, IconButton, Button, styled, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios.js'
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { LoadingButton } from '@mui/lab';
import { Span } from "app/components/Typography";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }));

const UsersTableData = () => {
  const [responsive, setResponsive] = useState("standard");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [openDialogPassword, setOpenDialogPassword] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [password]);

  const handleOpenDialogPassword = () => {
    setPassword('')
    setConfirmPassword('')
    setOpenDialogPassword(true);
  };
  const handleOpenDialogDelete =  () => {
    setOpenDialogDelete(true)
  }
  const handleUserId = (id) => {
    setUserId(id);
  };

 const handleClose = () => {
    setOpenDialogPassword(false);
    setOpenDialogDelete(false);
  };

  const columns = [
    {
      name: "",
      label: "N",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, update) => {
          let rowIndex = Number(tableMeta.rowIndex) + 1;
          return <span>{rowIndex}</span>;
        },
      },
    },
    {
      name: "username",
      label: "Login",
      options: { filterOptions: { fullWidth: true }, print: true },
    },
    { name: "lastname", label: "Apellido", options: { print: true } },
    { name: "name", label: "Nombre", options: { print: true } },
    { name: "documentNumber", label: "Num. Documento", options: { print: true } },
    { name: "financialInstitution", label: "Entidad Financiera", options: { print: true } },
    { name: "status", label: "Estado", options: { print: true } },
    {
      name: "Opciones",
      options: {
        filter: false,
        sort: false,
        print: false,
        empty: true,
        download: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
                <IconButton
                  onClick={() => {
                     navigate(`/users/edit/${usersList[dataIndex].id}`)
                  }}
                  >
                <Icon>edit</Icon>
                  </IconButton>
                  <IconButton
                  onClick={() => {
                     const funcion1 = handleOpenDialogPassword;
                     handleUserId(usersList[dataIndex].id);
                     funcion1();
                  }}
                  >
                    <Icon>password</Icon>
                  </IconButton>
                  <IconButton 
                  onClick={() => {
                    const funcion1 = handleOpenDialogDelete;
                    handleUserId(usersList[dataIndex].id);
                    funcion1();
                 }}>
                    <Icon>delete</Icon>
                  </IconButton>
            </>
          );
        },
      },
    },
  ];

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
    },
    selectableRows: "none",
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
      setOpenDialogPassword(false);
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
    <>
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"Lista de Usuarios"}
          data={usersList}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>

    <Dialog open={openDialogPassword} onClose={handleClose}>
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
              label="Password (Mínimo 8)"
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
      <Dialog open={openDialogDelete} onClose={handleClose}>
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

        <StyledButton color="inherit" variant="contained" type="button" onClick={handleClose}>
          <Icon>cancel</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Cerrar</Span>
        </StyledButton>

          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </>
    
  );
}

export default UsersTableData;