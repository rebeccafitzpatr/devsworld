// client/src/pages/FriendsZonePage.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/infoPages.module.css";
import { useTheme } from "../ThemeContext";

export default function FriendsZonePage() {
  const { theme } = useTheme();
  return (
    <div className={styles.pageContainer} data-theme={theme}>
      <h2 className={styles.pageTitle}>Friends & Networking Zone</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        margin: "2.5rem 0 1.5rem 0",
        justifyContent: "center"
      }}>
        <Link to="/friends/search" className={styles.linkButton} style={{ fontSize: "1.25rem", padding: "1.25rem 0", minWidth: "180px", textAlign: "center" }}>Find Friends</Link>
        <Link to="/friends/requests" className={styles.linkButton} style={{ fontSize: "1.25rem", padding: "1.25rem 0", minWidth: "180px", textAlign: "center" }}>Friend Requests</Link>
        <Link to="/friends/list" className={styles.linkButton} style={{ fontSize: "1.25rem", padding: "1.25rem 0", minWidth: "180px", textAlign: "center" }}>Your Friends</Link>
        <Link to="/friends/activity" className={styles.linkButton} style={{ fontSize: "1.25rem", padding: "1.25rem 0", minWidth: "180px", textAlign: "center" }}>Activity Feed</Link>
      </div>
    </div>
  );
}