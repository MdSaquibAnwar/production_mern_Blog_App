import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import { Box, Typography,InputLabel,TextField,Button} from '@mui/material'
import toast from 'react-hot-toast'

const BlogDetails = () => {
    // Navigatevariable  variable 
    const navigate = useNavigate();
    const [blog , setBlogs] = useState({})
    const id= useParams().id;
    console.log(id)
    // CREATE OBJECT
     const [inputs, setInputs] =useState({ 
          
        })
    // BLOGS DETAILS
    const getBlogDetails = async() =>{

     try{
        const {data}= await axios.get(`/api/v1/blog/get-blog/${id}`)
        if(data?.success){
           setBlogs(data?.blog);                
           setInputs({
               title: data?.blog.title,
               description:data?.blog.description,
               image:data?.blog.image,
           });
        }

     }catch(error){
        console.log(error)
     }
    }
    
    useEffect(() =>{
        getBlogDetails();

    },[id]);

        // input change 
        const handleChange =(e) =>{
            setInputs(prevState =>({
                ...prevState,
                [e.target.name]:e.target.value
            }))
        }
    
        // FORM FOR CREATE BLOGS 
    
        const handleSubmit = async (e)=>{
          e.preventDefault()
          try{
            const {data} = await axios.put(`/api/v1/blog/update-blog/${id}`,{
                title:inputs.title,
                description:inputs.description,
                image:inputs.image,
                user:id,
                
            });
            if(data?.success){
              toast.success('Blog Updated')
              navigate('/my-blogs')
            }
            
          }catch(error){
            console.log(error)
          }
        }
    
  return (
    <>
      <form onSubmit={handleSubmit}>
       <Box  maxWidth={'50%'} border={3} borderRadius={10} padding={3} margin="auto" boxShadow={'10px 10px 20px #ccc '} display="flex" flexDirection={'column'} marginTop={'20px'}>
        <Typography variant='h4'  textAlign={"center"} fontWeight={'bold'} padding={3} color='grey'>Update A Post</Typography>
        {/* this label is title container */}
        <InputLabel sx={{mb:1,mt:1,fontSize:'24px', fontWeight:"bold"}}>Title </InputLabel>
        <TextField name='title' value={inputs.title} onChange={handleChange} margin="normal" variant='outlined' required></TextField>
        {/* and this is description container */}
        <InputLabel sx={{mb:1,mt:1,fontSize:'24px', fontWeight:"bold"}}>Description </InputLabel>
        <TextField name='description' value={inputs.description} onChange={handleChange} margin="normal" variant='outlined' required></TextField>
        {/* this label is image container */}
        <InputLabel sx={{mb:1,mt:1,fontSize:'24px', fontWeight:"bold"}}>Image URL</InputLabel>
        <TextField name='image' value={inputs.image} onChange={handleChange} margin="normal" variant='outlined' required></TextField>
        <Button type='sumbit' color='warning' variant='contained' >UPDATE</Button>


       </Box>

    </form>
    </>
  )
}

export default BlogDetails
