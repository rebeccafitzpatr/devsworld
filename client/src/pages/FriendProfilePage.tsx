import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";

export default function FriendProfilePage() {
  const { friendId } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${apiBaseUrl}/friends/profile/${friendId}`, { withCredentials: true })
      .then(res => setProfile(res.data))
      .catch(() => setError("Unable to load profile."));
  }, [friendId]);

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
      <h2>{profile.userName}'s Profile</h2>
      <div><strong>Email:</strong> {profile.email}</div>
      <div><strong>XP:</strong> {profile.xp}</div>
      <div><strong>Bio:</strong> {profile.bio}</div>
      <Link to={`/friends/message/${profile.id}`}>
        <button style={{ marginTop: "1rem" }}>Send Direct Message</button>
      </Link>
    </div>
  );
}