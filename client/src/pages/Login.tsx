import React, { useState } from "react";
import axios from "axios";

import { API_BASE_URL as apiBaseUrl } from "../config.ts"; // Adjust the import based on your project structure

interface LoginDto {
    userName: string;
    password: string;
}

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const loginData: LoginDto = { userName, password };
        await axios.post(`${apiBaseUrl}/auth/login`, loginData, { 
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = "/";
    } catch (error) {
        console.error('Login error:', error);
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