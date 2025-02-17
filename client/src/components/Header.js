import React,{useState} from 'react'
import {Box, AppBar,Toolbar,Button, Typography,Tabs,Tab} from  '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { authAction } from '../redux/store';
import toast from 'react-hot-toast';

function Header() {
  // global state
  let isLogin = useSelector((state) => state.auth.isLogin);
  isLogin =  isLogin || localStorage.getItem('userId');
  const dispatch = useDispatch()
  // navigate veriable 
  const navigate = useNavigate();
  
  // state
  const [value,setvalue]  = useState()
  // Logout function
  const hnadleLogout =()=>{
    try{
      dispatch(authAction.logout())
      toast.success("logout successfully")
      navigate("/login")
      localStorage.clear();
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div>
     <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h4'>
                My Blog App
            </Typography>
            {isLogin && (
              <Box sx={'flex'} marginLeft='auto' marginRight={'auto'}>
                <Tabs textColor='inherit' value={value} onChange={(e,val)=>{ setvalue(val)}}>
                <Tab  label="Blogs" LinkComponent={Link}  to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs"/>
                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog"/> 
                </Tabs>
              </Box>
            )}
            <Box display={'flex'} marginLeft="auto">
              {!isLogin &&(<>
                <Button sx={{margin:1, color:'white'}} LinkComponent={Link} to="/login">Login</Button>
                <Button sx={{margin:1, color:'white'}} LinkComponent={Link} to="/register">Register</Button>
              </>)}
              {isLogin && (
                <Button onClick={hnadleLogout} sx={{margin:1, color:'white'}}>LogOut</Button>
              )}

            </Box>

        </Toolbar>
     </AppBar>
      
    </div>
  )
}

export default Header
