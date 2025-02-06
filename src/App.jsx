import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Home";
import AddIssue from "./issue/AddIssued";
import EditIssue from "../edit";
import IssuesList from "./issue/IssuesList";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddIssue />} />
        <Route path="/edit" element={<EditIssue />} />
        <Route path="/issues" element={<IssuesList />} />
      </Routes>
    </Router>
  );
};

export default App;
