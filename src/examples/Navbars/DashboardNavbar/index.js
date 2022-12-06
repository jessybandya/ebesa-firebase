import React, { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux'

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftInput from "../../../components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "../../../examples/Breadcrumbs";
import NotificationItem from "../../../examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "./styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "../../../context";
import {Button,Modal} from 'react-bootstrap';
// Images
import team2 from "../../../assets/images/team-2.jpg";
import logoSpotify from "../../../assets/images/small-logos/logo-spotify.svg";
import { auth, db } from "../../../firebase";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';


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


function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const authId = useSelector((state) => state.authId);
  const [aboutModal, setAboutModal] = React.useState(false);
  const [contactModal, setContactModal] = React.useState(false);
   const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  
  //   return (
  //     <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
 

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Jessy Bandya"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Chris Brown"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );
  const [modalShow, setModalShow] = React.useState(false);
  const [currentUser, setCurrentUser] = useState(`${authId}`)
  useEffect(() => {
    db.collection('users').doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])
  return (
    <>
    <AppBar
    style={{zIndex:10}}
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            {authId ?(
              <>
              <div align="right" style={{display:'flex',alignItems:'center',textAlign:'right'}} color={light ? "white" : "inherit"}>
              <SoftTypography
              variant="button"
              sx={({ palette: { dark, white } }) => ({
                color: light ? white.main : dark.main,
              })}
              fontWeight="medium"
              color={light ? "white" : "dark"}
              style={{marginRight:8,cursor:'pointer'}}
              onClick={() => setAboutModal(true)}
              >
              AboutUs
            </SoftTypography>
            <SoftTypography
            variant="button"
            sx={({ palette: { dark, white } }) => ({
              color: light ? white.main : dark.main,
            })}
            fontWeight="medium"
            color={light ? "white" : "dark"}
            style={{marginRight:8,cursor:'pointer'}}
            onClick={() => setContactModal(true)}
            >
            ContactUs
          </SoftTypography>
          <IconButton
            size="medium"
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon fontSize="medium" style={{color:'#43a047'}}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>

          <IconButton
            size="small"
            color="inherit"
            sx={navbarIconButton}
            aria-controls="notification-menu"
            aria-haspopup="true"
            variant="contained"
           
            onClick={handleOpenMenu}
          >
            <Icon style={{color:'#43a047'}}>notifications</Icon>
          </IconButton>
          {renderMenu()}
          <SoftTypography
          variant="button"
          sx={({ palette: { dark, white } }) => ({
            color: light ? white.main : dark.main,
          })}
          fontWeight="medium"
          color={light ? "white" : "dark"}
        >
        <Link
        to="/account"
        >
        <Avatar 
        sx={{ width: 30, height: 30 }}
        alt={currentUser?.firstName} src={currentUser?.profilePhoto} />       
        </Link>
        </SoftTypography>
        </div>
              </>
            ):(
              <>
              <div style={{display:'flex',alignItems:'center',textAlign:'right'}} color={light ? "white" : "inherit"}>
              <SoftTypography
              variant="button"
              sx={({ palette: { dark, white } }) => ({
                color: light ? white.main : dark.main,
              })}
              fontWeight="medium"
              color={light ? "white" : "dark"}
              style={{marginLeft:8,cursor:'pointer'}}
              onClick={() => setAboutModal(true)}

            >
              AboutUs
            </SoftTypography>
            <SoftTypography
            variant="button"
            sx={({ palette: { dark, white } }) => ({
              color: light ? white.main : dark.main,
            })}
            fontWeight="medium"
            color={light ? "white" : "dark"}
            style={{marginLeft:8,cursor:'pointer'}}
            onClick={() => setContactModal(true)}
          >
            ContactUs
          </SoftTypography>
              <SoftTypography
                variant="button"
                sx={({ palette: { dark, white } }) => ({
                  color: light ? white.main : dark.main,
                })}
                fontWeight="medium"
                color={light ? "white" : "dark"}
                onClick={() => setModalShow(true)}
                style={{marginLeft:8,cursor:'pointer'}}
              >
              <Icon fontSize="medium">login</Icon>
              </SoftTypography>
          <IconButton
            size="medium"
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon style={{color:'#43a047'}}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </div>
              </>
            )}

          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
    <Modal
    show={modalShow}
    onHide={() => setModalShow(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
         <AppBar position="static">
           <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Sign In" {...a11yProps(0)} />
              <Tab label="Sign Up" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
    </Modal.Header>
    <Modal.Body
    style={{
      height: '70vh',
      overflowY: 'auto'
     }}
    >
    <SwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={value}
    onChangeIndex={handleChangeIndex}
  >
    <TabPanel value={value} index={0} dir={theme.direction}>
      <SignIn setModalShow={setModalShow}/>
    </TabPanel>
    <TabPanel value={value} index={1} dir={theme.direction}>
      <SignUp setModalShow={setModalShow}/>
    </TabPanel>
  </SwipeableViews>

    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => setModalShow(false)}>Close</Button>
    </Modal.Footer>
  </Modal>






  <Modal
  show={aboutModal}
  onHide={() => setAboutModal(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{fontWeight:'bold',color:'#43a047'}}>About Us</div>
          <div><CloseIcon fontSize="large" onClick={()=> setAboutModal(false)} style={{color:'#88888888',cursor:'pointer'}}/></div>
  </Modal.Header>
  <Modal.Body>
  {/* Start About */}
  <section className="section" id="about">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-5 col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
          <div className="position-relative">
            <img src="images/about.jpg" className="rounded-md img-fluid mx-auto d-block" alt="" />
            <div className="play-icon">
              <a href="#!" data-type="youtube" data-id="yba7hPeTSjk" className="play-btn lightbox">
                <i className="mdi mdi-play text-primary rounded-circle bg-white shadow" />
              </a>
            </div>
          </div>
        </div>{/*end col*/}
        <div className="col-lg-7 col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
          <div className="section-title ms-lg-5">
            <h6 className="text-primary fw-semibold text-uppercase">Who We Are ?</h6>
            <h4 className="title mb-4">Our Company Story</h4>
            <p className="text-muted">Start working with Upstart that can provide everything you need to generate awareness, drive traffic, connect. Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with 'real' content. This is required when, for example, the final text is not yet available. Dummy texts have been in use by typesetters since the 16th century.</p>
          </div>
        </div>{/*end col*/}
      </div>{/*end row*/}
    </div>
  </section>
  {/* End About */}
  </Modal.Body>
</Modal>


<Modal
show={contactModal}
onHide={() => setContactModal(false)}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header style={{display:'flex',justifyContent:'space-between'}}>
<div style={{fontWeight:'bold',color:'#43a047'}}>Contact Us</div>
<div><CloseIcon fontSize="large" onClick={()=> setContactModal(false)} style={{color:'#88888888',cursor:'pointer'}}/></div>
</Modal.Header>
<Modal.Body>
{/* Start Contact */}
<section className="section bg-light" id="contact">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-8 col-md-6 mt-4 pt-2">
        <div className="p-4 rounded shadow bg-white">
          <form method="post" id="myForm" name="myForm" onsubmit="return validateForm()">
            <p className="mb-0" id="error-msg" />
            <div id="simple-msg" />
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <input name="name" id="name" type="text" className="form-control" placeholder="Name :" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <input name="email" id="email" type="email" className="form-control" placeholder="Email :" />
                </div> 
              </div>{/*end col*/}
              <div className="col-12">
                <div className="mb-4">
                  <input name="subject" id="subject" className="form-control" placeholder="Subject :" />
                </div>
              </div>{/*end col*/}
              <div className="col-12">
                <div className="mb-4">
                  <textarea name="comments" id="comments" rows={4} className="form-control" placeholder="Message :" defaultValue={""} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" id="submit" name="send" className="btn btn-primary">Send Message</button>
              </div>{/*end col*/}
            </div>{/*end row*/}
          </form>
        </div>
      </div>{/*end col*/}
      <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
        <div className="ms-lg-4">
          <div className="d-flex">
            <div className="icons text-center mx-auto">
              <i className="uil uil-phone d-block rounded h4 mb-0" />
            </div>
            <div className="flex-1 ms-3">
              <h5 className="mb-2">Phone</h5>
              <a style={{fontWeight:'bold',fontSize:16}} href="tel:+254746749307" className="text-muted">+254 746 749 307</a>
            </div>
          </div>
          <div className="d-flex mt-4">
            <div className="icons text-center mx-auto">
              <i className="uil uil-envelope d-block rounded h4 mb-0" />
            </div>
            <div className="flex-1 ms-3">
              <h5 className="mb-2">Email</h5>
              <a style={{fontWeight:'bold',fontSize:16}} href="mailto:jessy.bandya5@gmail.com" className="text-muted">jessy.bandya5@gmail.com</a>
            </div>
          </div>
          <div className="d-flex mt-4">
            <div className="icons text-center mx-auto">
              <i className="uil uil-map-marker d-block rounded h4 mb-0" />
            </div>
            <div className="flex-1 ms-3">
              <h5 className="mb-2">Location</h5>
              <p style={{fontWeight:'bold',fontSize:16}} className="text-muted mb-2">university way, University Of Nairobi, Nairobi, Kenya</p>
            </div>
          </div>
        </div>
      </div>{/*end col*/}
    </div>{/*end row*/}
  </div>{/*end container*/}
</section>{/*end section*/}
</Modal.Body>
</Modal>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
