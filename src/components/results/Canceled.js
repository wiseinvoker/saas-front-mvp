import React, { useState } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import AppAppBar from '../appbar/AppAppBar';
import AppFooter from '../appbar/AppFooter';

const backgroundImage = '/nlp_sponsored.jpg';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  root: {
    // color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '80vh',
      minHeight: 500,
      maxHeight: 1300,
    },
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

const CanceledPage = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <AppAppBar />
      <section className={classes.root}>
        <Container className={classes.container}>
          <Typography color="inherit" align="center" variant="h2" marked="center">
            Your order has been canceled.
          </Typography>
          <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
            Get the full transcription of Youtube video now!
          </Typography>
        </Container>
      </section>
      <AppFooter />
    </React.Fragment>
  );
}

CanceledPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CanceledPage);
