import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

import  FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { connect } from 'react-redux';
import { likeScream,unlikeScream} from '../../redux/action/dataAction';

 class LikeButton extends Component {
    likedScream =()=> {
        if(this.props.user.likes &&
            this.props.user.likes.find( 
                like => like.screamId === this.props.screamId))
        return true;
        else return false;
    }
   likeScream =()=>{
       this.props.likeScream(this.props.screamId);
   }
   unlikeScream =()=>{
       this.props.unlikeScream(this.props.screamId);
   }
    render() {
        const { authenticated} =this.props.user;
        const likeButton = !authenticated ?(
            <Link to="/login">
                <MyButton tip ="like">     
                <FavoriteBorder color="primary"/>
        </MyButton> 
        </Link> 
        ) : (
            this.likedScream() ? (
                <MyButton tip ="Undo Like">  
                <FavoriteIcon color="primary" onClick={this.unlikeScream}/>
        </MyButton>

            ): <MyButton tip ="Like">  
            <FavoriteBorder color="primary" onClick={this.likeScream}/>
    </MyButton>
        )
        return likeButton;
    }
}
LikeButton.propTypes={
    likeScream : PropTypes.func.isRequired,
    unlikeScream : PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    screamId:PropTypes.string.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user
  });
const mapActionToProps ={
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps,mapActionToProps)(LikeButton)
