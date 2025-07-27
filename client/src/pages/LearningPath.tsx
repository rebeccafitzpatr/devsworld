import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as apiBaseUrl } from "../config";
import styles from "../styles/infoPages.module.css";

type DsaTopic = {
  id: number;
  name: string;
  overview: string;
};

export default function LearningPath() {
  const [topics, setTopics] = useState<DsaTopic[]>([]);

  useEffect(() => {
      axios.get(`${apiBaseUrl}/dsatopics`).then(res => setTopics(res.data));
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>DSA Learning Path</h2>
      <ol className={styles.learningList}>
        {topics.map(topic => (
          <li key={topic.id} className={styles.learningItem}>
            <div className={styles.learningItemTitle}>{topic.name}</div>
            <div className={styles.learningItemText}>{topic.overview}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
