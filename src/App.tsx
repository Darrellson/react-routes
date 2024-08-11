import { AppRoutes } from "components/routes/private-routes";
import { ThemeProvider } from "components/theme";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
};

export default App;
