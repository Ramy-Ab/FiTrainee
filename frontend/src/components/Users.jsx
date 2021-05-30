import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import NameCustomComponent from "../components/NameCustomComponent ";
import { listUsers, deleteUser } from "../actions/userActions";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Form, Modal } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Icon from "@material-ui/core/Icon";

export const Users = (history) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorDetails, loading: loadingDetails, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  const [open, setOpen] = useState(false);

  const [userId, setUserId] = useState("");

  const [show, setShow] = useState(false);

  const handleShowClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      console.log("useeffect:", userList["users"]);
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  useEffect(() => {
    {
      console.log("useeffect2");
    }

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(listUsers());
    } else {
      if (!user.name || user._id !== Number(userId)) {
        // dispatch(getUserDetails(16))
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [userId, successUpdate]);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
  }, [user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setOpen(false);
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
  };

  const handleShowCloseDelete = () => {
    setShow(false);
    dispatch(deleteUser(userId));
  };

  // console.log(orderList["orders"])

  // console.log('data',data)

  const columns = [
    {
      title: "ID",
      field: "_id",
    },

    {
      title: "Name",
      field: "username",
      render: (row) => <NameCustomComponent name={row.name} />,
    },
    {
      title: "Email",
      field: "email",
    },

    {
      title: "Admin",
      field: "isAdmin",
      render: (row) =>
        row.isAdmin ? (
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#357a38" }}
          >
            Admin
          </Button>
        ) : (
          <Button variant="contained" color="secondary">
            User
          </Button>
        ),
    },
  ];

  return (
    <div>
      <Modal show={show} onHide={handleShowClose} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "white" }}>
            Delete User{" "}
            <i
              style={{ color: "#ff7676" }}
              class="fas fa-exclamation-triangle"
            ></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure , you want to delete this user !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleShowCloseDelete}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <MaterialTable
          title="Material Table"
          style={{ color: "black" }}
          title="All Users"
          data={users}
          columns={columns}
          actions={[
            (rowData) => ({
              icon: "edit",
              tooltip: "Edit User",
              onClick: () => {
                console.log("user id : ", rowData._id);
                dispatch(getUserDetails(rowData._id));
                setUserId(rowData._id);
                console.log("rowData : ", rowData._id);
                setOpen(true);
              },
            }),
            (rowData) => ({
              icon: "delete",
              tooltip: "Delete User",
              onClick: () => {
                setUserId(rowData._id);
                setShow(true);
              },
              disabled: rowData.isAdmin == true,
            }),
          ]}
          options={{
            filtering: true,
            exportButton: true,
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
        />
      )}

      <Dialog
        className="col-md-12"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          className="col-md-12"
          id="form-dialog-title"
          style={{ backgroundColor: "black" }}
        >
          Edit User
        </DialogTitle>
        <DialogContent className="col-md-12">
          {/* <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="email"
                  fullWidth
                /> */}
          <div className="col-md-12">
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Form className="col-md-12">
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="isadmin">
                  <Form.Check
                    type="checkbox"
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </Form>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitHandler} color="primary" variant="raised">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Users;
