// client/src/pages/FriendSearchPage.tsx
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import styles from "../styles/infoPages.module.css";
import { useTheme } from "../ThemeContext";

export default function FriendSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const { theme } = useTheme();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await axios.get(`${apiBaseUrl}/friends/search?query=${query}`, { withCredentials: true });
    setResults(res.data);
  };

  const sendRequest = async (userId: string) => {
    try {
      await axios.post(`${apiBaseUrl}/friends/request`, { ReceiverId: userId }, { withCredentials: true });
      setMessage("Friend request sent!");
    } catch {
      setMessage("Failed to send request.");
    }
  };

  return (
    <div className={styles.pageContainer} data-theme={theme}>
      <h2 className={styles.pageTitle}>Find Friends</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by username..."
          className={styles.input}
          style={{ minWidth: "220px", fontSize: "1.1rem" }}
        />
        <button type="submit" className={styles.linkButton} style={{ fontSize: "1.1rem", padding: "0.75rem 2rem" }}>Search</button>
      </form>
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {results.map(user => (
          <div key={user.id} className={styles.homeActivityCard} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className={styles.homeActivityUser}>{user.userName}</div>
              <div className={styles.homeActivityContent}>{user.email}</div>
            </div>
            <button className={styles.linkButton} style={{ fontSize: "1.1rem", padding: "0.75rem 1.5rem" }} onClick={() => sendRequest(user.id)}>Add Friend</button>
          </div>
        ))}
      </div>
      {message && <div style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--primary)", fontWeight: 500 }}>{message}</div>}
    </div>
  );
}