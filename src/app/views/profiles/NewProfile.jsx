import {
  Button,
  Grid,
  Icon,
  styled,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useState, forwardRef } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from 'axios.js'
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {menu_items} from 'app/menu';

const AppButtonRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  '& .formControl': { margin: theme.spacing(2) },
}));

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

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }));

const SimpleForm = () => {
  const [state, setState] = useState({code: '', description: ''});
  const [menu, setMenu] = useState(menu_items);
  const [openMessage, setOpenMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    setLoading(true);
    state.menu = menu;
    try {
        await axios.post('http://127.0.0.1/api/profile', state)
        setLoading(false);
        setOpenMessage(true);
        navigate('/profiles');
    } catch (e) {
        console.log(e)
        setLoading(false);
    }
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChangeMenu = (item) => (event) => {
    item.selected = event.target.checked
    setMenu({ ...menu, item });
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessage(false);
  };

  const {
    code,
    description
  } = state;

  return (
    <Container>

        <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Listado", path: "/profiles" }, { name: "Nuevo" }]} />
        </Box>

      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="code"
              value={code || ""}
              onChange={handleChange}
              errorMessages={["Campo obligatorio"]}
              label="Código (Min length 4, Max length 15)"
              validators={["required", "minStringLength: 4", "maxStringLength: 15"]}
            />

            <TextField
              type="text"
              name="description"
              label="Descripción"
              onChange={handleChange}
              value={description || ""}
              validators={["required"]}
              errorMessages={["Campo obligatorio"]}
            />

          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <FormControl component="fieldset" className="formControl">
            <FormLabel component="legend">Menú</FormLabel>
            <FormGroup>
                {menu_items.map((item, index) => (
                <FormControlLabel
                control={<Checkbox checked={item.selected} onChange={handleChangeMenu(item)} value="item" />}
                label={item.name} key={index}
                />
              ))}
            </FormGroup>
          </FormControl>
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
        <StyledButton color="inherit" variant="contained" type="button" href="/profiles">
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