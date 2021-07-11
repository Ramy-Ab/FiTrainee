import React from "react";
import { useSelector } from "react-redux";
import {
  InputGroup,
  FormControl,
  Button as RButton,
  Spinner,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import diet from "../assets/diet.svg";
import { Progress } from "antd";
import Loader from "./Loader";
import Message from "./Message";
function FoodList({ calorie, carb, proteine, foodName, foodWeight }) {
  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUser, loading: loadingUser, user } = userDetails;

  const traineeInfo = useSelector((state) => state.traineeInfo);
  const { loading, success, error, personelInfo } = traineeInfo;

  return (
    <div>
      <Row className="col-md-12 ">
        <Col className="col-md-1">
          <img src={diet} alt="diet" style={{ height: "50px" }} />
        </Col>
        <Col className="col-md-4 mt-1">
          <p
            style={{
              marginBottom: "auto",
              color: "#303133",
              fontSize: "18px",
              textTransform: "capitalize",
            }}
          >
            {foodName}
          </p>
          <p
            style={{
              color: "#303333",
              fontSize: "11px",
            }}
          >
            {foodWeight} g
          </p>
        </Col>

        <Col className="col-md-1 progress50">
          <Progress
            className=""
            style={{ height: "50px", weight: "50px" }}
            type="circle"
            percent={99}
            format={(percent) => `${calorie} Calories`}
          />
        </Col>
        <Col className="col-md-1 progress50">
          <Progress
            className=""
            style={{ height: "50px", weight: "50px" }}
            type="circle"
            strokeColor="red"
            percent={99}
            format={(percent) => `${proteine} Proteines`}
          />
        </Col>
        <Col className="col-md-1 progress50">
          <Progress
            className=""
            style={{ height: "50px", weight: "50px" }}
            type="circle"
            strokeColor="black"
            percent={99}
            format={(percent) => `${carb} Carbs`}
          />
        </Col>
      </Row>
    </div>
  );
}

export default FoodList;
