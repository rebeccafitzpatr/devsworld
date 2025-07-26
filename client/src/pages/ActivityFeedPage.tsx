import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import CreatePostModal from "../components/CreatePostModal.tsx";
import styles from "../styles/activityFeed.module.css";

function getTypeClass(type: string) {
  switch (type) {
    case "post": return styles.feedTypePost;
    case "SolvedQuestion": return styles.feedTypeSolved;
    case "AttemptedQuestion": return styles.feedTypeAttempted;
    case "SentMessage": return styles.feedTypeMessage;
    default: return styles.feedTypeDefault;
  }
}

export default function ActivityFeedPage() {
  const [items, setItems] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<{ id: string, userName: string } | null>(null);

  const fetchFeed = async () => {
    const [postsRes, activitiesRes] = await Promise.all([
      axios.get(`${apiBaseUrl}/friends/feed`, { withCredentials: true }),
      axios.get(`${apiBaseUrl}/friends/activity`, { withCredentials: true })
    ]);
    const posts = postsRes.data.map((p: any) => ({ ...p, _feedType: "post" }));
    const activities = activitiesRes.data.map((a: any) => ({ ...a, _feedType: "activity" }));
    const merged = [...posts, ...activities].sort((a, b) => {
      const aDate = a._feedType === "post" ? new Date(a.createdAt) : new Date(a.timestamp);
      const bDate = b._feedType === "post" ? new Date(b.createdAt) : new Date(b.timestamp);
      return bDate.getTime() - aDate.getTime();
    });
    setItems(merged);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/profile`, { withCredentials: true })
      .then(res => setCurrentUser({ id: res.data.id, userName: res.data.userName }));
  }, []);

  return (
    <div className={styles.feedContainer}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Friends' Activity Feed</h2>
      <CreatePostModal onPostCreated={fetchFeed} />
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          className={`${styles.feedItem} ${item._feedType === "post" ? styles.postItem : styles.activityItem}`}
        >
          <div className={styles.feedHeader}>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.userName)}&background=0D8ABC&color=fff&size=40`}
              alt="avatar"
              className={styles.avatar}
            />
            <span className={styles.userName}>
              {currentUser && item.userId === currentUser.id ? "You" : item.userName}
            </span>
            <span className={getTypeClass(item._feedType === "post" ? "post" : item.type)} style={{ marginLeft: "1rem" }}>
              {item._feedType === "post" ? "Post" : item.type}
            </span>
          </div>
          <div className={styles.feedContent}>
            {item._feedType === "post"
              ? <span>{item.content}</span>
              : <span><i className="fa fa-bolt" style={{ marginRight: 4 }} />{item.description}</span>}
          </div>
          <div className={styles.feedTimestamp}>
            {new Date(item._feedType === "post" ? item.createdAt : item.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}