import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessages } from '../../redux/action/dataAction';
import dayjs from 'dayjs';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';



const styles =(theme)=>({
    ...theme.spreadThis,
    msgMain:{
        position:'relative',
        flex: 'auto',
        marginTop:20
    },
    chatName:{
        color:theme.palette.primary.main,
        backgroundColor:'#fff',
        margin:'5px 0 10px 0',
        padding:2,
        width:'100%',
        borderRadius:50

    },
    profileImage:{
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'

    },

    rightSide:{
        display:'flex',
        justifyContent:'flex-end',
        padding:10,
        margin:'2px 0 4px auto',
    backgroundColor:theme.palette.primary.main,
        maxWidth:'80%',
        width:'fit-content',
        borderRadius:'30% 2% 10% 20% '
       
    },
    leftSide:{
        display:'flex',
        justifyContent:'flex-start',
        padding:10,
        margin:'2px auto 4px 0',
    backgroundColor:'#fff',
        maxWidth:'80%',
        width:'fit-content',
        borderRadius:'2% 30% 20% 10% '
    },
    body:{
        display: 'flex',
    alignItems:' center',
    width:'100%',
    
    },
    time:{
        display: 'flex',
        bottom:5,
        right:3,
        fontSize:10,
        margin:1,
        padding:2,

    }
   
})

 class GetChat extends Component {
    componentDidMount(){
        this.props.getMessages(this.props.recepient);    
     }
    render() {

        const{classes , profile:{imageUrl}} = this.props
        const { handle }= this.props.user.credentials
        const messages=this.props.messages
        const { loading }=this.props.data
        const receiver = this.props.recepient
        // eslint-disable-next-line
        let displayMessages = !loading ? (messages.map((msg,i)=>{
            const {body,sender,createdAt } = msg
             if(sender === handle){
                return(
                    <div className={classes.msgContainer} >
                        <div className={classes.rightSide}>
                            <div>
                <p className={classes.body} style={{color:"#fff"}}>{ReactEmoji.emojify(body)}</p>
                <p className={classes.time}style={{color:"#fff"}}>{dayjs(createdAt).format('h:mm A')}</p>
                </div>
                        </div>
                    </div>
                    )
            }
            else if(sender === receiver)
            {
                return(
                    <div className={classes.msgContainer} >
                    <div className={classes.leftSide}>
                        <div>
            <p className={classes.body} >{ReactEmoji.emojify(body)}</p>
            <p className={classes.time}>{dayjs(createdAt).format('h:mm A')}</p>
            </div>
                    </div>
                </div>
                    )
            }
           
        }
        )):null
        return (
            <div className={classes.msgMain}>
                <Grid container spacing={1} className={classes.chatName}>
                    <Grid item sm={3}>
                    <img src = { imageUrl } alt = "profile" className={classes.profileImage}/>
                    </Grid>
                    <Grid item sm={9}>
                    <h1>{this.props.recepient}</h1>
                    </Grid>
                </Grid>
                <ScrollToBottom>
                {displayMessages}
                </ScrollToBottom>
                <br/>
                <br/>
                <br/>
                
            </div>
        ) 
        
    }
}

GetChat.propTypes={
    getMessages:PropTypes.func.isRequired,
    messages:PropTypes.array.isRequired,
    user:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    data:PropTypes.object.isRequired
  
}
const mapStateToProps=(state)=>({
    messages : state.data.messages,
   data :state.data,
    user:state.user
})


export default connect(mapStateToProps,{getMessages})(withStyles(styles)(GetChat))
