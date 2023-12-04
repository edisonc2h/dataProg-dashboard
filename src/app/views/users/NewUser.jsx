import {
  Button,
  Autocomplete,
  Grid,
  Icon,
  styled,
  Box
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useEffect, useState, forwardRef } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from 'axios.js'
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const AutoComplete = styled(Autocomplete)(() => ({
    width: 300,
    marginBottom: '1px',
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }));

  const statusList = [ 'Activo', 'Inactivo'];

  const optionsSiNo = ['Si', 'No'];

const SimpleForm = () => {
  const [state, setState] = useState({ date: new Date(), status: 'Activo', portalDownload: 'No', consultingJudicialOrders: 'No'});
  const [openMessage, setOpenMessage] = useState(false);

  const [status] = useState();
  const [portalDownload] = useState();
  const [consultingJudicialOrders] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
        await axios.post('http://127.0.0.1/api/user', state)
        setLoading(false);
        setOpenMessage(true);
        navigate('/users');
    } catch (e) {
        console.log(e)
        setLoading(false);
    }
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChangeStatus = (newValue) => {
    if (newValue) {
        setState({ ...state, 'status': newValue });
    }
  };

  const handleChangePortal = (newValue) => {
    if (newValue) {
        setState({ ...state, 'portalDownload': newValue });
    }
  };

  const handleChangeConsulting = (newValue) => {
    if (newValue) {
        setState({ ...state, 'consultingJudicialOrders': newValue });
    }
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessage(false);
  };

  const {
    username,
    documentNumber,
    name,
    lastname,
    financialInstitution,
    password,
    confirmPassword,
    email
  } = state;

  return (
    <Container>

        <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Listado", path: "/users" }, { name: "Nuevo" }]} />
        </Box>

      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="username"
              id="standard-basic"
              value={username || ""}
              onChange={handleChange}
              errorMessages={["Campo obligatorio"]}
              label="Login (Min length 4, Max length 15)"
              validators={["required", "minStringLength: 4", "maxStringLength: 15"]}
            />

            <TextField
              type="text"
              name="name"
              label="Nombre"
              onChange={handleChange}
              value={name || ""}
              validators={["required"]}
              errorMessages={["Campo obligatorio"]}
            />

            <TextField
              type="email"
              name="email"
              label="Email"
              value={email || ""}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["Campo obligatorio", "email no válido"]}
            />
            <TextField
              name="password"
              type="password"
              label="Password (Min length 8)"
              value={password || ""}
              onChange={handleChange}
              validators={["required", "minStringLength: 8"]}
              errorMessages={["Campo obligatorio"]}
            />
            <TextField
              name="financialInstitution"
              type="text"
              label="Institución Financiera"
              value={financialInstitution || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Campo obligatorio"]}
            />

          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextField
              type="text"
              name="documentNumber"
              label="Número Documento"
              onChange={handleChange}
              value={documentNumber || ""}
              validators={["required"]}
              errorMessages={["Campo obligatorio"]}
            />
            <TextField
              type="text"
              name="lastname"
              label="Apellido"
              onChange={handleChange}
              value={lastname || ""}
              validators={["required"]}
              errorMessages={["Campo obligatorio"]}
            />
            <AutoComplete
            name="status"
            id="status"
            onChange={(event, newValue) => {
                handleChangeStatus(newValue);
              }}
            options={statusList}
            value={status}
            renderInput={(params) => (
            <TextField {...params} label="Estado" variant="outlined" fullWidth />
            )}
            />
            
            <TextField
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              label="Confirm Password"
              value={confirmPassword || ""}
              validators={["required", "isPasswordMatch"]}
              errorMessages={["Campo obligatorio", "password no coincide"]}
            />

            <AutoComplete
            name="portalDownload"
            onChange={(event, newValue) => {
                handleChangePortal(newValue);
              }}
            options={optionsSiNo}
            value={portalDownload}
            renderInput={(params) => (
            <TextField {...params} label="Descarga del Portal" variant="outlined" fullWidth />
            )}
            />
            <AutoComplete
            name="consultingJudicialOrders"
            onChange={(event, newValue) => {
                handleChangeConsulting(newValue);
              }}
            options={optionsSiNo}
            value={consultingJudicialOrders}
            renderInput={(params) => (
            <TextField {...params} label="Consulta de Providencias Judiciales" variant="outlined" fullWidth />
            )}
            />
          </Grid>
        </Grid>
          {/* <StyledButton color="primary" variant="contained" type="submit">
          <Icon>done</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Guardar</Span>
        </StyledButton> */}
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
        <StyledButton color="inherit" variant="contained" type="button" href="/users">
          <Icon>cancel</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Cancelar</Span>
        </StyledButton>
      </ValidatorForm>
            <Snackbar open={openMessage} vertical="top" horizontal="right" autoHideDuration={6000} onClose={handleCloseMessage}>
            <Alert onClose={handleCloseMessage} severity="success" sx={{ width: '100%' }}>
                Guardado con éxito!
            </Alert>
            </Snackbar>
      </Container>
  );
};

export default SimpleForm;