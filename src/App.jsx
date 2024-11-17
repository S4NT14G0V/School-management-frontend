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
import AdminFamily from "./pages/AdminPage/AdminFamily";
import ClassesSubject from "./pages/ClassesPage/ClassesSubject";
import PageLayout from "./layouts/PageLayout";
import Assesments from "./pages/AssesmentsPage/AssesmentPage";
import Califications from "./pages/CalificationsPage/CalificationsPage";
import Attendances from "./pages/AttendancesPage/AttendancesPage";

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
            <Route path="/classes" element={<Classes />} />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/subjects"
              element={
                <ProtectedRoute>
                  <AdminSubject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/classes"
              element={
                <ProtectedRoute>
                  <AdminClasses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/groups"
              element={
                <ProtectedRoute>
                  <AdminGroups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/family"
              element={
                <ProtectedRoute>
                  <AdminFamily />
                </ProtectedRoute>
              }
            />
            <Route path="/classes/:id" element={<ClassesSubject />} />
            <Route path="/assesments" element={<Assesments />} />
            <Route path="/califications" element={<Califications />} />
            <Route path="/attendances" element={<Attendances />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
