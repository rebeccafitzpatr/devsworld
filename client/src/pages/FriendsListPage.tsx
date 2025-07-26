// client/src/pages/FriendsListPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import { Link } from "react-router-dom";

export default function FriendsListPage() {
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/friends/list`, { withCredentials: true })
      .then(res => setFriends(res.data));
  }, []);

  return (
    <div>
      <h2>Your Friends</h2>
      {friends.map(f => (
        <div key={f.id}>
          {f.userName} ({f.email})
          <Link to={`/friends/profile/${f.id}`}>
            <button>View Profile</button>
          </Link>
          <Link to={`/friends/message/${f.id}`}>
            <button>Message</button>
          </Link>
        </div>
      ))}
    </div>
  );
}