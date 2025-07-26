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
import Register from './pages/Register.tsx';
import FriendSearchPage from './pages/FriendSearchPage.tsx';
import FriendRequestsPage from './pages/FriendRequestsPage.tsx';
import FriendsListPage from './pages/FriendsListPage.tsx';
import DirectMessagePage from './pages/DirectMessagePage.tsx';
import ActivityFeedPage from './pages/ActivityFeedPage.tsx';
import FriendsZonePage from './pages/FriendsZonePage.tsx';
import FriendProfilePage from './pages/FriendProfilePage.tsx';
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
