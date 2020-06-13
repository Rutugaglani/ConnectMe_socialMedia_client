import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProfileSkeleton from '../../util/ProfileSkeleton';

import EditDetails from './EditDetails';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs';

import  EditIcon  from '@material-ui/icons/Edit';
import  KeyboardReturn  from '@material-ui/icons/KeyboardReturn';


import { logoutUser , uploadImage } from '../../redux/action/userAction';
import MyButton from '../../util/MyButton';


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
        
      }
})


class Profile extends Component {
handleImageChange=(e)=>{
  const image = e.target.files[0];
  const formData = new FormData();
  formData.append('image',image,image.name);
  this.props.uploadImage(formData);
}
handleEditPicture = (e) =>{
  const fileInput = document.getElementById('imageInput');
  fileInput.click();
}
handleLogout = ()=>{
  this.props.logoutUser()
}

    render() {
        const { classes , user : { credentials : { handle, createdAt , imageUrl , bio , website , location } ,
         loading,
        authenticated }}= this.props;
        console.log(this.props);

         let profileMarkup = !loading ? (authenticated ? (<Paper className={classes.paper}>
             <div className = { classes.profile}>
                 <div className ="image-wrapper">
                     <img src = { imageUrl } alt = "profile" className="profile-image"/>
                     <input type="file" id ="imageInput" hidden="hidden" onChange ={this.handleImageChange}/>
                     <MyButton tip ="Edit Profile Picture" onClick={this.handleEditPicture} btnClassName="buttons">
                     <EditIcon color="primary"/>
                     </MyButton>
                 </div>
                 <hr/>
                 <div className = "profile-details">
                     <MuiLink component = {Link} to={`/user/${handle}`} color = "primary" variant ="h5">
                         @{handle}
                     </MuiLink>
                     <hr/>
         { bio && <Typography variant ="body2">{bio}</Typography>}
         <hr/>
         { location && (
             <Fragment>
                 <LocationOn color = "primary"/><span>{location}</span>
             </Fragment>
         )}<br/>
         {
             website && (<Fragment>
                 <LinkIcon color ="primary"/>
                 <a href = {website} target ="_blank" rel ="noopener noreferrer">
                     {' '}{website}
                 </a>
                 <hr/>
             </Fragment>)
         }
         <CalendarToday color="primary"/>{' '}
        <span> Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                 </div>
                 <MyButton tip ="Logout" onClick={this.handleLogout} >
                 <KeyboardReturn color="primary"/>
                     </MyButton>
                 
                    
                  
                 <EditDetails/>
             </div>
         </Paper>):(<Paper className = {classes.paper}>
             <Typography variant="body2" align="center">
                 No Profile found, please login again
             </Typography>
             <div className = {classes.buttons}>
                 <Button variant="contained" color="primary" component={Link} to ="/login">
                     Login
                 </Button>
                 <Button variant="contained" color="primary" component={Link} to ="/signup">
                     Signup
                 </Button>
             </div>
         </Paper>

         )) : (< ProfileSkeleton/>)


         return profileMarkup;
      
           
        
    }
}

const mapStateToProps = (state)=>({
    user:state.user
})
const mapActionToProps = { logoutUser,uploadImage}
Profile.propTypes = {
    user : PropTypes.object.isRequired,
    classes : PropTypes.object.isRequired,
    logoutUser:PropTypes.func.isRequired,
    uploadImage : PropTypes.func.isRequired,

}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Profile))