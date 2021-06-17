import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import MaterialTable from "material-table";
import { Row, Col, Badge } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { listOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";
import NameCustomComponent from "../components/NameCustomComponent ";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useHistory } from "react-router-dom";
import SideBar from "../components/SideBar";
import Side from "../components/Side";

function Orders() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const orderListMy = useSelector((state) => state.orderListMy);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders: ordersMy,
  } = orderListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [data, setData] = useState("");
  const history = useHistory();

  useEffect(() => {
    dispatch(listMyOrders());
    console.log("Orders : ", orderListMy["orders"]);
  }, [Orders]);

  useEffect(() => {
    if (userInfo) {
      dispatch(listOrders());
      console.log("inside useeffect :     ", orderList["orders"]);
      setData(orderList["orders"]);
      console.log("data", data);
    } else {
      console.log(history);
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  const columns = [
    {
      title: "ID",
      field: "_id",
    },

    {
      title: "Date",
      field: "createdAt",
    },
    {
      title: "Total",
      field: "totalPrice",
    },
    {
      title: "Paid",
      field: "isPaid",
      render: (row) =>
        row.isPaid ? (
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#357a38" }}
          >
            Paid
          </Button>
        ) : (
          <Button variant="contained" color="secondary">
            Pending
          </Button>
        ),
    },
    {
      title: "Delivred",
      field: "isDelivered",
      render: (row) =>
        row.isDelivered ? (
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#357a38" }}
          >
            Delivred
          </Button>
        ) : (
          <Button variant="contained" color="secondary">
            Pending
          </Button>
        ),
    },
  ];

  return (
    <div className="traineDash" style={{ fontSize: "10px " }}>
      <Row style={{ minHeight: "127vh" }}>
        <Col className="col-md-2">
          <Side />
        </Col>
        <Col
          className="col-md-10 p-5 center"
          style={{ backgroundColor: "#fafafa" }}
        >
          <MaterialTable
            title="Material Table"
            title="All Orders"
            data={orderListMy["orders"]}
            columns={columns}
            options={{
              filtering: true,
              exportButton: true,
              actionsColumnIndex: -1,
              addRowPosition: "first",
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
export default Orders;
