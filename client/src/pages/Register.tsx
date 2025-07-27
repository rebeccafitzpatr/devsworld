import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/signin.module.css";
import { API_BASE_URL as apiBaseUrl } from "../config";

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
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>Register</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <div className={`${styles.alert} ${styles.error}`}>{error}</div>}
          {success && <div className={`${styles.alert} ${styles.success}`}>{success}</div>}
          <button type="submit" className={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
}