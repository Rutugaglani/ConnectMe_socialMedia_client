import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream/Scream';
import Profile from '../components/Profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';

import { connect } from 'react-redux';
 
import PropTypes from 'prop-types';

 class home extends Component {
    componentDidMount(){
       this.props.getScreams();
    }
    render() {
        const { screams ,loading} = this.props.data;
        let recentScreamsMarkup= !loading ? (
       screams.map((scream,i) => <Scream key={scream.screamId} scream={scream}/>)
        ):<ScreamSkeleton/>
        return (
            <div>
                <Grid container spacing={10}>
                    <Grid item sm ={8} xs={12}>
                        {recentScreamsMarkup}
                        
                    </Grid>
                    <Grid item sm ={4} xs={12}>
                        <Profile></Profile>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

home.propTypes ={
    getScreams : PropTypes.func.isRequired,
    data : PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
    data : state.data
})
   

export default connect(mapStateToProps, {getScreams})(home);
