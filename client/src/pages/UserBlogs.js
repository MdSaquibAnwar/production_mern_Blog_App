import React,{useState,useEffect} from 'react'
import axios from 'axios'
import BlogsCard from '../components/BlogsCard';
import { Box, Typography } from '@mui/material'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
const UserBlogs =  () => {
    const [blogs ,setBlogs] = useState([]);
    // get user blogs 
    const getUserBlogs = async ()=>{
      
       try{
            const id = localStorage.getItem("userId");
            const {data} = await axios.get(`${API_BASE_URL}/api/v1/blog/user-blog/${id}`)
            if(data?.success){
              setBlogs(data?.userBLog.blogs)
             }
       }catch(error){
        console.log(error)
       }

    };
    useEffect(()=>{
        getUserBlogs();
    },[])
  return (
    <div>
    {blogs && blogs.length > 0 ? ( blogs.map((blog) => (
        <BlogsCard
          id={blog._id} // Adding a unique key prop
          isUser={true}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          username={blog.user.username}
          time={blog.createdAt}
        />
      ))) : (<Box
      sx={{
        height: '100vh',         
        display: 'flex',   
        justifyContent: 'center',
        alignItems: 'center', 
        textAlign: 'center',      
        backgroundColor: '#f9f9f9',
        border: '2px solid #007bff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '2rem', color: '#333' }}>
        You have not created a blog
      </Typography>
    </Box>)
     }
  </div>
  )
}

export default UserBlogs
