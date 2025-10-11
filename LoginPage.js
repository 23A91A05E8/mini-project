import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Handle Login / Signup
  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
      // 🔹 Login
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        localStorage.setItem("loggedInUser", email);
        onLogin(email);
      } else {
        setError("Invalid email or password!");
      }
    } else {
      // 🔹 Signup
      const userExists = users.some((u) => u.email === email);
      if (userExists) {
        setError("User already exists. Please log in.");
        return;
      }
      const newUser = { email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", email);
      onLogin(email);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm text-gray-600">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="hover:text-indigo-600 transition font-medium"
          >
            {isLogin ? "Create an Account" : "Already have an account? Login"}
          </button>
          {isLogin && (
            <button
              onClick={() => alert("Password reset coming soon!")}
              className="hover:text-indigo-600 transition font-medium"
            >
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
