import { Card, CardMedia } from '@mui/material'
import React from 'react'
import SoftBox from '../../../../components/SoftBox'
import SoftButton from '../../../../components/SoftButton'
import SoftTypography from '../../../../components/SoftTypography'
import {Button,Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskIcon from '@mui/icons-material/Task';
import StarIcon from '@mui/icons-material/Star';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Viewevent from '../../Viewevent'
import { auth,db } from '../../../../firebase'
import Rating from '@mui/material/Rating';
import { Avatar } from '@mui/material'
import { Input } from 'antd';
import {
    SendOutlined
  } from '@ant-design/icons';
  import { toast } from "react-toastify"
import { useSelector } from 'react-redux'

  const { TextArea } = Input;

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


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

function Post({ eventId, images, status, description, title, venue, date, timestamp }) {
  const [modalShow, setModalShow] = React.useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [value1, setValue1] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [submitComment, setSubmitComment] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState('')

  React.useEffect(() => {
    db.collection('users').doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const submitCommentFun = () => {

  }

  return (
    <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent",
      overflow: "visible",
      margin:1,
      padding:1
    }}
  >
    <SoftBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
      <CardMedia
        src="http://www.wuyidoric.com.au/WuYiDoric/media/images/Projects/UniversityOfNairobiTowersProject/UniversityOfNairobiTowersProject_banner.jpg"
        component="img"
        title={title}
        sx={{
          maxWidth: "100%",
          margin: 0,
          boxShadow: ({ boxShadows: { md } }) => md,
          objectFit: "cover",
          objectPosition: "center",
          height:100
        }}
      />
    </SoftBox>
    <SoftBox pt={3} px={0.5}>
      <SoftBox mb={1}>
          <SoftTypography
            variant="h5"
            textTransform="capitalize"
          >
            {title}
          </SoftTypography>
      </SoftBox>
      <SoftBox style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:15}}>
      <div><StarIcon />3.5/5</div>
      <div><ReviewsIcon />12</div>
      </SoftBox>
      <hr/>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          <SoftButton
            variant="outlined"
            size="small"
            color="info"
            onClick={() => setModalShow(true)}
          >
            view
          </SoftButton>
        <SoftBox display="flex">
        {status === true ?(
          <span style={{fontWeight:'bold',fontSize:20}}><AccessTimeIcon /></span>
        ):(<span style={{fontWeight:'bold',fontSize:20}}><TaskIcon /></span>)}
        </SoftBox>
      </SoftBox>
    </SoftBox>
    <Modal
    show={modalShow}
    style={{zIndex:2000}}
    onHide={() => setModalShow(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>

    </Modal.Header>
    <Modal.Body
    style={{
      height:'70vh',
      overflowY:'auto'
    }}
    >
    <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
          <Tab label="Gallery" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Viewevent description={description} title={title} venue={venue} date={date} status={status} eventId={eventId}/>
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
    {auth?.currentUser?.uid  && value === 1 &&(
      <center>
      <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value1}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue1(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value1]}</Box>
      )}
    </Box>
    <div style={{display:'flex',alignItems:'center',padding:5}}>
    <TextArea placeholder={`Hey ${currentUser?.firstName}, waiting for your review 😊...`} style={{borderRadius:10}}
    value={submitComment}
    onChange={e => setSubmitComment(e.target.value)}
    /> 
    
    {submitComment === "" ?(
        <Avatar src={currentUser?.profilePhoto} alt={currentUser?.firstName} style={{marginRight:20,marginLeft:3,cursor:'pointer'}}/>
    ):(
        <SendOutlined onClick={submitCommentFun} style={{marginRight:20,marginLeft:3,cursor:'pointer',fontSize:'20px'}}/>
    )}
    </div>
     </center>
    )

    }
  </Modal>
  </Card>
  )
}

export default Post