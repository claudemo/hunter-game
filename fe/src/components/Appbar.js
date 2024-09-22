import clsx from 'clsx';
import { createBrowserHistory } from "history";
import React from 'react';
import { Link, Route, Router } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Badge from '@material-ui/core/Badge';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import LayersIcon from '@material-ui/icons/Layers';

import config from '../config/config';

// import your components:
import Compose from "../pages/Compose/Compose";
import CurrentLocation from "../pages/CurrentLocation/CurrentLocation";
import Home from "../pages/Home";
import PasswordChange from "../pages/PasswordChange/PasswordChange";
import PasswordReset from "../pages/PasswordReset/PasswordReset";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import THome from "../pages/Tweets/Home";

import Game from "../pages/Game/Game";
import Speed from "../pages/Game/Speed";
import Users from "../pages/Users/Users";
const drawerWidth = 240;
const history = createBrowserHistory();

// css
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 5px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 40,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  drawerPaperCollapsed: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
  },
}));

//~dk
const isAuthorised = config.auth.isAuthenticated()

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(false);
  const [title, setTitle] = React.useState('Home');

  const handleDrawerOpen = () => {
    setOpen(true);
    setCollapsed(false);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setCollapsed(false);
  };
  const handleDrawerCollapsed = () => {
    setCollapsed(true);
    setOpen(false);
  };
  const onItemClick = title => () => {
    setTitle(title);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* This is the header AppBar */}
      <AppBar position="absolute" className={clsx(classes.appBar,
        open && classes.appBarShift, collapsed && classes.appBar)}>
        <Toolbar title={title} className={classes.toolbar}>

          {/* The Menu icon exposes the left pane menu bar */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>

          {/* The title is set by the components */}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {title}
          </Typography>

          {/* For kicks */}
          <IconButton color="inherit">
            <Badge badgeContent={2} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* The Router component routes URLs to your components */}
      <Router history={history} title={title} >

        {/* Drawers are left pane menu items in React-speak */}
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper,
              !open && classes.drawerPaperClose,
              collapsed && classes.drawerPaperCollapsed)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>

            {/* This icon collapses the left pane enough to show menu item icons */}
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          {/* Left pane menu items */}
          <List>

            {/* Tweets menu item*/}
            {/*<ListItem button component={Link} to="/tweets" onClick={onItemClick('Tweets')}>*/}
            {/*  <ListItemIcon>*/}
            {/*    <DashboardIcon />*/}
            {/*  </ListItemIcon>*/}
            {/*  <ListItemText primary="Tweets" />*/}
            {/*  { title === 'Tweets' &&*/}
            {/*      <ListItemIcon>*/}
            {/*        <IconButton onClick={handleDrawerCollapsed}>*/}
            {/*          <ChevronLeftIcon />*/}
            {/*        </IconButton>*/}
            {/*      </ListItemIcon>*/}
            {/*  }*/}
            {/*</ListItem>*/}

            {/*/!* Compose menu item*!/*/}
            {/*<ListItem button component={Link} to="/compose" onClick={onItemClick('Compose')}>*/}
            {/*  <ListItemIcon>*/}
            {/*    <DashboardIcon />*/}
            {/*  </ListItemIcon>*/}
            {/*  <ListItemText primary="Compose" />*/}
            {/*  { title === 'Compose' &&*/}
            {/*      <ListItemIcon>*/}
            {/*        <IconButton onClick={handleDrawerCollapsed}>*/}
            {/*          <ChevronLeftIcon />*/}
            {/*        </IconButton>*/}
            {/*      </ListItemIcon>*/}
            {/*  }*/}
            {/*</ListItem>*/}

            {/* SignUp menu item */}
            <ListItem button component={Link} to="/signup" onClick={onItemClick('Register to Play')}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Register to Play" />
              {title === 'Register to Play' &&
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>

            <ListItem button component={Link} to="/dashboard" onClick={onItemClick('Your Location')}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Your Location" />
              {title === 'Your Location' &&
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>

            <ListItem button component={Link} to="/activeUsers" onClick={onItemClick('People Playing')}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="People Playing" />
              {title === 'People Playing' &&
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>

            <ListItem button component={Link} to="/game" onClick={onItemClick('Group Map')}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Group Map" />
              {title === 'TAP TO PLAY' &&
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>
            <ListItem button component={Link} to="/speed" onClick={onItemClick('Speed')}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Speed" />
              {title === 'Speed' &&
                <ListItemIcon>
                  <IconButton onClick={handleDrawerCollapsed}>
                    <ChevronLeftIcon />
                  </IconButton>
                </ListItemIcon>
              }
            </ListItem>
          </List>
        </Drawer>



        {/* This is your mission control: Matches URLs above to your components */}
        <main className={classes.content}>

          {/* menu paths */}
          <Route exact path="/" component={Home} />
          <Route path="/tweets" component={THome} />
          <Route path="/compose" component={Compose} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/password_reset" component={PasswordReset} />
          <Route path="/password_change" component={PasswordChange} />
          <Route path="/dashboard" component={CurrentLocation} />
          <Route path="/speed" component={Speed} />

          <Route path="/activeUsers" component={Users} />
          <Route path="/game" component={Game} />

          {/* <Route path="/activity"><ActivityHome /></Route> */}
        </main>
      </Router>

      {/* Whatever you put here will appear on all your pages, style appropriately! */}
    </div>
  );
}
