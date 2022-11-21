import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { toast } from 'react-toastify'
import { Space, Spin } from 'antd';
import { db } from '../../../../../firebase';

const theme = createTheme();

export default function SignUp({ setModalShow }) {
    var currentDate = new Date()
    const [time, setTime] = React.useState(currentDate);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [venue, setVenue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const eventId = db.collection('events').doc().id
    const [images, setImages] = React.useState([])
    const addEvent = () => {
        setLoading(true)
        if(!title){
           toast.error("Title required!")
           setLoading(false)
         }else if(!description){
           toast.error("Description required!")
           setLoading(false)
         }else if(!venue){
           toast.error("Venue required!")
           setLoading(false)
         }else if(time <= Date.now()){
            toast.error("Select date and time ahead!")
            setLoading(false)
          }else{
            db.collection("events").doc(eventId).set({
              eventId,
             title,
             description,
             date:time.toString(),
             venue,
             images,
             status:true,
             timestamp:Date.now()
            })
            .then((r) => {
             toast.success("Event has been added!")
             setLoading(false)
             setTitle("")
             setDescription("")
             setVenue("")
             setTime(Date.now())
             setModalShow(false)
         }) 
         }
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Event
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Title"
                  required
                  fullWidth
                  id="Title"
                  label="Title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="family-name"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="venue"
                  label="Venue"
                  type="venue"
                  id="text"
                  onChange={(e) => setVenue(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
            <Box sx={{ mt: 3, ml: 0 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Date & Time"
              value={time}
              onChange={(newValue) => {
                setTime(newValue);
              }}
            />
          </LocalizationProvider>     
            </Box>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={addEvent}
            >
            {loading === true ?(
                <span><span style={{color:'#fff'}}>Adding...<Spin size="middle" /></span></span>
              ):(
                <span>Add Event</span>
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}