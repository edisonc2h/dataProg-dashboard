import { Icon, Card, Button } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb } from "app/components";
import UsersSummary from "./UsersSummary";
//import UsersTableData from './UsersTableData';

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

const UsersTable = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Listado", path: "/users" }, { name: "Usuarios" }]} />
      </Box>

      <StyledButton size="small" variant="contained" color="primary" href="/users/new">
        <Icon>add</Icon>
        Nuevo Usuario
        </StyledButton>
      <UsersSummary/>
    </Container>
  );
};

export default UsersTable;
