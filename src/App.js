import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Main from "./Page/Main";
import Login from "./Page/Login/Login";
import { connect } from "react-redux";
import DashboardRealtime from "./Page/Dashboard-Realtime-Supervisor/DashboardRealtime";
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';


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
        <Route path="/dashboardrealtime" element={<DashboardRealtime />} />

    </Routes>
  </Router>

  );
};

export default connect(mapStateToProps, {
  })(App);
