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
          >
            ContactUs
          </SoftTypography>
          <IconButton
            size="medium"
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon fontSize="medium" className={light ? "text-white" : "text-dark"}>
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
            <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
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
            <Icon className={light ? "text-white" : "text-dark"}>
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
