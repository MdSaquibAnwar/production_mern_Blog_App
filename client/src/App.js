
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import  { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header/>
      <Toaster />
      <Routes>
        <Route path="/" element={<Blog />}/>
        <Route path="/blogs" element={<Blog />}/>
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="create-blog" element={<CreateBlog/>}/>
      </Routes>
    </>
  );
}

export default App;
