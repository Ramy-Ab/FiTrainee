import React from "react";
import { Form, Modal, Row, Col } from "react-bootstrap";
function TraineeDetails({ name }) {
  return (
    <div>
      <h1>Personal Info :</h1>
      <Form className="pb-5">
        <Row className="col-md-6 justify-content-md-center">
          <Col>
            <Form.Label>Name : </Form.Label>
            <Form.Control className="justify-content-md-center" />
          </Col>
          <Col>
            <Form.Label>Email address : </Form.Label>
            <Form.Control className="justify-content-md-center" />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col>
            <Form.Label>Height : </Form.Label>
            <Form.Control className="justify-content-md-center" />
          </Col>
          <Col>
            <Form.Label>Weight : </Form.Label>
            <Form.Control className="justify-content-md-center" />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col className="col-md-4">
            <Form.Label>Birthdate : </Form.Label>
            <Form.Control className="justify-content-md-center" />
          </Col>
          <Col className="col-md-2">
            <Form.Label>Sex : </Form.Label>
            <Form.Control className="justify-content-md-center" />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col>
            <Form.Label>Activitie : </Form.Label>
            <Form.Control className="justify-content-md-center" />
          </Col>
          <Col>
            <Form.Label>Experience : </Form.Label>
            <Form.Control className="justify-content-md-center" />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col className="col-md-4">
            <Form.Label>Equipement : </Form.Label>
            <Form.Control className="justify-content-md-center" />
          </Col>
          <Col className="col-md-2">
            <Form.Label>Days : </Form.Label>
            <Form.Control className="justify-content-md-center" />
          </Col>
        </Row>
        <Row className="col-md-6 justify-content-md-center">
          <Col className="col-md-5">
            <Form.Label>Health Issues : </Form.Label>
            <Form.Control as="textarea" aria-label="With textarea" />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default TraineeDetails;
