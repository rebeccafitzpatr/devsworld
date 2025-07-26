// client/src/pages/FriendsListPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import { Link } from "react-router-dom";
import styles from "../styles/infoPages.module.css";
import { useTheme } from "../ThemeContext";

export default function FriendsListPage() {
  const [friends, setFriends] = useState<any[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    axios.get(`${apiBaseUrl}/friends/list`, { withCredentials: true })
      .then(res => setFriends(res.data));
  }, []);

  return (
    <div className={styles.pageContainer} data-theme={theme}>
      <h2 className={styles.pageTitle}>Your Friends</h2>
      {friends.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888", margin: "2rem 0" }}>
          You have no friends yet.
        </div>
      ) : (
        friends.map(f => (
          <div key={f.id} className={styles.homeActivityCard}>
            <div className={styles.homeActivityUser}>{f.userName} ({f.email})</div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to={`/friends/profile/${f.id}`} className={styles.linkButton}>View Profile</Link>
              <Link to={`/friends/message/${f.id}`} className={styles.linkButton}>Message</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}