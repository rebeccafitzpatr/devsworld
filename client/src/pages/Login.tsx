import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/signin.module.css";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const loginData = { UserName: userName, Password: password };
            const response = await axios.post(
                `${apiBaseUrl}/auth/login`,
                loginData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                window.location.href = "/";
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Invalid username or password");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.title}>Login</div>
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
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className={`${styles.alert} ${styles.error}`}>{error}</div>}
                    <button type="submit" className={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
}