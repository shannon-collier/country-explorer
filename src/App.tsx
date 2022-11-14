import { useQuery } from "@apollo/client";
import { CountryTable } from "./components/CountriesTable";
import { GET_COUNTRIES, GET_COUNTRIES_DATA } from "./graphql/queries";
import {
  CircularProgress,
  Container,
  Paper,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Link,
} from "@mui/material";

function App() {
  const { loading, data, error } = useQuery<GET_COUNTRIES_DATA>(GET_COUNTRIES);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "grey.200", height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Explore Countries</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper
          sx={{
            // Fixed height for the DataGrid
            height: 600,
            marginBlock: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : data ? (
            <CountryTable countries={data.countries} />
          ) : (
            <Typography color="warning.main">{error?.message}</Typography>
          )}
        </Paper>
        <Typography
          color="text.secondary"
          sx={{ ml: 2 }}
          gutterBottom
          variant="body2"
        >
          Data courtesy of the{" "}
          <Link href="https://github.com/trevorblades/countries">
            GraphQL Countries API
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default App;
