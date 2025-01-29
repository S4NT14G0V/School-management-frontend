import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@pages/LoginPage/LoginPage";
import Classes from "@pages/ClassesPage/ClassesPage";
import { UserProvider } from "@context/userContext";
import ProtectedRoute from "@routes/ProtectedRoute";
import Register from "@pages/RegisterPage/RegisterPage";
import AdminPage from "@pages/AdminPage/AdminPage";
import AdminSubject from "@pages/AdminPage/AdminSubject";
import AdminClasses from "@pages/AdminPage/AdminClasses";
import AdminGroups from "@pages/AdminPage/AdminGroups";
import AdminFamily from "@pages/AdminPage/AdminFamily";
import ClassesSubject from "@pages/ClassesPage/ClassesSubject";
import PageLayout from "@layouts/PageLayout";
import Assesments from "@pages/AssesmentsPage/AssesmentPage";
import Califications from "@pages/CalificationsPage/CalificationsPage";
import Attendances from "@pages/AttendancesPage/AttendancesPage";
import { ROLES } from "@config/constants";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Ruta de Login que no usa el layout */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas que utilizan el PageLayout */}
          <Route>
            <Route
              path="/classes"
              element={
                <ProtectedRoute>
                  <PageLayout>
                    <Classes />
                  </PageLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute role={ROLES.Admin}>
                  <PageLayout>
                    <AdminPage />
                  </PageLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/subjects"
              element={
                <ProtectedRoute role={ROLES.Admin}>
                  <PageLayout>
                    <AdminSubject />
                  </PageLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/classes"
              element={
                <ProtectedRoute role={ROLES.Admin}>
                  <PageLayout>
                    <AdminClasses />
                  </PageLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/groups"
              element={
                <ProtectedRoute role={ROLES.Admin}>
                  <PageLayout>
                    <AdminGroups />
                  </PageLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/family"
              element={
                <ProtectedRoute role={ROLES.Admin}>
                  <PageLayout>
                    <AdminFamily />
                  </PageLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/classes/:id"
              element={
                <ProtectedRoute>
                  <PageLayout>
                    <ClassesSubject />
                  </PageLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/assesments"
              element={
                <ProtectedRoute>
                  <PageLayout>
                    <Assesments />
                  </PageLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/califications"
              element={
                <ProtectedRoute>
                  <PageLayout>
                    <Califications />
                  </PageLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendances"
              element={
                <ProtectedRoute>
                  <PageLayout>
                    <Attendances />
                  </PageLayout>
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
