import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { db } from '../../../../../firebase';
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

function Post({ articleId, description, fileData, fileType, title, ownerId, timestamp }) {
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])

  useEffect(() => {
    db.collection('articles').doc(articleId).collection("comments").onSnapshot((snapshot) => {
      setComments(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  useEffect(() => {
    db.collection('articles').doc(articleId).collection("likes").onSnapshot((snapshot) => {
      setLikes(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  const deleteArticle = () =>{
    if(window.confirm(`Are you sure you want to delete this article:-> ${title}?`)){
        db.collection("articles").doc(articleId).delete().then(function() {
        }).catch(function(error) {
            toast.error("Error removing order: ", error);
        }); 
        toast.success(`Album ${title} has been deleted successfully!`)   
      }
}

  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell > 
        {title}         
        </TableCell>
        <TableCell align='right'> 
        <Link to={`/profile/true/${ownerId}`}>
        <RemoveRedEyeIcon style={{color:'#43a047',cursor:'pointer'}} fontSize='medium'/>              
        </Link> 
        </TableCell>
        <TableCell align='right'>
        {comments.length}                 
        </TableCell>
        <TableCell align='right'>
        {likes.length}                  
        </TableCell>
        <TableCell align='right'>
        <Link to={`/article/true/${articleId}/${ownerId}`}>
        <RemoveRedEyeIcon style={{color:'#43a047',cursor:'pointer'}} fontSize='medium'/>              
        </Link>           
        </TableCell>
        <TableCell align='right'>
        {date.toDateString()}                 
        </TableCell>
        <TableCell align='right'>
         <DeleteForeverIcon onClick={deleteArticle} style={{color:'#43a047',cursor:'pointer'}} fontSize='medium'/>                  
        </TableCell>
  </TableRow>
  )
}

export default Post