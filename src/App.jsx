import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignUp from "../src/assets/Pages/SignUp";
import Dashboard from "../src/assets/Pages/dashbord";
import Login from '../src/assets/Pages/Login'





function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on app load
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user && user.token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
      <MantineProvider>
        {
          <Router>
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <Dashboard setIsAuthenticated={setIsAuthenticated} />

                    
                  ) : (<div>
                  
                    <Navigate to="/login" />
                    
              
                  </div>
                  )
                }
              />
              <Route
                path="/"
                element={
                  <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
                }
              />
            </Routes>
          </Router>
        }
      </MantineProvider>
    </>
  );
}

export default App;
