import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import styles from "../styles/infoPages.module.css";
import { useTheme } from "../ThemeContext";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recentFeed, setRecentFeed] = useState<any[]>([]);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    axios.get(`${apiBaseUrl}/profile`, { withCredentials: true })
      .then(res => {
        if (res.data && res.data.userName) {
          setIsAuthenticated(true);
          axios.get(`${apiBaseUrl}/friends/feed`, { withCredentials: true })
            .then(res => {
              const data = Array.isArray(res.data) ? res.data : [];
              setRecentFeed(data.slice(0, 3));
              setCheckedAuth(true);
            })
            .catch(() => {
              setRecentFeed([]);
              setCheckedAuth(true);
            });
        } else {
          setIsAuthenticated(false);
          setRecentFeed([]);
        }
        setCheckedAuth(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setRecentFeed([]);
        setCheckedAuth(true);
      });
  }, []);

  return (
    <div className={styles.pageContainer} data-theme={theme}>
      <h1 className={styles.pageTitle}>Welcome to devsworld</h1>
      <p className={styles.pageText}>
        Your platform for mastering algorithms, connecting with peers, and tracking your progress.
      </p>
      {isAuthenticated ? (
        <div className={styles.homeLinksWrapper}>
          <Link to="/practice" className={styles.homeLinkCard}>
            <span className={styles.homeLinkTitle}>Practice</span>
            <span className={styles.homeLinkDesc}>Solve coding problems and improve your skills</span>
          </Link>
          <Link to="/learningpath" className={styles.homeLinkCard}>
            <span className={styles.homeLinkTitle}>Learning Path</span>
            <span className={styles.homeLinkDesc}>Follow a guided path to learn DSA</span>
          </Link>
          <Link to="/friends" className={styles.homeLinkCard}>
            <span className={styles.homeLinkTitle}>Friends Zone</span>
            <span className={styles.homeLinkDesc}>Connect and interact with other users</span>
          </Link>
          <Link to="/profile" className={styles.homeLinkCard}>
            <span className={styles.homeLinkTitle}>Profile</span>
            <span className={styles.homeLinkDesc}>View and edit your personal info</span>
          </Link>
        </div>
      ) : (
        <div style={{ textAlign: "center", margin: "2.5rem 0 2rem 0", color: "var(--primary)", fontWeight: 500 }}>
          <div style={{ fontSize: "1.15rem", marginBottom: "1.5rem" }}>
            Sign in to access practice, learning paths, friends zone, and your profile!
          </div>
          <Link to="/register" className={styles.linkButton}>Get Started</Link>
          <span style={{ margin: "0 1rem" }}></span>
          <Link to="/login" className={styles.linkButton}>Login</Link>
        </div>
      )}
      {checkedAuth && isAuthenticated && recentFeed.length > 0 && (
        <>
          <h2 style={{ textAlign: "center", margin: "3rem 0 1rem 0" }}>Recent Activity</h2>
          <div>
            {recentFeed.map(item => (
              <div key={item.id} className={styles.homeActivityCard}>
                <div className={styles.homeActivityUser}>{item.userName}</div>
                <div className={styles.homeActivityContent}>{item.content || item.description}</div>
                <span className={styles.homeActivityTime}>
                  {new Date(item.createdAt || item.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
      {checkedAuth && isAuthenticated && recentFeed.length === 0 && (
        <div style={{ textAlign: "center", color: "#888", margin: "2rem 0" }}>
          No recent activity yet.
        </div>
      )}
      {checkedAuth && !isAuthenticated && (
        <div style={{ textAlign: "center", color: "#888", margin: "3rem 0 2rem 0" }}>
          Sign in to view friend's activity.
        </div>
      )}
    </div>
  );
}