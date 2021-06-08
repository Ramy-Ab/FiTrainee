import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import SideBar from "../components/SideBar";
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

  return (
    <div className="traineDash">
      <Row>
        <Col className="col-md-1">
          <SideBar />
        </Col>
        <Col className="col-md-4 p-5 left">
          <Paper elevation={3}>
            <Row className="justify-content-center">
              <Col md={10} className="text-center justify-content-center">
                <h2 style={{ color: "black" }}>User Profile</h2>
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
                      // value={name}
                      // onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      size="lg"
                      required
                      type="email"
                      placeholder="Enter Email"
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      placeholder="Enter Password"
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      placeholder="Confirm Password"
                      // value={confirmPassword}
                      // onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                  >
                    Update
                  </Button>
                </Form>
              </Col>
            </Row>
          </Paper>
        </Col>
        <Col className="col-md-6 p-5 left">
          <Paper elevation={3}>
            <Row className="justify-content-center">
              <h2 style={{ color: "black", marginLeft: "25rem" }}>
                Personal Info :
              </h2>
              <img
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
                  // value={height}
                />
              </Col>
              <Col>
                <Form.Label>Weight : </Form.Label>
                <Form.Control
                  className="justify-content-md-center"
                  placeholder="Enter Weight"
                  // value={weight}
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
                  // value={birthDate}
                  // readOnly
                />
              </Col>
              <Col className="col-md-2">
                <Form.Label>Sex : </Form.Label>
                <Form.Control
                  placeholder="Enter Sex"
                  className="justify-content-md-center"
                  // value={sex}
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
                  // value={activitie}
                  // readOnly
                />
              </Col>
              <Col>
                <Form.Label>Experience : </Form.Label>
                <Form.Control
                  className="justify-content-md-center"
                  placeholder="Enter Experience"
                  // value={experience}
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
                  // value={equipement}
                  // readOnly
                />
              </Col>
              <Col className="col-md-2">
                <Form.Label>Days : </Form.Label>
                <Form.Control
                  placeholder="Enter Days"
                  className="justify-content-md-center"
                  // value={days}
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
                  // value={healthIssues}
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
