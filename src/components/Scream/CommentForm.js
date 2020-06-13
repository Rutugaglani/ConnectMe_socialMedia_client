import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitComment} from '../../redux/action/dataAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import withStyles from '@material-ui/core/styles/withStyles';


import Grid from '@material-ui/core/Grid';

const styles=(theme)=>({
    ...theme.spreadThis,
    button:{
        marginTop:20
    }
})



 class CommentForm extends Component {

     state={
         body:'',
         errors:{}
     }
    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
            this.setState({
                errors:nextProps.ui.errors
            });
        }
        if( !nextProps.ui.errors && !nextProps.ui.loading){
            this.setState({
                body:''
            })
        }
       
    }
     handleChange=(e)=>{
         this.setState({
             [e.target.name]:e.target.value
         })
     }
     handleSubmit=(e)=>{
         e.preventDefault();
         this.props.submitComment(this.props.screamId,{ body: this.state.body})

     }
    render() {
        const{ classes,authenticated} =this.props;
        const errors =this.state.errors
        const commentFormMarkup = authenticated ?  ( 
            <Grid item sm={12} style={{ textAlign : 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                    name='body'
                    type="text"
                    label='Comment on scream'
                    error={errors.comment ? true:false}
                    helperText={errors.comment}
                    value={this.state.body}
                    onChange={this.handleChange}
                    fullWidth
                    className={classes.textField}/>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
                <hr className={classes.visible}/>
            </Grid>

         ):null
        return commentFormMarkup
       
    }
}
CommentForm.propType={
    submitComment:PropTypes.func.isRequired,
    scream:PropTypes.object.isRequired,
    screamId:PropTypes.string.isRequired,
    ui:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    authenticated:PropTypes.bool.isRequired,
}
const mapStateToProps=(state)=>({
    ui:state.ui,
    authenticated:state.user.authenticated
})



export default connect(mapStateToProps,{submitComment})(withStyles(styles)(CommentForm));
