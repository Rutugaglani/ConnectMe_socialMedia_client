 /* eslint-disable */

import React, { Component } from 'react';
import withStyles  from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppIcon from '../images/main.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import{ loginUser } from '../redux/action/userAction';

const styles={
    html:{
        backgroundColor:"#fff !important",
    },
    form : {
        textAlign : 'center'
    },
    image:{
        margin: '10px auto 10px auto',
        width:200,
        height : 200,
    },
    title:{
        margin:'10px auto 10px auto',
    },
    textField:{
        margin: '10px auto 10px auto'
    },
    button:{
        marginTop:20,
    },
    progress:{
        position:'absolute',
    },
    
    customError:{
    color : 'red',
    fontSize:'0.8rem',
    marginTop:10
    }
}

 class login extends Component {
    constructor()
    {
        super();
        this.state={
            email:'',
            password: '',
            errors : {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
            this.setState({ errors :nextProps.ui.errors});
        }
        
    }

    handleSubmit =(e)=>{
        console.log('hellooossss');
        e.preventDefault();
        const userData ={
            email : this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData , this.props.history) ;
       

    };
    handleChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
     
    render() {

const {classes, ui:{ loading } } =this.props;
const { errors } = this.state;

        return (
           <Grid container className={classes.form}>
               <Grid item sm/>
               <Grid item sm>
                   <img src ={AppIcon} alt = "monkey" className ={classes.image}/>
                   <Typography variant ="h3" className ={classes.title}>Login</Typography> 
                   <form noValidate onSubmit={this.handleSubmit}>
                       <TextField 
                       id="email" 
                       name="email" 
                       type="email"
                        label="Email" 
                        className={classes.textField}
                       helperText={errors.email}
                        error={errors.email ? true:false}
                       value={this.state.email} 
                       onChange={this.handleChange} 
                       fullWidth />
                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        helperText={errors.password} 
                        error={errors.password ? true:false}
                       value={this.state.password} 
                       onChange={this.handleChange} 
                       fullWidth />
                       { errors.general &&(
                           <Typography variant="body2" className={classes.customError}>
                               {errors.general}
                           </Typography>
                       )}
                       <Button type ="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                           Login
                           { loading && ( <CircularProgress size={30} className={classes.progress}/>)}
                       </Button><br/>
                       <small>Dont have an account ? Sign up <Link to="/signup">here</Link></small>


                   </form>
               </Grid>
               <Grid item sm/>

           </Grid>
        )
    }
}

login.propTypes={
    classes : PropTypes.object.isRequired,
    loginUser : PropTypes.func.isRequired,
    user : PropTypes.object.isRequired,
    ui : PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    user : state.user,
    ui : state.ui
})
const mapActionToProps = {
    loginUser
}

export default connect(mapStateToProps , mapActionToProps)(withStyles(styles)(login));
