import React from "react";
import SideBar from "../components/SideBar";
import { Row, Col } from "react-bootstrap";

function ObjectifScreen() {
  return (
    <div>
      <Row>
        <Col className="col-md-1">
          <SideBar />
        </Col>
        <Col className="col-md-11 p-5 center">objectif</Col>
      </Row>
    </div>
  );
}

export default ObjectifScreen;
