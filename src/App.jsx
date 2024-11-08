// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import Classes from "./pages/ClassesPage/ClassesPage";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/RegisterPage/RegisterPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminSubject from "./pages/AdminPage/AdminSubject";
import AdminClasses from "./pages/AdminPage/AdminClasses";
import AdminGroups from "./pages/AdminPage/AdminGroups";
import ClassesSubject from "./pages/ClassesPage/ClassesSubject";
import PageLayout from "./pages/Layouts/PageLayout";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Ruta de Login que no usa el layout */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas que utilizan el PageLayout */}
          <Route element={<PageLayout />}>
            <Route path="/classes" element={<Classes/>} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminSubject"
              element={
                <ProtectedRoute>
                  <AdminSubject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminClasses"
              element={
                <ProtectedRoute>
                  <AdminClasses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/groupsClasses"
              element={
                <ProtectedRoute>
                  <AdminGroups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/classes/:id"
              element={
                <ProtectedRoute>
                  <ClassesSubject />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
