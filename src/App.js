import { ApolloProvider } from "@apollo/client";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { client } from "./utils/apollo";
import MovieListPage from "./pages/MovieListPage";

const theme = createMuiTheme();

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <MovieListPage />
        <CssBaseline />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
