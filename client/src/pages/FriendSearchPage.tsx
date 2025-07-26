// client/src/pages/FriendSearchPage.tsx
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";

export default function FriendSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    // Example: search by username
    const res = await axios.get(`${apiBaseUrl}/friends/search?query=${query}`, { withCredentials: true });
    setResults(res.data);
  };

  const sendRequest = async (userId: string) => {
    try {
      await axios.post(`${apiBaseUrl}/friends/request`, { ReceiverId: userId }, { withCredentials: true });
      setMessage("Friend request sent!");
    } catch {
      setMessage("Failed to send request.");
    }
  };

  return (
    <div>
      <h2>Find Friends</h2>
      <form onSubmit={handleSearch}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by username..." />
        <button type="submit">Search</button>
      </form>
      {results.map(user => (
        <div key={user.id}>
          {user.userName} ({user.email})
          <button onClick={() => sendRequest(user.id)}>Add Friend</button>
        </div>
      ))}
      {message && <div>{message}</div>}
    </div>
  );
}