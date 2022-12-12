import React from 'react';
import './App.css';
import SideMenu from "../components/SideMenu";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Users from "../pages/Users/Users";
import ShiftAndPayment from "../pages/Users/ShiftAndPayment";
import { BrowserRouter, Route, Routes} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SideMenu />

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<div className={classes.appMain}>
       
            <Users />
          </div>} />
          <Route path="/Dashboard" element={<ShiftAndPayment/>} />

        </Routes>
      </BrowserRouter>
      <CssBaseline />
    </ThemeProvider>

  );
}

export default App;
