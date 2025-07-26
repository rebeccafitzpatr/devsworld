// client/src/pages/FriendRequestsPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import styles from "../styles/infoPages.module.css";
import { useTheme } from "../ThemeContext";

export default function FriendRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const { theme } = useTheme();

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
    <div className={styles.pageContainer} data-theme={theme}>
      <h2 className={styles.pageTitle}>Friend Requests</h2>
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {requests.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", margin: "2rem 0" }}>
            No friend requests.
          </div>
        ) : (
          requests.map(r => (
            <div key={r.id} className={styles.homeActivityCard} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className={styles.homeActivityUser}>From: {r.senderUserName}</div>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className={styles.linkButton} style={{ fontSize: "1.1rem", padding: "0.75rem 1.5rem" }} onClick={() => respond(r.id, "Accepted")}>Accept</button>
                <button className={styles.linkButton} style={{ fontSize: "1.1rem", padding: "0.75rem 1.5rem" }} onClick={() => respond(r.id, "Declined")}>Decline</button>
              </div>
            </div>
          ))
        )}
      </div>
      {message && <div style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--primary)", fontWeight: 500 }}>{message}</div>}
    </div>
  );
}