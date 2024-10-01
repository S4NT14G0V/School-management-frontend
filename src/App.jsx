// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import Classes from "./pages/ClassesPage/ClassesPage";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/RegisterPage/RegisterPage"
import Table from "./components/Table/Table";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
