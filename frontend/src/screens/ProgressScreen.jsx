import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { Row, Col } from "react-bootstrap";
import Side from "../components/Side";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";

function ProgressScreen() {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let empSal = [];
    let empAge = [];
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data.data) {
          empSal.push(parseInt(dataObj.employee_salary));
          empAge.push(parseInt(dataObj.employee_age));
        }
        console.log("empsal : ", empSal);
        console.log("empage : ", empAge);
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "level of thickness",
              data: empSal,
              backgroundColor: ["aqua"],
              borderwidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="traineDash">
      <Row>
        <Col className="col-md-1">
          <Side />
        </Col>
        <Col className="col-md-10  p-5 center mt-5 ">
          <h1 className="h-black text-center"> Weight Progress</h1>
          <div style={{ height: "60%", width: "100%" }}>
            <Line
              data={chartData}
              options={{
                responsive: true,
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProgressScreen;
