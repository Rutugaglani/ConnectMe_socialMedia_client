import React from 'react';

import defaultImg from '../images/defaultImg.png';
import PropTypes from 'prop-types';


import withStyles  from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';


import LocationOn from '@material-ui/icons/LocationOn';

import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme)=>({
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    
  },
  handle:{
    width:60,
    height:20,
    backgroundColor: theme.palette.primary.main,
    margin:'0 auto 7px auto'
},

fullLine : {
    height:15,
    width:'100%',
    marginBottom:10,
    backgroundColor:'rgba(0,0,0,0.6)'
},
halfLine : {
    height:15,
    width:'50%',
    marginBottom:10,
    backgroundColor:'rgba(0,0,0,0.6)'
}


})

const ProfileSkeleton = (props) =>{ 
    const { classes } = props;
    return (
        <Paper className ={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src = {defaultImg} alt="profile" className="profile-image"/>
                  <hr/>
                  <div className="profile-details">
                  <div className={classes.handle}/>
                  <hr/>
                  <div className = {classes.fullLine}/>
                  <div className = {classes.fullLine}/>
                  <hr/>
                  <LocationOn color="primary"/><span>Location</span>
                  <hr/>
                  <CalendarToday color ="primary"/><span>Joined on</span>
                  </div>


                    
                </div>
            </div>
        </Paper>
    )
    }
    
ProfileSkeleton.propTypes ={
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton)
