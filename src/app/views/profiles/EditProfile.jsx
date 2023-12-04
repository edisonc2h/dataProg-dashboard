import {
  Button,
  Grid,
  Icon,
  styled,
  Box
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from 'axios.js'
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
 
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
  const {id} = useParams();
  const [state, setState] = useState({
    id: id,
    username: '',
    documentNumber: '',
    name: '',
    lastname: '',
    email: '',
    status: '',
    financialInstitution: '',
    portalDownload: '',
    consultingJudicialOrders: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() =>{
    axios.get('http://127.0.0.1/api/profile/' + id)
    .then(res => {
      console.log(res)
      setState({...state, code: res.data.code, description: res.data.description});
    })
    .catch()
  }, [])

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log(state)
        await axios.put('http://127.0.0.1/api/profile/' + id, state)
        setLoading(false);
        navigate('/profiles');
    } catch (e) {
      setLoading(false);
      //setOpenMessage(true);
    }
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const {
    code,
    description
  } = state;

  return (
    <Container>

        <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Perfiles", path: "/profiles" }, { name: "Editar" }]} />
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
      </Container>
  );
};

export default SimpleForm;