import React, { Component, useEffect } from "react";
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { loadStripe } from '@stripe/stripe-js';
import AppAppBar from '../appbar/AppAppBar';
import AppFooter from '../appbar/AppFooter';
import { setVideoInfo, readVideoInfo } from './VideoDetailActions';

// Original imports
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../login/LoginActions";

const STRIPE_KEY = 'pk_test_51I7A7ACXNKb5cnwif3jpr0b4CMx8QRWphNkm6CqvhA8Wi69hP4rtdkfujHEYbrIY2zS0BTkyOWUeYmHeg2oDxipj00pjty4VAo';
const stripePromise = loadStripe(STRIPE_KEY);

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '80vh',
  },
  container: {
    marginTop: '56px',
    marginBottom: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    maxWidth: 345,
  },
});
const VideoDetail = (props) => {
  const { videoinfo, setVideoInfo, videourl } = props;
  const classes = useStyles();

  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:8000/create-checkout-session/', { method: 'POST' });
    const session = await response.json();
    console.log("session:", session.sessionId);
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <section className={classes.root}>
        <Container className={classes.container}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="200"
                image="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400&q=80"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {videoinfo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary" role="link" onClick={handleClick}>
                Checkout
              </Button>
            </CardActions>
          </Card>    
        </Container>
      </section>
      <AppFooter />
    </React.Fragment>
  );
}


VideoDetail.propTypes = {
  setVideoInfo: PropTypes.func.isRequired,
  readVideoInfo: PropTypes.func.isRequired,
  videoinfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  videoinfo: JSON.parse(localStorage.getItem('videoinfo')),
  // videoinfo: state.videoinfo,
});

export default connect(mapStateToProps, {
  setVideoInfo, readVideoInfo
})(withRouter(VideoDetail));
