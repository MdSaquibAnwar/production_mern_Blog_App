
import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { Box,  Button,  InputLabel, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast'


const CreateBlog = () => {
    // Create A varriable for User 
    const UesrId = localStorage.getItem('userId')
    // create navigate varrible
    const navigate =useNavigate();

    // CREATE OBJECT 
    const [inputs, setInputs] =useState({

        title: '',
        description: '',
        image: '',
        user:''
    })
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
        const {data} = await axios.post('api/v1/blog/create-blog',{
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user:UesrId
            
        });
        if(data?.success){
          toast.success('Blog Created')
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
        <Typography variant='h4'  textAlign={"center"} fontWeight={'bold'} padding={3} color='grey'>Create A Post</Typography>
        {/* this label is title container */}
        <InputLabel sx={{mb:1,mt:1,fontSize:'24px', fontWeight:"bold"}}>Title </InputLabel>
        <TextField name='title' value={inputs.title} onChange={handleChange} margin="normal" variant='outlined' required></TextField>
        {/* and this is description container */}
        <InputLabel sx={{mb:1,mt:1,fontSize:'24px', fontWeight:"bold"}}>Description </InputLabel>
        <TextField name='description' value={inputs.description} onChange={handleChange} margin="normal" variant='outlined' required></TextField>
        {/* this label is image container */}
        <InputLabel sx={{mb:1,mt:1,fontSize:'24px', fontWeight:"bold"}}>Image URL</InputLabel>
        <TextField name='image' value={inputs.image} onChange={handleChange} margin="normal" variant='outlined' required></TextField>
        <Button type='sumbit' color='primary' variant='contained' >SUMBIT</Button>


       </Box>

    </form>
    
    </>
  )
}

export default CreateBlog
