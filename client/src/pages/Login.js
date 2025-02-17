import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Box,Typography,TextField,Button} from '@mui/material'
import axios from 'axios'
import {useDispatch} from "react-redux";
import {authAction} from "../redux/store";
import toast from 'react-hot-toast';

const Login = () => {
  // crate navigate 
  const navigate =useNavigate();
  // call the dispatch function
  const dispatch = useDispatch()
  // state
  const [inputs , setInputs] = useState({
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
     const {data} = await  axios.post('/api/v1/user/login',{ email:inputs.email, password:inputs.password});
     if(data.success){
      localStorage.setItem('userId', data?.user._id);
      
      dispatch(authAction.login())
      toast.success("User login Successfuly");
      navigate("/")
     }

  }catch(error){
    console.log(error)
  }

}
  return (
    <>
    <form onSubmit={handleSumbit}>
       <Box maxWidth={450} display={'flex'} flexDirection={'column'} alignItems={'center'} margin={'auto'} marginTop={5} boxShadow={'10px 10px 20px #ccc'} padding={3} borderRadius={5}  >
        <Typography variant='h4' padding={3} textAlign={'center'}>LOGIN</Typography>
        <TextField placeholder='Email' value={inputs.email}  onChange={handleChange} name='email' margin='normal' type='email' required />
        <TextField placeholder='Password' value={inputs.password} onChange={handleChange}  name='password' margin='normal' type='password' required />
        <Button sx={{borderRadius:3,marginTop:3}} type='submit' variant='contained' color='primary'>Submit</Button>
        <Button onClick={() =>navigate("/register")} sx={{borderRadius:3,marginTop:3}} type='submit'  color='primary'>Not a User ? Please Register</Button>
       </Box>
    </form>
    </>
  )
}

export default Login
