import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/profile.module.css";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";

type UserProfile = {
  userName: string;
  email: string;
  xp: number;
  bio: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bio, setBio] = useState("");
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/profile`, { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
        setBio(res.data.bio);
        setXp(res.data.xp);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    axios
      .post(`${apiBaseUrl}/profile`, { bio, xp }, { withCredentials: true })
      .then(() => setSuccess("Profile updated!"))
      .catch(() => setError("Failed to update profile."));
  };

  if (loading)
    return (
      <div className={styles.spinnerWrapper}>
        <div className="spinner-border" />
      </div>
    );
  if (!profile)
    return (
      <div className={styles.spinnerWrapper}>Profile not found.</div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.avatarWrapper}>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile.userName
            )}&background=0D8ABC&color=fff&size=100`}
            alt="avatar"
            className={styles.avatar}
          />
          <div className={styles.userName}>{profile.userName}</div>
          <div className={styles.email}>{profile.email}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>XP</label>
            <input
              type="number"
              className={styles.input}
              value={xp}
              onChange={e => setXp(Number(e.target.value))}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Bio</label>
            <textarea
              className={styles.textarea}
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
            />
          </div>
          {success && <div className={`${styles.alert} ${styles.success}`}>{success}</div>}
          {error && <div className={`${styles.alert} ${styles.error}`}>{error}</div>}
          <button type="submit" className={styles.button}>Save</button>
        </form>
      </div>
    </div>
  );
}