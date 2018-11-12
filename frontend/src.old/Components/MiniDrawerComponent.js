import React from 'react';
import PropTypes from 'prop-types';

import InboxIcon from '@material-ui/icons/Inbox';
import MoreIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';

import {
  ExpansionPanel, ExpansionPanelSummary,
  AppBar, Toolbar, IconButton, Typography, Drawer,
  Menu, MenuItem, withStyles
} from '@material-ui/core';

import ImageAvatar from "./ImageAvatarComponent";
import Home from '../Containers/HomeContainer';
// import Search from './SearchComponent';


class MiniDrawer extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      expanded: null,
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
  }
  componentWillMount() {
    this.setState({ profile: {} });

    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleClose = () => {
    this.props.auth.logout()
  };

  render() {
    const { classes } = this.props;
    const { expanded, anchorEl, mobileMoreAnchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClose}>
          <IconButton color="inherit">
            <PowerSettingsNew />
          </IconButton>
          Sing out
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleClose}>
          <IconButton color="inherit">
            <PowerSettingsNew />
          </IconButton>
          Sing out
        </MenuItem>
      </Menu>
    );
    return (

      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Book Contact
          </Typography>

            {/* SEARCH!!! */}
            {/* <div className={classes.search}>
              <Search 
              // className={classNames(classes.menuButton, classes.inputRoot, classes.inputInput)} don't work
              // classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div> */}

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <ImageAvatar profile={this.state.profile} />
              </IconButton>
            </div>

            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem>
              <InboxIcon />
              <ListItemText>Inbox</ListItemText>
            </ListItem>

            <ListItem>
              <InboxIcon />
              <ListItemText>Inbox</ListItemText>
            </ListItem>

            <ListItem>
              <InboxIcon />
              <ListItemText>Inbox</ListItemText>
            </ListItem>

            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <MailIcon />
                <ListItemText>Mail</ListItemText>
              </ExpansionPanelSummary>
              <List>
                <ListItem>
                  <InboxIcon />
                  <ListItemText>Mail</ListItemText>
                </ListItem>
              </List>
            </ExpansionPanel>

            <ListItem>
              <InboxIcon />
              <ListItemText>Inbox</ListItemText>
            </ListItem>

            <ListItem>
              <InboxIcon />
              <ListItemText>Inbox</ListItemText>
            </ListItem>

          </List>
        </Drawer>
        {renderMenu}
        {renderMobileMenu}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Home auth={this.props.auth} />
        </main>
      </div>
    );
  }
}

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,

  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

});

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(MiniDrawer)