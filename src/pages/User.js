import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import axios from 'axios';
import Scream from '../components/Scream/Scream';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
import Grid from '@material-ui/core/Grid';
import { getUserData } from '../redux/action/dataAction'
import StaticProfile from '../components/Profile/StaticProfile'

const styles=(theme)=>({
    ...theme.spreadThis
})

export class User extends Component {
    state={
        profile:null,
        screamIdParam: null
    }
    componentDidMount(){
        //match:to obtain details from pathname
        const handle=this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if(screamId) this.setState({ screamIdParam : screamId});

        this.props.getUserData(handle);
        //static page so we can directly fetch the data
        axios.get(`/user/${handle}`)
        .then(res=>{
            this.setState({
                profile:res.data.user
            })
        })
        .catch(err => console.log(err));
    }
    render() {
        const { screamIdParam } = this.state;

        const { screams, loading } =this.props.data;
        const screamsMarkup = loading ? (
            <ScreamSkeleton />
          ) : screams === null ? (
            <p>No screams from this user</p>
          ) : !screamIdParam ? (
            screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
          ) : (
            screams.map((scream) => {
              if (scream.screamId !== screamIdParam)
                return <Scream key={scream.screamId} scream={scream} />;
              else return <Scream key={scream.screamId} scream={scream} openDialog />;
            })
          );
        return (
            <div>
                <Grid container spacing={10}>
                    <Grid item sm ={8} xs={12}>
                        {screamsMarkup}
                        
                    </Grid>
                    <Grid item sm ={4} xs={12}>
                       {
                           this.state.profile === null ?(
                               <ProfileSkeleton />
                           ):( <StaticProfile profile={this.state.profile}/>)
                       }
                    </Grid>

                </Grid>
            </div>
        )
    }
}
User.propTypes={
    data:PropTypes.object.isRequired,
    getUserData:PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired,
}
const mapStateToProps=(state)=>({
    data : state.data
})

export default connect(mapStateToProps,{getUserData})(withStyles(styles)(User))
