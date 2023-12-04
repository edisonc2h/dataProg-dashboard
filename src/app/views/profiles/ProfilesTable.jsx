import { Icon, Card, Button } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb } from "app/components";
import UsersSummary from "./ProfilesSummary";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CardRoot = styled(Card)(() => ({
  height: '100%',
  padding: '20px 24px',
}));

const CardTitle = styled('div')(({ subtitle }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
  marginBottom: !subtitle && '16px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ProfilesTable = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Listado", path: "/profiles" }, { name: "Perfiles" }]} />
      </Box>

      <CardRoot elevation={6}>
      <CardTitle>
        <StyledButton size="small" variant="contained" color="primary" href="/profiles/new">
        <Icon>add</Icon>
        Nuevo Perfil
        </StyledButton>
      </CardTitle>
      
      <CardTitle>Lista de Perfiles 
      </CardTitle>
      <UsersSummary />
    </CardRoot>
    </Container>
  );
};

export default ProfilesTable;
