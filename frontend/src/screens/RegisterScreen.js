import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button as ButtonB, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register, traineeInfo } from "../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BasicButtonGroup from "../components/PersonalInfo";
import Activities from "../components/Activities";
import Consultation from "../components/Consultation";
import TrainingPlan from "../components/TrainingPlan";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "black",
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: "black",
  },
}));

function getSteps() {
  return [
    "setting up your account",
    "Personal Info",
    "Your Activities",
    "Your Objectives",
    "Training Plan",
  ];
}

function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const UserTrainee = useSelector((state) => state.UserTrainee);
  const { trainee } = UserTrainee;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  useEffect(() => {
    dispatch(traineeInfo({ ...trainee, name, email, password }));
  }, [name, email, password]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      console.log(trainee);
      dispatch(register(trainee));
    }
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* <ButtonB type="submit" variant="primary">
                Register
              </ButtonB> */}
            </Form>
          </div>
        );
      case 1:
        return <BasicButtonGroup />;
      case 2:
        return <Activities />;
      case 3:
        return <Consultation />;
      case 4:
        return <TrainingPlan />;
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <div className="login-header mt-5">
      <FormContainer>
        <div className="login-form pl-5 pr-5  pt-1 mt-5">
          <div className={classes.root}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className="stepper"
            >
              {steps.map((label) => (
                <Step className="h-white" key={label}>
                  <StepLabel className="h-white">{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed
                  </Typography>
                  <ButtonB
                    type="submit"
                    variant="primary"
                    onClick={submitHandler}
                  >
                    Register
                  </ButtonB>
                  <Button style={{ color: "white" }} onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <div>
                    <Button
                      style={{ color: "white" }}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Row className="py-3">
            <Col col-md-3>
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Sign In{" "}
                <p style={{ color: "#797c80", fontSize: "12px" }}>
                  if you already have acount
                </p>
              </Link>
            </Col>
          </Row>
        </div>
      </FormContainer>
    </div>
  );
}

export default RegisterScreen;
