// client/src/pages/DirectMessagePage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_BASE_URL as apiBaseUrl } from "../config.ts";

export default function DirectMessagePage() {
  const { friendId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`${apiBaseUrl}/friends/messages/${friendId}`, { withCredentials: true })
      .then(res => setMessages(res.data));
  }, [friendId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${apiBaseUrl}/friends/message`, { ReceiverId: friendId, Content: content }, { withCredentials: true });
    setMessages([...messages, { senderId: "me", receiverId: friendId, content, sentAt: new Date() }]);
    setContent("");
  };

  return (
    <div>
      <h2>Direct Messages</h2>
      <div>
        {messages.map((m, i) => (
          <div key={i}><b>{m.senderId === friendId ? "Friend" : "You"}:</b> {m.content}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={content} onChange={e => setContent(e.target.value)} placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}