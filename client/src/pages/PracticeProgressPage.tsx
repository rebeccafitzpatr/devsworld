import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL as apiBaseUrl } from '../config.ts'; // Adjust the import based on your project structure
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h2>Your Practice Progress</h2>
      {progress ? (
        <ul>
          <li><strong>Attempted:</strong> {progress.attempted}</li>
          <li><strong>Solved:</strong> {progress.solved}</li>
        </ul>
      ) : (
        <p>No progress data found.</p>
      )}
    </div>
  );
};

export default PracticeProgressPage;
