import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Modal, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getTraineeInfo,
  updateTraineNutrition,
  updateUserProfile,
} from "../actions/userActions";
import moment from "moment";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

function TraineeDetails({ id }) {
  const dispatch = useDispatch();

  const traineeInfo = useSelector((state) => state.traineeInfo);
  const { loading, success, error, personelInfo } = traineeInfo;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [weightGoal, setWeightGoal] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex] = useState("");
  const [activitie, setActivitie] = useState("");
  const [objective, setObjective] = useState("");
  const [experience, setExperience] = useState("");
  const [equipement, setEquipement] = useState("");
  const [days, setDays] = useState("");
  const [healthIssues, setHealthIssues] = useState("");

  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");

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
        setWeightGoal(personelInfo["userProfile"].weightGoal);
        setBirthDate(personelInfo["userProfile"].birthDate);
        setSex(personelInfo["userProfile"].sex);
        setActivitie(personelInfo["userProfile"].activitie);
        setObjective(personelInfo["userProfile"].objective);
        setExperience(personelInfo["userProfile"].experience);
        setEquipement(personelInfo["userProfile"].equipement);
        setHealthIssues(personelInfo["userProfile"].healthIssues);
        setDays(personelInfo["userProfile"].days);
        setProtein(personelInfo["userProfile"].proteines);
        setCalories(personelInfo["userProfile"].calories);
        setCarbs(personelInfo["userProfile"].carbs);
      } catch (error) {
        console.log(error);
      }
    }
  }, [success]);

  const handleSaveNutrition = (e) => {
    e.preventDefault();
    dispatch(
      updateTraineNutrition(
        {
          calories,
          carbs,
          proteines: protein,
        },
        id
      )
    );
  };

  return (
    <div>
      <h1>Personal Info :</h1>
      <Form className="pb-5 justify-content-md-center">
        <Row className="col-md-6 justify-content-md-center">
          <Col xs="6">
            <Form.Label>Name : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={name}
              readOnly
            />
          </Col>
          <Col xs="6">
            <Form.Label>Email address : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={email}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col xs="6">
            <Form.Label>Height : </Form.Label>
            <Form.Control
              readOnly
              className="justify-content-md-center"
              value={height}
            />
          </Col>
          <Col xs="6">
            <Form.Label>Weight : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={weight}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col xs="6">
            <Form.Label>Weight Goal : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={weightGoal}
              readOnly
            />
          </Col>
          <Col xs="6">
            <Form.Label>Birthdate : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={moment(birthDate).format("DD - MM - YYYY")}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col xs="6">
            <Form.Label>Sex : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={sex}
              readOnly
            />
          </Col>
          <Col xs="6">
            <Form.Label>Activitie : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={activitie}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col xs="6">
            <Form.Label>Experience : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={experience}
              readOnly
            />
          </Col>
          <Col xs="6">
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
          <Col xs="6">
            <Form.Label>Equipement : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={equipement}
              readOnly
            />
          </Col>
          <Col xs="6">
            <Form.Label>Days : </Form.Label>
            <Form.Control
              className="justify-content-md-center"
              value={days}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col xs="12">
            <Form.Label>Health Issues : </Form.Label>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              value={healthIssues}
              readOnly
            />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col xs="4">
            <Form.Label>Calories :</Form.Label>
            <Form.Control
              value={calories}
              className="justify-content-md-center"
              onChange={(e) => setCalories(e.target.value)}
              type="number"
            />
          </Col>
          <Col xs="4">
            <Form.Label>Carbs :</Form.Label>
            <Form.Control
              value={carbs}
              className="justify-content-md-center"
              onChange={(e) => setCarbs(e.target.value)}
              type="number"
            />
          </Col>
          <Col xs="4">
            <Form.Label>Proteins :</Form.Label>
            <Form.Control
              value={protein}
              className="justify-content-md-center"
              onChange={(e) => setProtein(e.target.value)}
              type="number"
            />
          </Col>
        </Row>
        <Row className="col-md-6">
          <Col xs="12" className="mt-2">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSaveNutrition}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default TraineeDetails;
