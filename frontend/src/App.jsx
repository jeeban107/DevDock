import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Editor from "./pages/Editior";
import About from "./pages/About";
import Service from "./pages/Service";
import CollabHome from "./pages/CollabHome";
import CollabEditor from "./pages/CollabEditor";

// Protected Route component - only accessible when logged in
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Public Route component - redirect to Home if already logged in
const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Root route - Redirect based on auth status */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public routes - accessible when not logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Semi-public routes - accessible without login */}
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />

        {/* Protected routes - require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/editor/:projectID" element={<Editor />} />
          <Route path="/collabhome" element={<CollabHome />} />
          <Route path="/collabeditor/:roomId" element={<CollabEditor />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
