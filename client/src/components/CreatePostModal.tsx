import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";

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
      <button onClick={() => setShow(true)} style={{ marginBottom: "1rem" }}>
        Create Post
      </button>
      {show && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "1rem",
            minWidth: 300,
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
          }}>
            <h3>Create a Post</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={4}
                style={{ width: "100%", marginBottom: "1rem" }}
                placeholder="What's on your mind?"
                required
              />
              {error && <div style={{ color: "red", marginBottom: "0.5rem" }}>{error}</div>}
              {success && <div style={{ color: "green", marginBottom: "0.5rem" }}>{success}</div>}
              <button type="submit" disabled={loading} style={{ marginRight: "1rem" }}>
                {loading ? "Posting..." : "Post"}
              </button>
              <button type="button" onClick={() => setShow(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
