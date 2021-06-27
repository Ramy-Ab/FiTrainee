import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { Row, Col } from "react-bootstrap";
import Side from "../components/Side";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

function ProgressScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [chartData, setChartData] = useState({});

  const chart = () => {
    let weight = [];
    let date = [];
    axios
      .get(`/api/users/getweights/${userInfo.id}/`)
      .then((res) => {
        console.log(res.data);
        for (const dataObj of res.data) {
          weight.push(parseInt(dataObj.weight));
          date.push(moment(dataObj.date).format("DD MMM YYYY"));
        }
        console.log("weight : ", weight);
        console.log("date : ", date);
        setChartData({
          labels: date,
          datasets: [
            {
              label: "Trainee Weight",
              data: weight,
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
                scales: {
                  xAxes: [
                    {
                      type: "time",
                      time: {
                        format: "DD/MM/YYY",
                        tooltipFormat: "ll",
                      },
                    },
                  ],
                },
                // scales: {
                //   x: {
                //     type: "timeseries",
                //   },
                // },
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProgressScreen;
