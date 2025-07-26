// client/src/pages/ActivityFeedPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";

export default function ActivityFeedPage() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/friends/activity`, { withCredentials: true })
      .then(res => setActivities(res.data));
  }, []);

  return (
    <div>
      <h2>Friends' Activity Feed</h2>
      {activities.map(a => (
        <div key={a.id}>
          <b>{a.userId}</b>: {a.description} ({a.type}) at {new Date(a.timestamp).toLocaleString()}
        </div>
      ))}
    </div>
  );
}