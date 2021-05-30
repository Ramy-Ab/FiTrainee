import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';  
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import Button from '@material-ui/core/Button';
import { Fragment } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import Icon from '@material-ui/core/Icon';

function FormProductEdit({show}) {

    const [open, setOpen] = React.useState(true);
    console.log('showww',open)

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleToggle = () => {

    }

    return (
        <Fragment>

        <Button variant='fab' color='primary' mini onClick={handleClickOpen}>
            <Icon style={{ fontSize: 40 }} color="primary">add_circle</Icon>

        </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant='raised'>
            Save
          </Button>
        </DialogActions>
      </Dialog>   
        </Fragment>
    )
}

export default FormProductEdit
