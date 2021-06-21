import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTraineeInfo, updateTraineNutrition } from "../actions/userActions";
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

export default function NutritionsDialog({
  setOpenNutritions,
  openedNutritions,
}) {
  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUser, loading: loadingUser, user } = userDetails;

  const traineeInfo = useSelector((state) => state.traineeInfo);
  const { loading, success, error, personelInfo } = traineeInfo;

  // const [openWeight, setOpenWeight] = React.useState(openedWeight);
  const [calories, setCalories] = useState("");
  const [proteines, setProteines] = useState("");
  const [carbs, setCarbs] = useState("");

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
        console.log("personelInfo : ", personelInfo["userProfile"]);
        setCalories(personelInfo["userProfile"].calories);
        setProteines(personelInfo["userProfile"].proteines);
        setCarbs(personelInfo["userProfile"].carbs);
      } catch (error) {
        console.log(error);
      }
    }
  }, [success]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpenNutritions(false);
  };

  const handleUpdate = () => {
    dispatch(
      updateTraineNutrition(
        {
          calories: calories,
          proteines: proteines,
          carbs: carbs,
        },
        userInfo.id
      )
    );
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openedNutritions}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <p className="h-black "> {"Edit Daily Nutritions"} </p>
        </DialogTitle>
        <DialogContent className="text-center justify-content-center">
          <DialogContentText>
            You can set your Daily Nutritions goals from here
          </DialogContentText>
          <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
            Nutritions
          </Form.Label>
          <InputGroup
            className="mb-2 col-md-8 text-center"
            style={{ left: "25%" }}
          >
            <FormControl
              value={calories}
              onChange={(e) => {
                setCalories(e.target.value);
              }}
              id="inlineFormInputGroupUsername1"
              placeholder="Calories goal ..."
            />
            <InputGroup.Prepend>
              <InputGroup.Text style={{ marginLeft: "0" }}>
                Kcal
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
          <InputGroup
            className="mb-2 col-md-8 text-center"
            style={{ left: "25%" }}
          >
            <FormControl
              value={proteines}
              onChange={(e) => {
                setProteines(e.target.value);
              }}
              id="inlineFormInputGroupUsername2"
              placeholder="Protéine goal ..."
            />
            <InputGroup.Prepend>
              <InputGroup.Text style={{ marginLeft: "0" }}>g</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
          <InputGroup
            className="mb-2 col-md-8 text-center"
            style={{ left: "25%" }}
          >
            <FormControl
              value={carbs}
              onChange={(e) => {
                setCarbs(e.target.value);
              }}
              id="inlineFormInputGroupUsername3"
              placeholder="Carbs goal ..."
            />
            <InputGroup.Prepend>
              <InputGroup.Text style={{ marginLeft: "0" }}>g</InputGroup.Text>
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
