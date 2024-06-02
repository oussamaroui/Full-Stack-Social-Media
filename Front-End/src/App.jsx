import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Register from './components/auth/Register.jsx';
import Login from './components/auth/Login.jsx';
import { UserProvider } from './components/UserContext';
import Profile from './components/Profile.jsx';
import NewPost from './components/NewPost.jsx';
import ShowStory from './components/ShowStory.jsx';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/story/:storyId" element={<ShowStory />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
