import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTraineeInfo, updateTraineWeight } from "../actions/userActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import {
  InputGroup,
  FormControl,
  Button as RButton,
  Spinner,
  Form,
  Row,
  Col,
} from "react-bootstrap";

export default function WeightDialog({ setOpenWeight, openedWeight }) {
  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUser, loading: loadingUser, user } = userDetails;

  const traineeInfo = useSelector((state) => state.traineeInfo);
  const { loading, success, error, personelInfo } = traineeInfo;

  // const [openWeight, setOpenWeight] = React.useState(openedWeight);
  const [weight, setWeight] = useState("");
  const [weightGoal, setWeightGoal] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getTraineeInfo(userInfo.id));
    console.log("dispatched");
  }, [dispatch]);

  useEffect(() => {
    if (traineeInfo !== undefined) {
      try {
        console.log("personelInfo : ", traineeInfo);
        setWeight(personelInfo["userProfile"].weight);
        setWeightGoal(personelInfo["userProfile"].weightGoal);
      } catch (error) {
        console.log(error);
      }
    }
  }, [success]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // const handleClickOpen = () => {
  //   setOpenWeight(true);
  // };

  const handleClose = () => {
    setOpenWeight(false);
  };

  const handleUpdate = () => {
    dispatch(
      updateTraineWeight(
        {
          weight: weight,
          weightGoal: weightGoal,
        },
        userInfo.id
      )
    );

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(userInfo.token);
    console.log(userInfo.id);

    axios
      .post(`/api/users/addweight/${userInfo.id}/`, { weight: weight }, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenWeight(false);
  };

  return (
    <div>
      {console.log("openWeight in dialog: ", openedWeight)}

      <Dialog
        fullScreen={fullScreen}
        open={openedWeight}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <p className="h-black "> {"Edit Weight"} </p>
        </DialogTitle>
        <DialogContent className="text-center justify-content-center">
          <DialogContentText>
            You can set your actual weight and your goal here
          </DialogContentText>
          <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
            weight
          </Form.Label>
          <InputGroup
            className="mb-2 col-md-8 text-center"
            style={{ left: "25%" }}
          >
            <FormControl
              id="inlineFormInputGroupUsername1"
              placeholder="your actual weight ..."
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <InputGroup.Prepend>
              <InputGroup.Text style={{ marginLeft: "0" }}>kg</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
          <p className="h-black mt-4 ml-2">And</p>
          <InputGroup
            className="mb-2 col-md-8 text-center"
            style={{ left: "25%" }}
          >
            <FormControl
              id="inlineFormInputGroupUsername2"
              placeholder="your goal weight ..."
              value={weightGoal}
              onChange={(e) => setWeightGoal(e.target.value)}
            />
            <InputGroup.Prepend>
              <InputGroup.Text style={{ marginLeft: "0" }}>kg</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={handleUpdate}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
