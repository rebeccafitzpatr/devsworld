import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config";
import styles from "../styles/activityFeed.module.css";

interface CreatePostModalProps {
  onPostCreated?: () => void;
}

export default function CreatePostModal({ onPostCreated }: CreatePostModalProps) {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();     
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(
        `${apiBaseUrl}/friends/post`,
        content,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );
      setSuccess("Post created!");
      setContent("");
      setShow(false);
      if (onPostCreated) onPostCreated();
    } catch {
      setError("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className={styles.createPostButton}
      >
        <span style={{ marginRight: 8, fontWeight: 600, fontSize: "1.1rem" }}>+</span> Create Post
      </button>
      {show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3 className={styles.modalTitle}>Create a Post</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={4}
                className={styles.modalTextarea}
                placeholder="What's on your mind?"
                required
              />
              {error && <div className={styles.modalError}>{error}</div>}
              {success && <div className={styles.modalSuccess}>{success}</div>}
              <div className={styles.modalActions}>
                <button type="submit" disabled={loading} className={styles.modalSubmit}>
                  {loading ? "Posting..." : "Post"}
                </button>
                <button type="button" onClick={() => setShow(false)} className={styles.modalCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
