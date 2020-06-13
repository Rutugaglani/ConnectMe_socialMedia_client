import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import Comments from './Comments';

import MyButton from '../../util/MyButton';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import  UnfoldMore  from '@material-ui/icons/UnfoldMore';
import  CloseIcon  from '@material-ui/icons/Close';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import LikeButton from './LikeButton';
import  ChatIcon  from '@material-ui/icons/Chat';
import CommentForm from './CommentForm';

import { connect } from 'react-redux';
import { getScream ,  clearErrors } from '../../redux/action/dataAction';

const styles=(theme)=>({
    ...theme.spreadThis,
  
    profileImage:{
        maxWidth:200,
        height : 200,
        borderRadius:'50%',
        objectFit : 'cover'
},
DialogContent:{
    padding :20
},

closeButton:{
    position:'absolute',
    left:'90%'
},
progress:{
   textAlign:'center',
   marginTop:50,
   marginBottom:50
},
expandButton:{
    position:'absolute',
    left:'90%'
},
invisible : {
    border:'none',
    margin:4
},
visible : {
  width:'100%',
  borderBottom:'1px solid rgba(0,0,0,0.1)',
  marginBottom:20
}
})


 class ScreamDialog extends Component {
     state = {
         open : false,
         oldPath:'',
         newPath:''
     }

     componentDidMount(){
         if(this.props.openDialog)
         {
             this.handleOpen();
         }
     }
    handleOpen=()=>{
        let oldPath = window.location.pathname;
        const { userHandle , screamId } = this.props;
        const newPath =`/user/${userHandle}/screams/${screamId}`;

        if(oldPath === newPath) oldPath =`/user/${userHandle}`;

        window.history.pushState(null,null,newPath)

        this.setState({
            open : true,
            oldPath,
            newPath
        })
        this.props.getScream(this.props.screamId)
    }
    handleClose=()=>{
        window.history.pushState(null,null,this.state.oldPath)
      
        this.setState({
            open : false,
           
           
        })
        this.props.clearErrors();
    }
   
    render() {
        const {
          classes,
          scream: {
            screamId,
            body,
            createdAt,
            likeCount,
            commentCount,
            comments,
            userHandle,
            userImage,
          },
          ui: { loading },
        } = this.props;
        
        const dialogMarkup = loading ? (
                <div className={classes.progress}>
                    <CircularProgress size ={200} thickness={2}/>
                </div>
            ) : (<Grid container>
                <Grid item sm = {5}>
                    <img src ={userImage} alt ="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm = {7}>
                    <Typography
                    component = {Link}
                    color="primary"
                    variant="h5"
                    to={`/user/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisible}/>
                    <Typography variant="body2" style={{color:'grey'}}>
                        {dayjs(createdAt).format('h:mm a,MMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisible}/> 
                    <Typography variant ="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
            <span>{likeCount} likes</span>
            <MyButton tip ="comments">
            <ChatIcon color="primary"/>
        </MyButton>
        <span> {commentCount} Comments</span>
                </Grid>
                <hr className={classes.visible}/> 
                <CommentForm screamId ={screamId}/>
                <Comments comments={comments}/>
            </Grid>
            
            
            )
            return (
           <Fragment>
               <MyButton onClick ={this.handleOpen} tip="Expand Scream" tipClassName={classes.expandButton}>
                   <UnfoldMore color="primary"/>
               </MyButton>
               <Dialog open = {this.state.open} onClose = {this.handleClose} fullWidth maxWidth ="sm">
                      <MyButton tip ="Close" onClick={this.handleClose} tipClassName= {classes.closeButton}>
                          <CloseIcon/>
                      </MyButton>
                      <DialogContent className={classes.DialogContent}>
                          {dialogMarkup}
                      </DialogContent>

               </Dialog>
           </Fragment>
        )
    }
}
ScreamDialog.propTypes = {
    getScream : PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream:PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
}

const mapStateToProps=(state)=>(
    {
        ui: state.ui,
        scream:state.data.scream
        
    }
)
const mapActionToProps={
    getScream,
    clearErrors
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(ScreamDialog))
