import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./form/login";
import Form from "./form/form";
import Home from "./issue/Home";
import AddIssue from "./issue/AddIssued";
import EditIssue from "./issue/EditIssue";
import IssuesList from "./issue/IssuesList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Form />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddIssue />} />
         <Route path="/edit" element={<EditIssue />} />
        <Route path="/issues" element={<IssuesList />} /> 
      </Routes>
    </Router>
  );
};

export default App;
