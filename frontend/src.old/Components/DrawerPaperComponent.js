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
import Label from "@material-ui/icons/Label";
import Add from "@material-ui/icons/Add";
import Archive from "@material-ui/icons/Archive";
import CloudDownload from "@material-ui/icons/CloudDownload";
import CloudUpload from "@material-ui/icons/CloudUpload";


import {
  ExpansionPanel, ExpansionPanelSummary,
  AppBar, Toolbar, IconButton, Typography, Drawer,
  Menu, MenuItem, withStyles
} from '@material-ui/core';

import ImageAvatar from "./ImageAvatarComponent";
import Contact from "../Containers/ContactContainer";

class DrawerPaper extends React.Component {
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


  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

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
          <IconButton color="primary">
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

            {/* <div className={classes.search}>
              <Search 
              // className={classNames(classes.menuButton, classes.inputRoot, classes.inputInput)}
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
              <ListItemText>Contacts</ListItemText>
            </ListItem>

            <ListItem>
              <InboxIcon />
              <ListItemText>Duplicates</ListItemText>
            </ListItem>

            <ListItem>
              <Archive />
              <ListItemText>Other contacts</ListItemText>
            </ListItem>

            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ListItemText>Goups</ListItemText>
              </ExpansionPanelSummary>

              //STAR GROUPS.MAP
              <List>
                <ListItem>
                  <Label />
                  <ListItemText>Family</ListItemText>
                </ListItem>
                <ListItem>
                  <Label />
                  <ListItemText>Work</ListItemText>
                </ListItem>
                <ListItem>
                  <Label />
                  <ListItemText>Gym</ListItemText>
                </ListItem>
              </List>
              //END GROUPS.MAP
              <ListItem>
                <Add />
                <ListItemText>Create Group</ListItemText>
              </ListItem>
            </ExpansionPanel>



            <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ListItemText>More</ListItemText>
              </ExpansionPanelSummary>

              <List>
                <ListItem>
                  <CloudUpload />
                  <ListItemText>Import</ListItemText>
                </ListItem>
                <ListItem>
                  <CloudDownload />
                  <ListItemText>Export</ListItemText>
                </ListItem>
              </List>
            </ExpansionPanel>
          </List>
        </Drawer>
        {renderMenu}
        {renderMobileMenu}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Contact auth={this.props.auth} />
        </main>
      </div>
    );
  }
}

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
    color: '#666',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  icon: {
    color: '#666',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
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
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: fade(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: fade(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing.unit * 2,
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing.unit * 3,
  //     width: 'auto',
  //   },
  // },
  // searchIcon: {
  //   width: theme.spacing.unit * 9,
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // inputRoot: {
  //   color: 'inherit',
  //   width: '100%',
  // },
  // inputInput: {
  //   paddingTop: theme.spacing.unit,
  //   paddingRight: theme.spacing.unit,
  //   paddingBottom: theme.spacing.unit,
  //   paddingLeft: theme.spacing.unit * 10,
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('md')]: {
  //     width: 200,
  //   },
  // }
});

DrawerPaper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(DrawerPaper)