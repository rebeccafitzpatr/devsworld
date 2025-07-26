import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import styles from "../styles/profile.module.css";
import { useTheme } from "../ThemeContext";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/profile`, { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setError("");
    setSuccess("");
    try {
      await axios.post(`${apiBaseUrl}/profile`, profile, {
        withCredentials: true,
      });
      setSuccess("Profile updated successfully");
    } catch {
      setError("Failed to update profile");
    }
  };

  if (loading)
    return <div className={styles.spinnerWrapper}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!profile) return null;

  return (
    <div className={styles.container} data-theme={theme}>
      <div className={styles.card}>
        <div className={styles.avatarWrapper}>
          <img
            src={profile.avatarUrl || "/logo192.png"}
            alt="avatar"
            className={styles.avatar}
          />
          <div className={styles.userName}>{profile.userName}</div>
          <div className={styles.email}>{profile.email}</div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Bio</label>
          <textarea
            className={styles.textarea}
            value={profile.bio || ""}
            onChange={(e) =>
              setProfile({ ...profile, bio: e.target.value })
            }
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>XP</label>
          <input
            className={styles.input}
            type="number"
            value={profile.xp || 0}
            onChange={(e) =>
              setProfile({ ...profile, xp: Number(e.target.value) })
            }
          />
        </div>
        <button className={styles.button} onClick={handleSave}>
          Save
        </button>
        <button
          className={styles.button}
          style={{ marginTop: 8 }}
          onClick={toggleTheme}
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        {success && <div className={styles.success}>{success}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}