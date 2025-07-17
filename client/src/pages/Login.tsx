import React, { useState } from "react";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_URL;

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await axios.post(`${apiBaseUrl}/api/auth/login`, { userName, password }, { withCredentials: true });
      window.location.href = "/";
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input value={userName} onChange={e => setUserName(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div style={{color: "red"}}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}