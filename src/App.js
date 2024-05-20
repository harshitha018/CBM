import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Main from "./Page/Main";
import Login from "./Page/Login/Login";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    auth: data.auth,
  };
};

const App = () => {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Main />} />
    </Routes>
  </Router>

  );
};

export default connect(mapStateToProps, {
  })(App);
