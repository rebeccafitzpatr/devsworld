import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const registerData = { UserName: userName, Email: email, Password: password };
      const response = await axios.post(
        `${apiBaseUrl}/auth/register`,
        registerData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setSuccess("Registration successful! You can now log in.");
        setError("");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input value={userName} onChange={e => setUserName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div style={{color: "red"}}>{error}</div>}
        {success && <div style={{color: "green"}}>{success}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}