import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Modal, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getTraineeInfo } from "../actions/userActions";
function TraineeDetails({ id }) {
  const dispatch = useDispatch();

  const traineeInfo = useSelector((state) => state.traineeInfo);
  const { loading, success, error, personelInfo } = traineeInfo;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex] = useState("");
  const [activitie, setActivitie] = useState("");
  const [objective, setObjective] = useState("");
  const [experience, setExperience] = useState("");
  const [equipement, setEquipement] = useState("");
  const [days, setDays] = useState("");
  const [healthIssues, setHealthIssues] = useState("");

  useEffect(() => {
    dispatch(getTraineeInfo(id));
  }, [dispatch]);

  useEffect(() => {
    if (traineeInfo !== undefined) {
      try {
        console.log("personelInfo : ", personelInfo);
        setName(personelInfo.first_name);
        setEmail(personelInfo.email);
        setHeight(personelInfo["userProfile"].height);
        setWeight(personelInfo["userProfile"].weight);
        setBirthDate(personelInfo["userProfile"].birthDate);
        setSex(personelInfo["userProfile"].sex);
        setActivitie(personelInfo["userProfile"].activitie);
        setObjective(personelInfo["userProfile"].objective);
        setExperience(personelInfo["userProfile"].experience);
        setEquipement(personelInfo["userProfile"].equipement);
        setHealthIssues(personelInfo["userProfile"].healthIssues);
        setDays(personelInfo["userProfile"].days);
      } catch (error) {
        console.log(error);
      }
    }
  }, [success]);

  return (
    <div>
      <h1>Personal Info :</h1>
      <Form className="pb-5 justify-content-md-center">
        <Row className="col-md-6 justify-content-md-center">
          <Col>
            <Form.Label>Name : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={name}
              readOnly
            />
          </Col>
          <Col>
            <Form.Label>Email address : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={email}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col>
            <Form.Label>Height : </Form.Label>
            <Form.Control
              readOnly
              className="justify-content-md-center"
              value={height}
            />
          </Col>
          <Col>
            <Form.Label>Weight : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={weight}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col className="col-md-4">
            <Form.Label>Birthdate : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={birthDate}
              readOnly
            />
          </Col>
          <Col className="col-md-2">
            <Form.Label>Sex : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={sex}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col>
            <Form.Label>Activitie : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={activitie}
              readOnly
            />
          </Col>
          <Col>
            <Form.Label>Experience : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={experience}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col className="col-md-4">
            <Form.Label>Equipement : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={equipement}
              readOnly
            />
          </Col>
          <Col className="col-md-2">
            <Form.Label>Days : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={days}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col className="col-md-6">
            <Form.Label>Objective : </Form.Label>
            <Form.Control
              placeholder="Enter Objective"
              className="justify-content-md-center"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col className="col-md-5">
            <Form.Label>Health Issues : </Form.Label>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              value={healthIssues}
              readOnly
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default TraineeDetails;
