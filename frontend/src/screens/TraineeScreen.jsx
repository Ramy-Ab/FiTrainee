import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTraineeInfo, updateTraineProfile } from "../actions/userActions";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import SideBar from "../components/SideBar";
import Side from "../components/Side";
import TraineeOrder from "./traineeOrderScreen";
import NavbarTrainee from "../components/NavbarTrainee";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import profilIcon from "../assets/profilIcon.svg";
import resume from "../assets/resume.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TraineeScreen() {
  const classes = useStyles();

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUser, loading: loadingUser, user } = userDetails;

  const traineeInfo = useSelector((state) => state.traineeInfo);
  const { loading, success, error, personelInfo } = traineeInfo;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex] = useState("");
  const [activitie, setActivitie] = useState("");
  const [experience, setExperience] = useState("");
  const [equipement, setEquipement] = useState("");
  const [days, setDays] = useState("");
  const [healthIssues, setHealthIssues] = useState("");
  const [objective, setObjective] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getTraineeInfo(userInfo.id));
    console.log("dispatched");
  }, [dispatch]);

  useEffect(() => {
    if (traineeInfo !== undefined) {
      try {
        console.log("personelInfo : ", traineeInfo);
        setName(personelInfo.first_name);
        setEmail(personelInfo.email);
        setHeight(personelInfo["userProfile"].height);
        setWeight(personelInfo["userProfile"].weight);
        setBirthDate(personelInfo["userProfile"].birthDate);
        setSex(personelInfo["userProfile"].sex);
        setActivitie(personelInfo["userProfile"].activitie);
        setExperience(personelInfo["userProfile"].experience);
        setEquipement(personelInfo["userProfile"].equipement);
        setHealthIssues(personelInfo["userProfile"].healthIssues);
        setDays(personelInfo["userProfile"].days);
        setObjective(personelInfo["userProfile"].objective);
      } catch (error) {
        console.log(error);
      }
    }
  }, [success]);

  const handleUpdate = () => {
    dispatch(
      updateTraineProfile(
        {
          name: name,
          email: email,
          password: password,
          height: height,
          weight: weight,
          birthDate: birthDate,
          sex: sex,
          activitie: activitie,
          experience: experience,
          equipement: equipement,
          days: days,
          healthIssues: healthIssues,
          objective: objective,
        },
        37
      )
    );
  };
  console.log("printing info :", {
    name: name,
    email: email,
    password: password,
    height: height,
    weight: weight,
    birthDate: birthDate,
    sex: sex,
    activitie: activitie,
    experience: experience,
    equipement: equipement,
    days: days,
    healthIssues: healthIssues,
  });

  return (
    <div className="traineDash">
      <Row>
        <Col className="col-md-2">
          <Side />
        </Col>
        <Col className="col-md-4 p-5 left">
          <Paper elevation={3}>
            <Row className="justify-content-center">
              <Col md={10} className="text-center justify-content-center">
                <h2 className="h-black">User Profile</h2>
                <img
                  src={profilIcon}
                  alt="profileIcon"
                  style={{ height: "70px", weight: "70px" }}
                />

                {/* {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />} */}
                <Form>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      size="lg"
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
                      size="lg"
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
                      size="lg"
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </Form>
              </Col>
            </Row>
          </Paper>
        </Col>
        <Col className="col-md-6   p-5 left">
          <Paper elevation={3}>
            <Row className="justify-content-center text-center">
              <h2 className="h-black">Personal Info :</h2>
              <img
                className="mb-2"
                src={resume}
                alt="resume"
                style={{ height: "70px", weight: "70px" }}
              />
            </Row>
            <Row className="col-md-12 justify-content-md-center">
              <Col>
                <Form.Label>Height : </Form.Label>
                <Form.Control
                  placeholder="Enter Height"
                  // readOnly
                  className="justify-content-md-center"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Weight : </Form.Label>
                <Form.Control
                  className="justify-content-md-center"
                  placeholder="Enter Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  // readOnly
                />
              </Col>
            </Row>
            <Row className="col-md-12 justify-content-md-center">
              <Col className="col-md-4">
                <Form.Label>Birthdate : </Form.Label>
                <Form.Control
                  placeholder="Enter Birthdate"
                  className="justify-content-md-center"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  // readOnly
                />
              </Col>
              <Col className="col-md-2">
                <Form.Label>Sex : </Form.Label>
                <Form.Control
                  placeholder="Enter Sex"
                  className="justify-content-md-center"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  // readOnly
                />
              </Col>
            </Row>
            <Row className="col-md-12 justify-content-md-center">
              <Col>
                <Form.Label>Activitie : </Form.Label>
                <Form.Control
                  placeholder="Enter Activitie"
                  className="justify-content-md-center"
                  value={activitie}
                  onChange={(e) => setActivitie(e.target.value)}
                  // readOnly
                />
              </Col>
              <Col>
                <Form.Label>Experience : </Form.Label>
                <Form.Control
                  className="justify-content-md-center"
                  placeholder="Enter Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  // readOnly
                />
              </Col>
            </Row>
            <Row className="col-md-12 justify-content-md-center">
              <Col className="col-md-4">
                <Form.Label>Equipement : </Form.Label>
                <Form.Control
                  placeholder="Enter Equipement"
                  className="justify-content-md-center"
                  value={equipement}
                  onChange={(e) => setEquipement(e.target.value)}
                  // readOnly
                />
              </Col>
              <Col className="col-md-2">
                <Form.Label>Days : </Form.Label>
                <Form.Control
                  placeholder="Enter Days"
                  className="justify-content-md-center"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  // readOnly
                />
              </Col>
            </Row>
            <Row className="col-md-12 justify-content-md-center">
              <Col className="col-md-6">
                <Form.Label>Objective : </Form.Label>
                <Form.Control
                  placeholder="Enter Objective"
                  className="justify-content-md-center"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  // readOnly
                />
              </Col>
            </Row>
            <Row className="col-md-12 justify-content-md-center">
              <Col className="col-md-7">
                <Form.Label>Health Issues : </Form.Label>
                <Form.Control
                  placeholder="write here"
                  as="textarea"
                  aria-label="With textarea"
                  value={healthIssues}
                  onChange={(e) => setHealthIssues(e.target.value)}
                  // readOnly
                />
              </Col>
            </Row>
          </Paper>
        </Col>
      </Row>
    </div>
  );
}

export default TraineeScreen;
