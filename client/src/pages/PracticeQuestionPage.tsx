import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuestionChat } from '../hooks/useQuestionChat.ts';
import styles from '../styles/practice.module.css';
import { API_BASE_URL as apiBaseUrl } from '../config.ts';

interface DsaQuestion {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  solution: string;
}

const PracticeQuestionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<DsaQuestion | null>(null);
  const [userSolution, setUserSolution] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const { messages, sendMessage } = useQuestionChat(id);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiBaseUrl}/practice/questions`, { withCredentials: true })
      .then((res) => {
        const found = res.data.find((q: DsaQuestion) => q.id === Number(id));
        setQuestion(found || null);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load question');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/profile`, { withCredentials: true })
      .then(res => setCurrentUser(res.data.userName));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    try {
      const res = await axios.post(`${apiBaseUrl}/practice/attempt`, {
        questionId: question?.id,
        userSolution,
      }, { withCredentials: true });
      setResult(res.data.isCorrect ? 'Correct!' : 'Incorrect. Try again!');
    } catch {
      setResult('Submission failed.');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error || !question) return <div className={styles.error}>{error || 'Question not found.'}</div>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>&larr; Back</button>
      <div className={styles.header}>{question.title}</div>
      <div className={styles.difficulty}><strong>Difficulty:</strong> {question.difficulty}</div>
      <div className={styles.description}>{question.description}</div>
      <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Your Solution:</label>
          <textarea
            className={styles.input}
            value={userSolution}
            onChange={e => setUserSolution(e.target.value)}
            rows={5}
            required
          />
          <button type="submit" className={styles.solveButton}>Submit</button>
        </div>
      </form>
      {result && (
        <div className={result === 'Correct!' ? styles.success : styles.error} style={{ marginTop: 16 }}>
          {result}
        </div>
      )}
      <div className={styles.chatContainer}>
        <h3>Chat</h3>
        <div>
          {messages.map((msg, index) => (
            <div key={index} className={styles.chatMessage}>
              <span className={styles.chatUser}>{msg.user}:</span> {msg.message}
            </div>
          ))}
        </div>
        <textarea
          className={styles.chatInput}
          rows={2}
          placeholder="Ask a question about the solution..."
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              const content = (e.target as HTMLTextAreaElement).value;
              sendMessage(currentUser || 'Anonymous', content);
              (e.target as HTMLTextAreaElement).value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default PracticeQuestionPage;
