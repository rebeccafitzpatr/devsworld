import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ErrorPage from './pages/Error.tsx';
import Index from './pages/Index.tsx';
import Profile from './pages/Profile.tsx';
import Privacy from './pages/Privacy.tsx';
import LearningPath from './pages/LearningPath.tsx';
import Navbar from './components/Navbar.tsx';
import Login from './pages/Login.tsx';
import PracticeListPage from './pages/PracticeListPage.tsx';
import PracticeQuestionPage from './pages/PracticeQuestionPage.tsx';
import PracticeProgressPage from './pages/PracticeProgressPage.tsx';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/learningpath' element={<LearningPath />} />
        <Route path='/login' element={<Login />} />
         <Route path="/practice" element={<PracticeListPage />} />
        <Route path="/practice/:id" element={<PracticeQuestionPage />} />
        <Route path="/practice-progress" element={<PracticeProgressPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
