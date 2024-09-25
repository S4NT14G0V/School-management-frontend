// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import Classes from "./pages/ClassesPage/ClassesPage";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
