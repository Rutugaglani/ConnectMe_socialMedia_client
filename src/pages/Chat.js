 import React, { Component } from 'react';
 import StaticProfile from '../components/Profile/StaticProfile'
 import Grid from '@material-ui/core/Grid';
import ChatInput from '../components/Chat/ChatInput'
import GetChat from '../components/Chat/GetChat'
import { getUserData} from '../redux/action/dataAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
 class Chat extends Component {
     state={
         recepient:null,
         profile:{}
    }
componentDidMount(){
    const handle =this.props.match.params.recepient
    axios.get(`/user/${handle}`)
    .then(res=>{
        this.setState({
            profile:res.data.user
        })
    })
    .catch(err => console.log(err));

    console.log(this.state)
}
     render() {
        console.log(this.state)
        const recepientParams=this.props.match.params.recepient;
         return (
             <Grid container spacing={6}>
 
                 <Grid item sm={8}>
                 <GetChat recepient={recepientParams} profile={this.state.profile}/>
                 <ChatInput recepient={recepientParams}/>
                 </Grid>
                 <Grid item sm={4}>
                     <StaticProfile  profile={this.state.profile}/>
                 </Grid>

             </Grid>
         );
     }
    }
   Chat.propTypes={
  
        getUserData:PropTypes.func.isRequired,
        classes:PropTypes.object.isRequired,
    }
    const mapStateToProps=(state)=>({
        data : state.data
    })



 export default connect(mapStateToProps,{getUserData}) (Chat);

