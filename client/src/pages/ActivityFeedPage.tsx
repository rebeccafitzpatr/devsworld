import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import CreatePostModal from "../components/CreatePostModal.tsx";

export default function ActivityFeedPage() {
  const [items, setItems] = useState<any[]>([]);

  const fetchFeed = async () => {
    const [postsRes, activitiesRes] = await Promise.all([
      axios.get(`${apiBaseUrl}/friends/feed`, { withCredentials: true }),
      axios.get(`${apiBaseUrl}/friends/activity`, { withCredentials: true })
    ]);
    // Add a type to distinguish
    const posts = postsRes.data.map((p: any) => ({ ...p, _feedType: "post" }));
    const activities = activitiesRes.data.map((a: any) => ({ ...a, _feedType: "activity" }));
    // Merge and sort by date (createdAt for posts, timestamp for activities)
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

  return (
    <div>
      <h2>Friends' Activity Feed</h2>
      <CreatePostModal onPostCreated={fetchFeed} />
      {items.map((item, idx) => (
        <div key={item.id || idx} style={{ marginBottom: "1rem" }}>
          {item._feedType === "post" ? (
            <div>
              <b>{item.userId}</b>: {item.content} <span style={{ color: "#888" }}>{new Date(item.createdAt).toLocaleString()}</span>
            </div>
          ) : (
            <div>
              <b>{item.userId}</b>: {item.description} ({item.type}) <span style={{ color: "#888" }}>{new Date(item.timestamp).toLocaleString()}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}