import React from 'react';
import PropTypes from 'prop-types';
import Archive from "@material-ui/icons/Archive";
import Contacts from '@material-ui/icons/Contacts';
import MoreIcon from '@material-ui/icons/MoreVert';
import FileCopy from '@material-ui/icons/FileCopy';
import CloudUpload from "@material-ui/icons/CloudUpload";
import CloudDownload from "@material-ui/icons/CloudDownload";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import {
  ExpansionPanel, ExpansionPanelSummary,
  AppBar, Toolbar, IconButton, Typography, Drawer,
  List, ListItemText,
  Menu, MenuItem, CssBaseline, withStyles
} from '@material-ui/core';
import { Link } from "react-router-dom";
import ImageAvatarComponent from "./ImageAvatarComponent";
import GroupContainer from '../Containers/Group/groupContainer';
import CreateGroupContainer from "../Containers/Group/createGroupContainer";

class DrawerPaper extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: {},
      open: false,
      expanded: null,
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
  }
  componentWillMount() {
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
    const listItem = [
      { icon: <Contacts />, redirect: <Link className={classes.menuLink} to="/contacts">Contacts</Link> },
      { icon: <FileCopy />, redirect: <Link className={classes.menuLink} to="/merge">Duplicates</Link> },
      { icon: <Archive />, redirect: <Link className={classes.menuLink} to="/other">Other contacts</Link> },
    ]

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClose}>
          <IconButton color="primary"><PowerSettingsNew /></IconButton>Sing out
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
        <MenuItem onClick={this.handleClose} >
          <IconButton color="primary"><PowerSettingsNew /></IconButton>Sing out
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar} >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>Book Contact</Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <ImageAvatarComponent profile={this.state.profile} />
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
          <List open>
            {listItem.map((item, i) => (
              <MenuItem className={classes.menuItem} key={i} >
                {item.icon} <ListItemText>{item.redirect}</ListItemText>
              </MenuItem>)
            )}

            <ExpansionPanel expanded={expanded === 'panel1'}
              onChange={this.handleChange('panel1')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ListItemText>Groups</ListItemText>
              </ExpansionPanelSummary>
              <GroupContainer auth={this.props.auth} />
              <CreateGroupContainer auth={this.props.auth} />
            </ExpansionPanel>

            <ExpansionPanel expanded={expanded === 'panel2'}
              onChange={this.handleChange('panel2')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ListItemText>More</ListItemText>
              </ExpansionPanelSummary>
              <MenuItem className={classes.menuItem}>
                <CloudUpload />
                <ListItemText>Import</ListItemText>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <CloudDownload />
                <ListItemText>Export</ListItemText>
              </MenuItem>
            </ExpansionPanel>
          </List>
        </Drawer>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

const drawerWidth = 240;

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
    position: "fixed",
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  menuLink: {
    color: '#666',
    textDecoration: 'none',
  },
  menuItem: {
    color: '#666',
    '&:focus': {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
    },
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

DrawerPaper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(DrawerPaper)