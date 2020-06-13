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
import{ signupUser } from '../redux/action/userAction';

const styles={
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
    



 class signup extends Component {
    constructor()
    {
        super();
        this.state={
            email:'',
            password: '',
            confirmPassword:'',
            handle:'',
           
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
        this.setState({
            loading: true,
        })

        const newUserData ={
            email : this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData , this.props.history) ;
        axios.post('/signup',newUserData)
        .then(res =>{
            console.log(res.data);
            localStorage.setItem('FBIdToken',`Bearer ${res.data.token}`);
            this.setState({
                loading:false
            });
            this.props.history.push('/');
        })
        .catch(err =>{
            this.setState({
                errors : err.response.data,
                loading:false
            })
          
        })

    };
    handleChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    render() {

const {classes , ui:{ loading }} =this.props;
const { errors} = this.state;

        return (
           <Grid container className={classes.form}>
               <Grid item sm/>
               <Grid item sm>
                   <img src ={AppIcon} alt = "monkey" className ={classes.image}/>
                   <Typography variant ="h3" className ={classes.title}>Signup</Typography> 
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
                                               <TextField 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password" 
                        className={classes.textField}
                        helperText={errors.confirmPassword} 
                        error={errors.confirmPassword ? true:false}
                       value={this.state.confirmPassword} 
                       onChange={this.handleChange} 
                       fullWidth />
                     <TextField 
                        id="handle" 
                        name="handle" 
                        type="handle" 
                        label="Handle" 
                        className={classes.textField}
                        helperText={errors.handle} 
                        error={errors.handle ? true:false}
                       value={this.state.handle} 
                       onChange={this.handleChange} 
                       fullWidth />
                       { errors.general &&(
                           <Typography variant="body2" className={classes.customError}>
                               {errors.general}
                           </Typography>
                       )}
                       <Button type ="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                           Signup
                           { loading && ( <CircularProgress size={30} className={classes.progress}/>)}
                       </Button><br/>
                       <small>Already have an account ? Login <Link to="/login">here</Link></small>


                   </form>
               </Grid>
               <Grid item sm/>

           </Grid>
        )
    }
}
signup.propTypes={
    classes : PropTypes.object.isRequired,
    signupUser  : PropTypes.func.isRequired,
    user : PropTypes.object.isRequired,
    ui : PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    user : state.user,
    ui : state.ui
})


export default connect(mapStateToProps , { signupUser  })(withStyles(styles)(signup));

