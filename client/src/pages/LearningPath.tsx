import React, { useEffect, useState } from "react";
import axios from "axios";

type DsaTopic = {
  id: number;
  name: string;
  overview: string;
};

export default function LearningPath() {
  const [topics, setTopics] = useState<DsaTopic[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5138/api/dsatopics").then(res => setTopics(res.data));
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
