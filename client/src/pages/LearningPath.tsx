import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_BASE_URL as apiBaseUrl } from "../config.ts"; // Adjust the import based on your project structure
type DsaTopic = {
  id: number;
  name: string;
  overview: string;
};

export default function LearningPath() {
  const [topics, setTopics] = useState<DsaTopic[]>([]);

  useEffect(() => {
      axios.get(`${apiBaseUrl}/api/dsatopics`).then(res => setTopics(res.data));
  }, []);

  return (
    <div>
      <h2>DSA Learning Path</h2>
      <ol>
        {topics.map(topic => (
          <li key={topic.id}>
            <h3>{topic.name}</h3>
            <p>{topic.overview}</p>
           
          </li>
        ))}
      </ol>
    </div>
  );
  }
