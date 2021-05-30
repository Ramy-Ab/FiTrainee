import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Table , Container } from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function ProfileAdmin({history}) {
  const classes = useStyles();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
        history.push('/login')
    } else {
        if (!user || !user.name || success || userInfo._id !== user._id) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }
}, [dispatch, history, userInfo, user, success])

const submitHandler = (e) => {
    e.preventDefault()

    if (password != confirmPassword) {
        setMessage('Passwords do not match')
    } else {
        dispatch(updateUserProfile({
            'id': user._id,
            'name': name,
            'email': email,
            'password': password
        }))
        setMessage('')
        dispatch(getUserDetails('profile'))
    }

}

  return (
    <div className={classes.root}>
      <Paper elevation={3} >
        <Row className="justify-content-center">
        <Col md={4} className="text-center justify-content-center">
        
                <h2 style={{color : 'black'}}>User Profile</h2>
                <Avatar style={{backgroundColor:"green"}} md="3" style={{marginLeft : '45%' , backgroundColor:'green',height:'50px',width:'50px'}}> {userInfo.name[0]}</Avatar>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name' >
                        <Form.Label >Name</Form.Label>
                        <Form.Control
                            size='lg'
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                          
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            size='lg'
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            size='lg'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            size='lg'
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant="contained" color="primary"  size="large"  startIcon={<SaveIcon />}>
                        Update
                    </Button>

                </Form>
            </Col>
        </Row>

        
        
     
      </Paper>
    </div>
  );
}