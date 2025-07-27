import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ErrorPage from './pages/Error';
import Index from './pages/Index';
import Profile from './pages/Profile';
import Privacy from './pages/Privacy';
import LearningPath from './pages/LearningPath';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import PracticeListPage from './pages/PracticeListPage';
import PracticeQuestionPage from './pages/PracticeQuestionPage';
import PracticeProgressPage from './pages/PracticeProgressPage';
import Register from './pages/Register';
import FriendSearchPage from './pages/FriendSearchPage';
import FriendRequestsPage from './pages/FriendRequestsPage';
import FriendsListPage from './pages/FriendsListPage';
import DirectMessagePage from './pages/DirectMessagePage';
import ActivityFeedPage from './pages/ActivityFeedPage';
import FriendsZonePage from './pages/FriendsZonePage';
import FriendProfilePage from './pages/FriendProfilePage';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
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
          <Route path="/register" element={<Register />} />
          <Route path="/friends" element={<FriendsZonePage />} />
          <Route path="/friends/search" element={<FriendSearchPage />} />
          <Route path="/friends/requests" element={<FriendRequestsPage />} />
          <Route path="/friends/list" element={<FriendsListPage />} />
          <Route path="/friends/message/:friendId" element={<DirectMessagePage />} />
          <Route path="/friends/activity" element={<ActivityFeedPage />} />
          <Route path="/friends/profile/:friendId" element={<FriendProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
