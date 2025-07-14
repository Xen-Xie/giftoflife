/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  // Holds the authenticated user (decoded from JWT)
  const [user, setUser] = useState(null);

  // Runs once on component mount to check for existing token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the token and set the user
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        // Invalid token: remove it and clear user state
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  // Called after successful login to save token and set user
  const login = (token) => {
    try {
      const decoded = jwtDecode(token); // Decode JWT to get user info
      localStorage.setItem("token", token); // Store token in localStorage
      setUser(decoded); // Update user state
    } catch (error) {
      console.error("Invalid token", error); // Catch invalid token errors
    }
  };

  // Clears token and logs out the user
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Reset user state
  };

  // Provide user info and auth functions to children components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
