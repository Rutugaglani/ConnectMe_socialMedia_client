import React, { Component, Fragment } from 'react';
import MyButton from '../../util/MyButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline    from '@material-ui/icons/DeleteOutline'

import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { deleteScream} from '../../redux/action/dataAction';

import PropTypes from 'prop-types';

const styles={
    deleteButton: {
        left:'90%',
        top:'10%',
        position:'absolute',
        color:'#bd1212'
    }

}


class DeleteScream extends Component {
    state ={
        open :false
    };
    handleOpen=()=>{
        this.setState({
            open : true
        })
    }
    handleClose=()=>{
        this.setState({
            open : false
        })
    }
    deleteScream=()=>{
        this.props.deleteScream(this.props.screamId);
        this.setState({
            open : false
        })
    }
        render() {
        const {classes} = this.props
        return (
            <Fragment>
                <MyButton tip="Delete Scream" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline />
                </MyButton>
                <Dialog
                open= {this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Are you sure you want to delete this scream</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScream} >
                            Delete
                        </Button>
                        
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}
DeleteScream.propTypes={
    deleteScream:PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired,
    screamId:PropTypes.string.isRequired
}

export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream));
