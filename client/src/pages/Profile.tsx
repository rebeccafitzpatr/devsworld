import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_BASE_URL as apiBaseUrl } from "../config.ts"; // Adjust the import based on your project structure

type UserProfile = {
  userName: string;
  email: string;
  xp: number;
  bio: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bio, setBio] = useState("");
  const [xp, setXp] = useState(0);

  useEffect(() => {
      axios.get(`${apiBaseUrl}/profile`, { withCredentials: true })
      .then(res => {
        setProfile(res.data);
        setBio(res.data.bio);
        setXp(res.data.xp);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      axios.post(`${apiBaseUrl}/profile`, { bio, xp }, { withCredentials: true })
      .then(() => alert("Profile updated!"));
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <h1 className="display-4">Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <span>{profile.userName}</span>
        </div>
        <div>
          <label>Email:</label>
          <span>{profile.email}</span>
        </div>
        <div>
          <label>XP:</label>
          <input
            type="number"
            value={xp}
            onChange={e => setXp(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}