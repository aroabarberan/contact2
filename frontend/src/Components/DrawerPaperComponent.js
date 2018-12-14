import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";
import { withRouter } from "react-router-dom";
import Contacts from '@material-ui/icons/Contacts';
import MoreIcon from '@material-ui/icons/MoreVert';
import FileCopy from '@material-ui/icons/FileCopy';
import { CloudDownload, ExpandMore, MenuRounded } from "@material-ui/icons";
import Star from "@material-ui/icons/Star";
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import {
  ExpansionPanel, ExpansionPanelSummary,
  AppBar, Toolbar, IconButton, Typography, Drawer,
  List, ListItemText,
  Menu, MenuItem, CssBaseline, withStyles, Icon, Hidden,
} from '@material-ui/core';
import { QUERIES } from "../querys";
import ImageAvatarComponent from "./ImageAvatarComponent";
import GroupContainer from '../Containers/Group/groupContainer';
import CreateGroupContainer from "../Containers/Group/createGroupContainer";

class DrawerPaper extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: {},
      mobileOpen: false,
      expanded: null,
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
  }
  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        if (err) {
          return;
        }
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

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
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

  logout = () => {
    this.props.auth.logout()
  };

  handleData = data => {
    data.forEach(c => {
      const { last_name, name, favourite, phone } = c

      fetch(QUERIES.contact, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
        },
        body: JSON.stringify({ last_name, name, favourite, phone }),
      })
        .then(res => res.json())
        .then(console.log)
        .then(data => this.props.addContact(data.contact))
        .catch(console.error);
    })
  }

  render() {
    const { classes, history } = this.props;
    const { expanded, anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const listItem = [
      { icon: <Contacts style={{ color: '#42a5f5' }} />, path: "/", name: 'Contacts' },
      { icon: <FileCopy style={{ color: '#7e57c2' }} />, path: "/merge", name: 'Duplicates' },
      { icon: <Star style={{ color: '#ffeb3b' }} />, path: "/favourite", name: 'Favourites' },
    ]

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.logout} style={{ paddingRight: 16 }}>
          <Icon color="primary" style={{ paddingRight: 16 }}>
            <PowerSettingsNew />
          </Icon>
          Sign out
        </MenuItem>
      </Menu>
    );

    const drawerContent = (
      <Fragment>
        <List open className={classes.list}>
          {listItem.map((item, i) => (
            <MenuItem
              className={classes.menuItem}
              key={i}
              onClick={() => history.push(item.path)}
            >
              {item.icon} <ListItemText>{item.name}</ListItemText>
            </MenuItem>)
          )}
          <ExpansionPanel expanded={expanded === 'panel1'}
            classes={{ expanded: classes.expanded }}
            onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <ListItemText>Groups</ListItemText>
            </ExpansionPanelSummary>
            <GroupContainer auth={this.props.auth} />
            <CreateGroupContainer auth={this.props.auth} />
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'}
            classes={{ expanded: classes.expanded }}
            onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <ListItemText>More</ListItemText>
            </ExpansionPanelSummary>
            <CSVLink data={this.props.contacts} className={classes.menuLink} separator={";"}>
              <MenuItem className={classes.menuItem}>
                <CloudDownload />
                <ListItemText>Export</ListItemText>
              </MenuItem>
            </CSVLink>
          </ExpansionPanel>
          <Hidden mdUp>
            <div className={classes.separator} />
            <MenuItem className={`${classes.menuItem} ${classes.powerMobile}`} onClick={this.logout}>
              <PowerSettingsNew color='primary' />
              <ListItemText>Sign Out</ListItemText>
            </MenuItem>
          </Hidden>
        </List>
      </Fragment>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar} color='secondary'>
          <Toolbar>
            <Hidden mdUp>
              <IconButton onClick={this.handleDrawerToggle} color='inherit'
                style={{ marginRight: 16 }}>
                <MenuRounded />
              </IconButton>
            </Hidden>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
              onClick={() => history.push('/')}
            >
              Contact Board
            </Typography>
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
            <Hidden smDown>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>

        <Hidden smDown>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.toolbar} />
            {drawerContent}
          </Drawer>
        </Hidden>

        <Hidden mdUp>
          <Drawer
            className={classes.drawerMobile}
            variant="temporary"
            classes={{ paper: classes.drawerPaper }}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
          >
            {drawerContent}
          </Drawer>
        </Hidden>

        {renderMenu}
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
  title: {
    padding: '16px 8px',
    cursor: 'pointer',
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
  list: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
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
  expanded: {
    margin: 0,
  },
  separator: {
    flexGrow: 1,
    background: 'rgba(0, 0, 0, 0.05)',
  },
  powerMobile: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginBottom: -theme.spacing.unit,
  },
});

DrawerPaper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles, { withTheme: true })(DrawerPaper));
