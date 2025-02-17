import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BlogsCard({ username, image, description, title, id, isUser }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert('Blog Deleted');
        //navigate('/my-blogs');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card sx={{ width: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc' }}>
      {isUser && (
        <Box display="flex">
          <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username ? username.charAt(0).toUpperCase() : 'U'}
          </Avatar>
        }
        title={username || 'Unknown Author'}
      />
      <CardMedia component="img" height="194" image={image} alt="Blog Image" />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          Title: {title || 'No Title'}
        </Typography>

        <Box
          sx={{
            maxHeight: '100px',
            overflowY: 'auto',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography variant="body1">
            Description: {description || 'No description available.'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
