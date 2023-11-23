import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CoinsPage from "./pages/CoinsPage";
import HomePage from "./pages/HomePage";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "./components/Alert";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
            exact
          />
          <Route
            path="/coins/:id"
            element={<CoinsPage />}
          />
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  );
}
