import React, { Component,Fragment } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from '../Scream/PostScream';
import Notifications from './Notifications';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ChatIcon from '@material-ui/icons/Chat';


import  HomeIcon  from '@material-ui/icons/Home';
//import  Notifications  from '@material-ui/icons/Notifications';

export class Navbar extends Component {
    render() {
        const {authenticated} = this.props;
        return (
           <AppBar>
               <Toolbar className="nav-container">
                   {
                       authenticated ? ( <Fragment>
                           <PostScream/>
                           <Link to="/">
                           <MyButton tip ="Home">
                                <HomeIcon />
                           </MyButton>
                           </Link>
                                <Notifications />
                                <Link to="/chat">
                                    <MyButton tip="Chat">
                                    <ChatIcon />
                                    </MyButton>
                                    </Link>
 
                       </Fragment>) : ( <Fragment>
                        <Button color ="inherit" component={Link} to ="/">Home</Button>
                <Button color ="inherit" component={Link} to ="/login">Login</Button>
                <Button color ="inherit" component={Link} to ="/signup">Signup</Button>

                       </Fragment>

                           )
                   }
               
               </Toolbar>
           </AppBar>
        )
    }
}

Navbar.propType={
    authenticated:PropTypes.bool.isRequired
}


const mapStateToProps =(state)=>({
    authenticated : state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
