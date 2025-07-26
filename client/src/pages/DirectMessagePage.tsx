// client/src/pages/DirectMessagePage.tsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";
import styles from "../styles/infoPages.module.css";
import { useTheme } from "../ThemeContext";

export default function DirectMessagePage() {
  const { friendId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/friends/messages/${friendId}`, { withCredentials: true })
      .then(res => setMessages(res.data));
  }, [friendId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${apiBaseUrl}/friends/message`, { ReceiverId: friendId, Content: content }, { withCredentials: true });
    setMessages([...messages, { senderId: "me", receiverId: friendId, content, sentAt: new Date() }]);
    setContent("");
  };

  return (
    <div className={styles.pageContainer} data-theme={theme}>
      <h2 className={styles.pageTitle}>Direct Messages</h2>
      <div style={{ maxHeight: "350px", overflowY: "auto", marginBottom: "2rem", padding: "1rem", background: "var(--card-bg)", borderRadius: "1rem", boxShadow: "0 1px 4px var(--card-shadow)" }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: m.senderId === friendId ? "row" : "row-reverse",
            alignItems: "flex-end",
            marginBottom: "1rem"
          }}>
            <div style={{
              background: m.senderId === friendId ? "#e7f1ff" : "var(--primary)",
              color: m.senderId === friendId ? "var(--text)" : "#fff",
              borderRadius: "1rem",
              padding: "0.75rem 1.25rem",
              maxWidth: "70%",
              boxShadow: "0 1px 4px var(--card-shadow)",
              fontSize: "1.05rem"
            }}>
              <b>{m.senderId === friendId ? "Friend" : "You"}:</b> {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
          style={{ fontSize: "1.1rem", minWidth: "220px" }}
        />
        <button type="submit" className={styles.linkButton} style={{ fontSize: "1.1rem", padding: "0.75rem 2rem" }}>Send</button>
      </form>
    </div>
  );
}