import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage} from '../../redux/action/dataAction';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/Send';
import withStyles  from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

const styles =(theme)=>({
    ...theme.spreadThis,

    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width:'100%',
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
})

export class Chat extends Component {
    state={
        message:'',
        recepient:''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
      handleSubmit = (e) => {
        e.preventDefault();
       
        this.props.sendMessage( {body:this.state.message},this.props.recepient);
        this.setState({
            recepient:this.props.recepient,
            message:''
        })

        console.log(this.state)
      };

    render() {
        const{ authenticated , classes} =this.props;
        const messageInput= authenticated ? (<Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          type="text"
          placeholder="Type a message ..."
          name="message"
          onChange={this.handleChange}
          value={this.state.message}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <MyButton tip ="send" btnClassName={classes.iconButton} onClick={this.handleSubmit}>
            <SendIcon color="primary"/>
        </MyButton>
      </Paper>):(null)
        return messageInput;
    }
}
Chat.propTypes={
    sendMessage:PropTypes.func.isRequired,
    authenticated:PropTypes.bool.isRequired,
    classes:PropTypes.object.isRequired
   
}
const mapStateToProps=(state)=>({
  
    authenticated:state.user.authenticated
})



export default connect(mapStateToProps,{sendMessage})(withStyles(styles)(Chat));
