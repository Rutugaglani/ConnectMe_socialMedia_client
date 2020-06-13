import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postScream , clearErrors} from '../../redux/action/dataAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MyButton from '../../util/MyButton';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import  AddIcon  from '@material-ui/icons/Add';
import  CloseIcon  from '@material-ui/icons/Close';


const styles=(theme)=>({
    ...theme.spreadThis,
    submitButton:{
        position:'relative',
        float:'right',
        marginTop:'10'
    },
    progress:{
        position:'absolute'
    },
    closeButton:{
        position:'absolute',
        left:'91%',
        top:'6%'
    }
})

export class PostScream extends Component {
    state ={
        open: false,
        body : '',
        errors :{}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
            this.setState({ errors :nextProps.ui.errors});
        };
        if(!nextProps.ui.errors && !nextProps.ui.loading)
        {
            this.setState({
                body:'',
                open : false,
                errors:{} 
            })
          
        }
        
    }
    handleOpen=()=>{
        this.setState({
            open : true
        })
    }
    handleClose=()=>{
        this.props.clearErrors();
        this.setState({
            open : false,
            errors:{}
        })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.postScream({ body: this.state.body });
      };

    render() {
        const { errors }= this.state;
        const { classes, ui:{loading}} = this.props

        return (
           <Fragment>
               <MyButton onClick ={this.handleOpen} tip="POST A SCREAM !">
               <AddIcon/>
               </MyButton>
              <Dialog
                  open = {this.state.open} onClose = {this.handleClose} fullWidth maxWidth ="sm">
                      <MyButton tip ="Close" onClick={this.handleClose} tipClassName= {classes.closeButton}>
                          <CloseIcon/>

                      </MyButton>
                      <DialogTitle>Post a new scream</DialogTitle>
                      <DialogContent>
                          <form onSubmit={this.handleSubmit}>
                              <TextField 
                              name='body' 
                              type="text"
                              label="SCREAM!!"
                              multiline 
                              rows="3"
                              placeholder="Post a new Scream"
                              error = {errors.body ? true : false}
                              helperText={errors.body}
                              className={classes.textField}
                              onChange={this.handleChange}
                              fullWidth
                              />
                              <br/>
                              <br/>
                              <Button type ="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                  Submit
                                  {
                                      loading && (<CircularProgress size={30} className={classes.progress}/>)
                                  }
                              </Button>
                          </form>
                      </DialogContent>

               </Dialog>

           </Fragment>
        )
    }
}
PostScream.propTypes={
    ui: PropTypes.object.isRequired,
    postScream: PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired,
}
const mapStateToProps=(state)=>({
    ui : state.ui
})

export default connect(mapStateToProps,{postScream ,clearErrors })(withStyles(styles)(PostScream))
