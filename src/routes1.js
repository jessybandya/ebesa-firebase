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

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <Icon>home</Icon>,
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
];

export default routes;
