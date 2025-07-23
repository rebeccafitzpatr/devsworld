import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/practice.module.css';
import { API_BASE_URL as apiBaseUrl } from '../config.ts';

interface DsaQuestion {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  solution: string;
}

const PracticeListPage: React.FC = () => {
  const [questions, setQuestions] = useState<DsaQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiBaseUrl}/practice/questions${difficulty ? `?difficulty=${difficulty}` : ''}`, { withCredentials: true })
      .then((res) => {
        setQuestions(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load questions');
        setLoading(false);
      });
  }, [difficulty]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Practice Questions</div>
      <div className={styles.filterGroup}>
        <label>Filter by Difficulty:</label>
        <select
          className={styles.select}
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          <option value="">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      <ul className={styles.questionList}>
        {Array.isArray(questions) && questions.map(q => (
            <li key={q.id} className={styles.questionItem}>
            <div className={styles.questionItemLeft}>
                <span className={styles.questionTitle}>{q.title}</span>
                <span className={styles.difficulty}>{q.difficulty}</span>
            </div>
            <button
              className={styles.solveButton}
              onClick={() => navigate(`/practice/${q.id}`)}
            >
              Solve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PracticeListPage;
