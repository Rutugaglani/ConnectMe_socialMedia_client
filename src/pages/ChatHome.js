import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Profile from '../components/Profile/Profile';


import { connect } from 'react-redux';
import { getAllUsers} from '../redux/action/dataAction';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import withStyles  from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const styles ={
    card :{
        position : 'relative',
        display :'flex',
        marginBottom : 20,
        height:100,
        

    },
    image:
    {
        minWidth:100,
        borderRadius:'50%'
    },
    content : {
        padding : 25,
    },
  
}

 class ChatHome extends Component {
   
    componentDidMount(){
       this.props.getAllUsers();
    }

    render() {
        const { users ,loading } = this.props.data;
        const { credentials }=this.props.user
        const { classes}=this.props;
 

        let usersMarkup= !loading ?(
            users.filter((user)=>{
                return user.userHandle !== credentials.handle
            }).map((user,i) => {
           return(
            <Card className ={ classes.card}>
            <CardMedia
             image={user.userImage}
             title ="Profile Image" className ={ classes.image}/>
             <CardContent className ={ classes.content}>
     <Typography variant = "h5" color ="primary" component={Link} to ={`/chat/${user.userHandle}`}>{user.userHandle} </Typography>
             </CardContent>
        </Card>
           )
       })
        ):null
        return (
            <div>
                <Grid container spacing={10}>
                    <Grid item sm ={8} xs={12} className={classes.cover}>
                        {usersMarkup}  
                    </Grid>
                    <Grid item sm ={4} xs={12}>
                        <Profile></Profile>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

ChatHome.propTypes ={
    getAllUsers : PropTypes.func.isRequired,
    data : PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
}
const mapStateToProps=(state)=>({
    data : state.data,
    user:state.user
})
   

export default connect(mapStateToProps, {getAllUsers})(withStyles(styles)(ChatHome));
