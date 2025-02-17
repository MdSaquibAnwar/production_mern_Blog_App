import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Box,Typography,TextField,Button} from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
const Register = () => {
  const navigate =useNavigate()
  // state
  const [inputs , setInputs] = useState({
    username:'',
    email:'',
    password:'',
  });
  // handle input change 
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
// form handle 
const handleSumbit = async(e)=>{
  e.preventDefault()
  try{
     const {data} = await  axios.post(`${API_BASE_URL}/api/v1/user/register`,{username:inputs.username, email:inputs.email, password:inputs.password});
     if(data.success){
      toast.success("User Register Successfuly");
      navigate("/login")
     }

  }catch(error){
    console.log(error)
  }

}
  return (
    <>
    <form onSubmit={handleSumbit}>
       <Box maxWidth={450} display={'flex'} flexDirection={'column'} alignItems={'center'} margin={'auto'} marginTop={5} boxShadow={'10px 10px 20px #ccc'} padding={3} borderRadius={5}  >
        <Typography variant='h4' padding={3} textAlign={'center'}>REGISER</Typography>
        <TextField placeholder='Name' value={inputs.name}  onChange={handleChange}  name='username' margin='normal' type='text' required />
        <TextField placeholder='Email' value={inputs.email}  onChange={handleChange} name='email' margin='normal' type='email' required />
        <TextField placeholder='Password' value={inputs.password} onChange={handleChange}  name='password' margin='normal' type='password' required />
        <Button sx={{borderRadius:3,marginTop:3}} type='submit' variant='contained' color='primary'>Submit</Button>
        <Button onClick={() =>navigate("/login")} sx={{borderRadius:3,marginTop:3}} type='submit'  color='primary'>Already Register ? please Login</Button>
       </Box>
    </form>
    </>
  )
}

export default Register
