import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import { listOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import NameCustomComponent from "../components/NameCustomComponent ";
import Loader from "./Loader";
import Message from "./Message";
import { useHistory } from "react-router-dom";

function Orders() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [data, setData] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
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
      title: "Name",
      field: "user.username",
      render: (row) => <NameCustomComponent name={row.user.name} />,
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
          <Button variant="contained" color="primary">
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
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <MaterialTable
          title="Material Table"
          title="All Orders"
          data={orderList["orders"]}
          columns={columns}
          options={{
            filtering: true,
            exportButton: true,
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
        />
      )}
    </div>
  );
}
export default Orders;
