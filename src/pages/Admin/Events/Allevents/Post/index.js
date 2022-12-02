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
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Attendance from './Attendance'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Post({ eventId, date, description, status, title, venue, images }) { 
     const [posts, setPosts] = useState([])
     const [countReviews, setCountReviews] = useState(0)
     const [countAttendance, setCountAttendance] = useState(0)
     const [show, setShow] = useState(false);
     const [value, setValue] = React.useState(0);
     const [value1, setValue1] = React.useState(0);
     const theme = useTheme();

     const handleClose = () =>{
      setShow(false)
    }

     useEffect(() => {
         db.collection('events').doc(eventId).collection("reviews")
        .onSnapshot(snapshot => (
         setCountReviews(snapshot.docs.length)
        ))
     }, []);
     useEffect(() => {
      db.collection('events').doc(eventId).collection("attendance")
     .onSnapshot(snapshot => (
      setCountAttendance(snapshot.docs.length)
     ))
  }, []);

  useEffect(() => {
    db.collection('events').doc(eventId).collection("reviews").onSnapshot(snapshot => {
          setPosts(snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data(),
          })));
      })
  }, []);

  const totalRatings = (posts.reduce((a,v) =>  a = a + v.post.rating , 0 ))
  const numberOfRatings = posts.length
  const rating = totalRatings / numberOfRatings
  var a = Math.round(rating * 10) / 10

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const closeEvent = () =>{
    try{
      // Set the "capital" field of the city 'DC'
db.collection("events").doc(eventId).update({
status: false,
})
toast.success("Successfully closed the event Registration!")
    }catch(error){
      toast.error("Error @Updating: ",error.message)
    }
}

const openEvent = () =>{
  try{
    // Set the "capital" field of the city 'DC'
db.collection("events").doc(eventId).update({
status: true,
})
toast.success("Successfully opened the event Registration!")
  }catch(error){
    toast.error("Error @Updating: ",error.message)
  }
}

  return (
    <>
    <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell style={{color:'#43a047'}}> 
    {title}        
    </TableCell>

    <TableCell style={{color:'#43a047'}} align='right'>
       {venue}                
    </TableCell>
    <TableCell style={{color:'#43a047'}} align='right'>
      {date}                 
    </TableCell>
    <TableCell style={{color:'#43a047'}} align='right'>
    {numberOfRatings === 0 ?(<>0</>):(<>{a}</>)}/5             
    </TableCell>
    <TableCell style={{color:'#43a047'}} align='right'>
        {countReviews}                
    </TableCell>
    <TableCell style={{color:'#43a047'}} align='right'>
      {countAttendance}                 
    </TableCell>
    <TableCell style={{color:'#43a047'}} align='right'>
     {images.length}                 
   </TableCell>
   <TableCell align='right'>
   {status === true ?(
     <span style={{color:'#43a047',fontWeight:'bold'}}>open</span>
   ):(
     <span style={{color:'#43a047',fontWeight:'bold'}}>closed</span>
   )}
  </TableCell>
   <TableCell align='right'>
      <RemoveRedEyeIcon onClick={() => setShow(true)} fontSize='medium' style={{color:'#43a047',cursor:'pointer'}}/>                
  </TableCell>
 <TableCell align='right'>
 {status === true ?(
  <CloseIcon onClick={closeEvent} fontSize='medium' style={{color:'#43a047',cursor:'pointer'}}/>                
 ):(
  <DoneAllIcon onClick={openEvent} fontSize='medium' style={{color:'#43a047',cursor:'pointer'}}/>                
 )}
 <DeleteForeverIcon fontSize='medium' style={{color:'#43a047',cursor:'pointer'}}/>                
                 
</TableCell>
</TableRow>



<Modal
show={show}
onHide={() => setShow(false)}
dialogClassName="modal-90w"
aria-labelledby="example-custom-modal-styling-title"
style={{maxWidth:'none'}}
>
<Modal.Header style={{display: 'block'}}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div><span style={{color:'#43a047',fontWeight:'bold'}}>General Overview</span></div>
        <div><CloseIcon fontSize="large" onClick={handleClose} style={{color:'#88888888',cursor:'pointer'}}/></div>
      </div>

      <div>
      <AppBar position="static">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Attendance" {...a11yProps(0)} />
        <Tab label="Reviews" {...a11yProps(1)} />
        <Tab label="Gallery" {...a11yProps(2)} />
      </Tabs>
    </AppBar>
      </div>
</Modal.Header>
<Modal.Body
style={{
  height:'70vh',
  overflowY:'auto'
}}
>
<Box sx={{ bgcolor: 'background.paper' }}>
<SwipeableViews
  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
  index={value}
  onChangeIndex={handleChangeIndex}
>
  <TabPanel value={value} index={0} dir={theme.direction}>
     <Attendance eventId={eventId} title={title}/>
   </TabPanel>
  <TabPanel value={value} index={1} dir={theme.direction}>
    Reviews
  </TabPanel>
  <TabPanel value={value} index={2} dir={theme.direction}>
    Gallery
  </TabPanel>
</SwipeableViews>
</Box>
</Modal.Body>
</Modal>
</>
  )
}

export default Post