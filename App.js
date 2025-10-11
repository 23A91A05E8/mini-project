import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import ExactImageSearch from "./ExactImageSearch";

export default function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage when the app starts
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // 🔹 Login
  const handleLogin = (email) => {
    localStorage.setItem("loggedInUser", email);
    setUser(email);
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  // 🔹 Delete Account
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const userEmail = localStorage.getItem("loggedInUser");
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Remove this user
      users = users.filter((u) => u.email !== userEmail);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("loggedInUser");

      alert("Account deleted successfully!");
      setUser(null);
    }
  };

  return (
    <>
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <ExactImageSearch
          user={user}
          onLogout={handleLogout}
          onDelete={handleDeleteAccount}
        />
      )}
    </>
  );
}
