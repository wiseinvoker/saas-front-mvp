import React, {useState} from "react";
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
import { createBrowserHistory } from "history";

import HomeLayout from './HomeLayout';
import AppAppBar from '../appbar/AppAppBar';
import AppFooter from '../appbar/AppFooter';
import { getVideoInfo } from './HomeActions';

const backgroundImage = '/nlp_sponsored.jpg';

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
});

const Home = (props) => {
  const { classes, getVideoInfo } = props;
  const videopath = useFormInput("");
  const onSearch = (event) => {
    const url = videopath.value;
    event.preventDefault();
    // https://www.youtube.com/watch?v=DLX62G4lc44
    getVideoInfo({url}, "/yt-video");
  };
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
            placeholder="YouTube URL"
            inputProps={{ 'aria-label': 'search youtube video' }}
            {...videopath}
            required
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={onSearch}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
          Get the full transcription of Youtube video now!
        </Typography>
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
  getVideoInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  videourl: state.videourl
});

export default connect(mapStateToProps, {
  getVideoInfo
})(withRouter(withStyles(styles)(Home)));
