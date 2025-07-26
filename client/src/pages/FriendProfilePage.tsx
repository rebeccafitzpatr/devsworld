import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import styles from "../styles/infoPages.module.css";
import { useTheme } from "../ThemeContext";

export default function FriendProfilePage() {
  const { friendId } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    axios.get(`${apiBaseUrl}/friends/profile/${friendId}`, { withCredentials: true })
      .then(res => setProfile(res.data))
      .catch(() => setError("Unable to load profile."));
  }, [friendId]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!profile) return <div className={styles.spinnerWrapper}>Loading...</div>;

  return (
    <div className={styles.pageContainer} data-theme={theme}>
      <h2 className={styles.pageTitle}>{profile.userName}'s Profile</h2>
      <div className={styles.homeActivityCard}>
        <div className={styles.homeActivityUser}><strong>Email:</strong> {profile.email}</div>
        <div className={styles.homeActivityContent}><strong>XP:</strong> {profile.xp}</div>
        <div className={styles.homeActivityContent}><strong>Bio:</strong> {profile.bio}</div>
        <Link to={`/friends/message/${profile.id}`} className={styles.linkButton} style={{ marginTop: "1rem" }}>
          Send Direct Message
        </Link>
      </div>
    </div>
  );
}