// client/src/pages/FriendsZonePage.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function FriendsZonePage() {
  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: "1rem", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
      <h2>Friends & Networking Zone</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/friends/search">Find Friends</Link></li>
        <li><Link to="/friends/requests">Friend Requests</Link></li>
        <li><Link to="/friends/list">Your Friends</Link></li>
        <li><Link to="/friends/activity">Activity Feed</Link></li>
        {/* Direct messaging is usually accessed from the friends list, but you can add a link if you want */}
      </ul>
    </div>
  );
}