// this is another it use for debugging 
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BlogsCard from '../components/BlogsCard'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
const Blog = () => {
  const [blogs, setBlogs] = useState([])

  // get blogs
  const getAllBlogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/blog/all-blog`)
      const data = response.data
      if (data?.success) {
        setBlogs(data?.blogs)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBlogs()
  }, [])

  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogsCard
            key={blog._id}
            id={blog._id} // Adding a unique key prop
            isUser={blog.user ? localStorage.getItem('userId')===blog.user._id:false}
           
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog.user ? blog.user.username : 'Unknown User'}
            time={blog.createdAt}
            
          />
        ))}
        
    </div>
  )
}

export default Blog


