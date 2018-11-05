// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Sessions from "views/Sessions/Sessions.jsx";
import Groups from "views/Groups/Groups.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
      path: "/sessions",
      sidebarName: "Sessions",
      navbarName: "Sessions",
      icon: LibraryBooks,
      component: Sessions
  },
  {
      path: "/groups",
      sidebarName: "Groups",
      navbarName: "Groups",
      icon: BubbleChart,
      component: Groups
  },
  {
    path: "/users",
    sidebarName: "Users",
    navbarName: "Users",
    icon: Person,
    component: UserProfile
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
