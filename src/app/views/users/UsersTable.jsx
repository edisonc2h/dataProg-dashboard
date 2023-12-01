import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import UsersSummary from "./UsersSummary";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const UsersTable = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Listado", path: "/users" }, { name: "Usuarios" }]} />
      </Box>

      <SimpleCard title="Lista de Usuarios">
        <UsersSummary />
      </SimpleCard>
    </Container>
  );
};

export default UsersTable;
