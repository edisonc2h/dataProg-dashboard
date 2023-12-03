import { Fab, Icon, Card } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb } from "app/components";
import UsersSummary from "./UsersSummary";

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

const UsersTable = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Listado", path: "/users" }, { name: "Usuarios" }]} />
      </Box>

      <CardRoot elevation={6}>
      <CardTitle>Lista de Usuarios 
      <Fab size="small" color="primary" aria-label="Add" className="button" href="/users/new">
          <Icon>add</Icon>
        </Fab> 
      </CardTitle>
      <UsersSummary />
    </CardRoot>

      {/* <SimpleCard title="Lista de Usuarios">
        <UsersSummary />
      </SimpleCard> */}
    </Container>
  );
};

export default UsersTable;
