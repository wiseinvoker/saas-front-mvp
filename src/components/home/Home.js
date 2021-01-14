import React, {useState} from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Typography from '@material-ui/core/Typography';

import HomeLayout from './HomeLayout';
import AppAppBar from '../appbar/AppAppBar';
import AppFooter from '../appbar/AppFooter';
import { getVideoInfo, clearVideoInfo, setButtonTitle } from './HomeActions';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { loadStripe } from '@stripe/stripe-js';
import moment from 'moment';


const STRIPE_KEY = 'STRIPE_SECRET_KEY';
const stripePromise = loadStripe(STRIPE_KEY);

const backgroundImage = '/static/nlp_sponsored.jpg';
const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4),
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
  submitButton: {
    padding: 10,
    textTransform:'none',
  },
  divider: {
    height: 28,
    margin: 4,
  },
  searchbox: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
    marginTop: theme.spacing(4),
  },
  description: {
     overflow: 'hidden',
     textOverflow: 'ellipsis',
     maxHeight: '9vh',
  },
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    width: '80vw',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    // maxWidth: 445,
    display: 'flex',
    flexDirection: 'row',
  },
  cardactionarea: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardmedia: {
    width: '40%',
  },
  cardcontent: {
    // display: 'flex',
  },
});

const Home = (props) => {
  const { classes, getVideoInfo, videoinfo, clearVideoInfo, buttontitle, setButtonTitle } = props;
  const videopath = useFormInput("");
  let url;
  const onSearch = (event) => {
    event.preventDefault();
    if (buttontitle === 'Search') {
      url = videopath.value;
      // https://www.youtube.com/watch?v=DLX62G4lc44
      getVideoInfo({url});
    } else if (buttontitle === 'Transcribe Now') {
      handleCheckout();
    }
  };
  // handle stripe checkout
  const handleCheckout = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    const API_URL = (window.location.origin === "http://localhost:3000") ? "http://127.0.0.1:8000" : window.location.origin;
    const video_link = localStorage.getItem("videourl");
    const response = await fetch(API_URL + '/create-checkout-session/', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: videoinfo.title, length: videoinfo.length, url: video_link }),
       });
    const session = await response.json();
    console.log("session:", session.sessionId);
    if ( session.sessionId ) {
      clearVideoInfo();
      setButtonTitle("Search");
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.log("Stripe error:", result.error.message);
      }
    }
  };

  let videoDetail;
  if (videoinfo.title) {
    videoDetail = (
      <section className={classes.root}>
        <Container className={classes.container}>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image={ videoinfo.thumbnail_url }
              title="Contemplative Reptile"
              className={classes.cardmedia}
            />
            <CardContent className={classes.cardcontent}>
              <Typography gutterBottom variant="h5" component="h2">
                { videoinfo.title }
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p" className={classes.description}>
                { videoinfo.description }
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p" >
                Author: { videoinfo.author }
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p" >
                Publish Date: { moment(videoinfo.publish_date).format('MMM Do, YYYY') }
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p" >
                Length: { moment.utc(moment.duration(videoinfo.length, "seconds").asMilliseconds()).format("HH:mm") }
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p" >
                Price: { parseInt(videoinfo.length/60) > 50 ? parseInt(videoinfo.length/60)/100 : 50/100 } USD
              </Typography>
            </CardContent>
          </Card>    
        </Container>
      </section>
      );
  } else {
    videoDetail = <section className={classes.root} />;
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <HomeLayout  backgroundClassName={classes.background}>
        {/* Increase the network loading priority of the background image. */}
        <Typography color="inherit" align="center" variant="h2" marked="center">
          NLP Service For Your Business
        </Typography>
        <Paper component="form" className={classes.searchbox}>
          <IconButton className={classes.iconButton} aria-label="youtube">
            <YouTubeIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <InputBase
            className={classes.input}
            placeholder="YouTube Link"
            inputProps={{ 'aria-label': 'search youtube video' }}
            {...videopath}
            required
          />
          <Divider className={classes.divider} orientation="vertical" />
          <Button type="submit" className={classes.submitButton} aria-label="search" onClick={onSearch}>
            { buttontitle }
          </Button>
        </Paper>
        { videoDetail }
      </HomeLayout>
      <AppFooter />
    </React.Fragment>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleReset = () => {
    setValue("");
  };

  return {
    value,
    onChange: handleChange,
    onReset: handleReset
  };
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  videoinfo: PropTypes.object.isRequired,
  getVideoInfo: PropTypes.func.isRequired,
  clearVideoInfo: PropTypes.func.isRequired,
  setButtonTitle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  videoinfo: state.video.videoinfo,
  buttontitle: state.video.buttontitle,
});

export default connect(mapStateToProps, {
  getVideoInfo, clearVideoInfo, setButtonTitle
})(withRouter(withStyles(styles)(Home)));
