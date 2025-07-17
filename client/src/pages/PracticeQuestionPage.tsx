import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuestionChat } from '../hooks/useQuestionChat.ts';
const apiBaseUrl = process.env.API_URL;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    try {
        const res = await axios.post(`${apiBaseUrl}/practice/attempt`, {
        questionId: question?.id,
        userSolution,
      }, { withCredentials:true });
      setResult(res.data.isCorrect ? 'Correct!' : 'Incorrect. Try again!');
    } catch {
      setResult('Submission failed.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error || !question) return <p>{error || 'Question not found.'}</p>;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>&larr; Back</button>
      <h2>{question.title}</h2>
      <p><strong>Difficulty:</strong> {question.difficulty}</p>
      <p>{question.description}</p>
      <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
        <label>Your Solution:</label>
        <br />
        <textarea
          value={userSolution}
          onChange={e => setUserSolution(e.target.value)}
          rows={5}
          cols={60}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {result && <p style={{ marginTop: 16, color: result === 'Correct!' ? 'green' : 'red' }}>{result}</p>}
      <div>
        <h3>Chat</h3>
        <div>
          {messages.map((msg, index) => (
            <div key={index}><strong>{msg.user}:</strong> {msg.message}</div>
          ))}
        </div>
        <textarea
          rows={2}
          cols={60}
          placeholder="Ask a question about the solution..."
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              const content = (e.target as HTMLTextAreaElement).value;
              sendMessage(content, 'Anonymous');
              (e.target as HTMLTextAreaElement).value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default PracticeQuestionPage;
