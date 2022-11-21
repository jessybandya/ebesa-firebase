import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { Modal } from 'react-bootstrap'
import Avatar from '@mui/material/Avatar';
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
import { auth, db } from '../../../firebase';
import { Space, Spin } from 'antd';
import { toast } from "react-toastify"


const theme = createTheme();

function Viewevent({ description, title, venue, date, status, eventId }) {
              const [firstName, setFirstName ] = useState('')
              const [lastName, setLastName ] = useState('')
              const [email, setEmail ] = useState('')
              const [department, setDepartment ] = useState('')
              const [phone, setPhone ] = useState('')
              const [year, setYear] = useState('')
              const [modalShow, setModalShow] = useState(false);
              const [currentUser, setCurrentUser]= useState('')
              const [loading, setLoading] = useState(false)
              const [loading2, setLoading2] = useState(false)
              const [regNo, setReg] = useState('')

              React.useEffect(() => {
                db.collection('users').doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
                  setCurrentUser(doc.data());
                });
            }, [])

            const sendDetails = () =>{
               if(auth?.currentUser?.uid){
                authFun()
               }else{
                nonAuthFun()
                setModalShow(true)
               }
            }

            const authFun = () => {
              setLoading(true)
              db.collection("events").doc(eventId).collection("attendance").where("email","==", `${currentUser?.email}`).get().then((resultSnapShot) =>{
                if(resultSnapShot.size == 0){
                    db.collection("events").doc(eventId).collection("attendance").add({
                          firstName:`${currentUser?.firstName}`,
                          lastName:`${currentUser?.lastName}`,
                          email:`${currentUser?.email}`,
                          yos:`${currentUser?.yos}`,
                          timestamp:Date.now(),
                          department:`Environmental & Biosystems Engineering`,
                          phone:`${currentUser?.phone}`, 
                          regNo:`${currentUser?.regNo}`, 
                    })
                    setLoading(false)
                    toast.success("Successfully enrolled for the event.")
                }else{
                  //Already registered
                  toast.warn("You have already registered for the event...", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                  setLoading(false)
                }
              })
            }

            const nonAuthFun = () => {
              setLoading2(true)
              if(!firstName){
                toast.error("First Name required!")
                setLoading2(false)
              }else if(!lastName){
                toast.error("Last Name required!")
                setLoading2(false)
              }else if(!email){
                toast.error("Email required!")
                setLoading2(false)
              }else if(!phone){
                toast.error("Phone No. required!")
                setLoading2(false)
              }else if(!year){
                toast.error("Year required!")
                setLoading2(false)
              }else if(!department){
                toast.error("Department required!")
                setLoading2(false)
              }else{
                db.collection("events").doc(eventId).collection("attendance").where("email","==", email).get().then((resultSnapShot) =>{
                  if(resultSnapShot.size == 0){
                      db.collection("events").doc(eventId).collection("attendance").add({
                            firstName,
                            lastName,
                            email,
                            yos:year,
                            timestamp:Date.now(),
                            department,
                            phone, 
                            regNo, 
                      })
                      setLoading2(false)
                      toast.success("Successfully enrolled for the event.")
                  }else{
                    //Already registered
                    toast.warn("The email you entered already registered for the event...", {
                      position: toast.POSITION.BOTTOM_CENTER
                  })
                    setLoading2(false)
                  }
                })
              }
            }

            

  return (
    <>
    <Paper sx={{ width: '100%' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
        <TableRow>
        <TableCell >
                 <span style={{fontWeight:'bold',fontSize:13}}>TITLE</span> 
            </TableCell>
            <TableCell >
               {title}
            </TableCell>
        </TableRow>

        <TableRow>              
        <TableCell >
                 <span style={{fontWeight:'bold',fontSize:13}}>DESCRIPTION</span> 
            </TableCell>
            <TableCell >
                  {description}
            </TableCell>
        </TableRow>

        <TableRow>              
        <TableCell >
                 <span style={{fontWeight:'bold',fontSize:13}}>VENUE</span> 
            </TableCell>
            <TableCell >
                 {venue}
            </TableCell>
        </TableRow>

        <TableRow>
        <TableCell >
                 <span style={{fontWeight:'bold',fontSize:13}}>DATE & TIME</span> 
            </TableCell>
            <TableCell >
                  {date}
            </TableCell>
        </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
  <center>
   {status === true ?(
    <Button onClick={sendDetails} style={{color:'#fff', marginTop:10}} variant="contained">
    {loading === true ?(
      <span><span style={{color:'#fff'}}>attending...<Spin size="middle" /></span></span>
    ):(
      <span>Attend</span>
    )}
    </Button>
   ):(
    <Button style={{color:'#fff', marginTop:10}} variant="contained">
        Attendance has been closed!
    </Button>
   )}  
  </center>


  <Modal
  show={modalShow}
  style={{zIndex:3000}}
  onHide={() => setModalShow(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
  </Modal.Header>
  <Modal.Body>
     

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Fill Your Details
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="department"
                  label="Department"
                  name="department"
                  autoComplete="family-name"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone No."
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="yos"
                  label="Year Of Study"
                  name="yos"
                  autoComplete="family-name"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="yos"
                label="Registration No. (optional)"
                name="yos"
                autoComplete="family-name"
                value={regNo}
                onChange={e => setReg(e.target.value)}
              />
            </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={nonAuthFun}
            >
            {loading2 === true ?(
              <span><span style={{color:'#fff'}}>sending...<Spin size="middle" /></span></span>
            ):(
              <span>Send</span>
            )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  </Modal.Body>
</Modal>
  </>
  )
}

export default Viewevent