import { Typography } from "@mui/material";
import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Home from './Pages/home';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={<Home />}>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
