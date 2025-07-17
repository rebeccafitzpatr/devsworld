import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL as apiBaseUrl } from '../config.ts'; // Adjust the import based on your project structure
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
        console.log('API response:', res.data);
        setQuestions(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load questions');
        setLoading(false);
      });
  }, [difficulty]);

  return (
    <div className="container">
      <h2>Practice Questions</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Filter by Difficulty: </label>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
is        {Array.isArray(questions) && questions.map(q => (
          <li key={q.id} style={{ marginBottom: 12 }}>
            <strong>{q.title}</strong> <span style={{ color: '#888' }}>({q.difficulty})</span>
            <br />
            <button onClick={() => navigate(`/practice/${q.id}`)}>Solve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PracticeListPage;
