import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import ProfilesSummary from "./ProfilesSummary";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const ProfilesTable = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Listado", path: "/profiles" }, { name: "Perfiles" }]} />
      </Box>

      <SimpleCard title="Lista de Perfiles">
        <ProfilesSummary />
      </SimpleCard>
    </Container>
  );
};

export default ProfilesTable;
