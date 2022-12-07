import Dashboard from "./layouts/dashboard";
import Tables from "./layouts/tables";
import Billing from "./layouts/billing";
import VirtualReality from "./layouts/virtual-reality";
import RTL from "./layouts/rtl";
import Profile from "./layouts/profile";
import SignIn from "./layouts/authentication/sign-in";
import SignUp from "./layouts/authentication/sign-up";
import Icon from "@mui/material/Icon";
import Shop from "./examples/Icons/Shop";
import Office from "./examples/Icons/Office";
import Settings from "./examples/Icons/Settings";
import Document from "./examples/Icons/Document";
import SpaceShip from "./examples/Icons/SpaceShip";
import CustomerSupport from "./examples/Icons/CustomerSupport";
import CreditCard from "./examples/Icons/CreditCard";
import Cube from "./examples/Icons/Cube";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Members from "./pages/Members";
import Account from "./pages/Account";
import Messages from "./pages/Messages";
import Badge from '@mui/material/Badge';
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";


const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <Icon fontSize='small'>home</Icon>,
    component: <Home />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Articles",
    key: "articles",
    route: "/articles",
    icon: <Icon>article</Icon>,
    component: <Articles />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Members",
    key: "members",
    route: "/members",
    icon: <Icon>groups</Icon>,
    component: <Members />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Gallery",
    key: "gallery",
    route: "/gallery",
    icon: <Icon>collections</Icon>,
    component: <Gallery />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Events",
    key: "events",
    route: "/events",
    icon: <Icon>event</Icon>,
    component: <Events />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Messages",
  //   key: "messages",
  //   route: "/messages",
  //   icon: 
  //   <Badge badgeContent={4} color="primary">
  //   <Icon>mails</Icon>
  // </Badge>,
  //   component: <Messages />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Account",
    key: "account",
    route: "/account",
    icon: <Icon>account_circle</Icon>,
    component: <Account />,
    noCollapse: true,
  },
];

export default routes;
