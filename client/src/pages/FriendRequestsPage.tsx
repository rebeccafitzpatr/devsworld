// client/src/pages/FriendRequestsPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";

export default function FriendRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`${apiBaseUrl}/friends/requests`, { withCredentials: true })
      .then(res => setRequests(res.data));
  }, []);

  const respond = async (requestId: number, response: string) => {
    try {
      await axios.post(`${apiBaseUrl}/friends/respond`, { RequestId: requestId, Response: response }, { withCredentials: true });
      setMessage("Response sent!");
      setRequests(requests.filter(r => r.id !== requestId));
    } catch {
      setMessage("Failed to respond.");
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      {requests.map(r => (
        <div key={r.id}>
          From: {r.senderUserName}
          <button onClick={() => respond(r.id, "Accepted")}>Accept</button>
          <button onClick={() => respond(r.id, "Declined")}>Decline</button>
        </div>
      ))}
      {message && <div>{message}</div>}
    </div>
  );
}