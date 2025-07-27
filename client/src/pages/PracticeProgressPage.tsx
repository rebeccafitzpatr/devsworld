import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/practice.module.css';
import { API_BASE_URL as apiBaseUrl } from '../config';

interface UserProgressDto {
  attempted: number;
  solved: number;
}

const PracticeProgressPage: React.FC = () => {
  const [progress, setProgress] = useState<UserProgressDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiBaseUrl}/practice/progress`, { withCredentials: true })
      .then(res => {
        setProgress(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load progress');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>Your Practice Progress</div>
      {progress ? (
        <ul className={styles.progressList}>
          <li className={styles.progressItem}><strong>Attempted:</strong> {progress.attempted}</li>
          <li className={styles.progressItem}><strong>Solved:</strong> {progress.solved}</li>
        </ul>
      ) : (
        <div>No progress data found.</div>
      )}
    </div>
  );
};

export default PracticeProgressPage;
