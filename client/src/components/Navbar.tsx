import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiBaseUrl}/profile`, { withCredentials: true })
      .then(res => {
        if (res.data && res.data.userName) {
          setIsAuthenticated(true);
          setUserName(res.data.userName);
        } else {
          setIsAuthenticated(false);
          setUserName("");
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUserName("");
      });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${apiBaseUrl}/auth/logout`, {}, { withCredentials: true });
    } catch {}
    setIsAuthenticated(false);
    setUserName("");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link to="/" className={styles.brand}>devsworld</Link>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
        </button>
        <div className={`${styles.links} ${menuOpen || !isMobile ? styles.showMenu : styles.hideMenu}`}>
          <Link to="/" className={styles.link} onClick={() => setMenuOpen(false)}>Home</Link>
          {isAuthenticated && (
            <Link to="/profile" className={styles.link} onClick={() => setMenuOpen(false)}>Profile</Link>
          )}
          <Link to="/privacy" className={styles.link} onClick={() => setMenuOpen(false)}>Privacy</Link>
          <Link to="/learningpath" className={styles.link} onClick={() => setMenuOpen(false)}>Learning Path</Link>
          <Link to="/practice" className={styles.link} onClick={() => setMenuOpen(false)}>Practice</Link>
          <Link to="/practice-progress" className={styles.link} onClick={() => setMenuOpen(false)}>Progress</Link>
          <Link to="/friends" className={styles.link} onClick={() => setMenuOpen(false)}>Friends</Link>
        </div>
      </div>
      <div className={styles.navRight}>
        {!isAuthenticated ? (
          <>
            <Link to="/register" className={styles.linkAuth}>Register</Link>
            <Link to="/login" className={styles.linkAuth}>Login</Link>
          </>
        ) : (
          <>
            {!isMobile && userName && <span className={styles.userName}>Hello, {userName}</span>}
            <button
              onClick={handleLogout}
              className={styles.logoutBtn}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}