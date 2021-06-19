import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { traineeInfo } from "../actions/userActions";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function BasicButtonGroup() {
  const classes = useStyles();
  const [sex, setSex] = React.useState("btn1");

  const btns = ["Male", "Female", "Other"];

  const [birthDate, setBirthDate] = useState(new Date("2014-08-18T21:11:54"));

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [weightGoal, setWeightGoal] = useState("");

  const handleDateChange = (date) => {
    setBirthDate(date);
  };
  const UserTrainee = useSelector((state) => state.UserTrainee);
  const { trainee } = UserTrainee;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      traineeInfo({ ...trainee, height, weight, weightGoal, birthDate, sex })
    );
  }, [height, weight, weightGoal, birthDate, sex]);

  return (
    <div className={classes.root}>
      Sex :
      <ButtonGroup
        color="primary"
        label="sex"
        aria-label="outlined primary button group"
      >
        {btns.map((btn) => (
          <Button
            onClick={() => setSex(btn)}
            variant={btn === sex ? "contained" : "outlined"}
          >
            {btn}
          </Button>
        ))}
      </ButtonGroup>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={birthDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="height"
          value={height}
          onChange={(e) => {
            setHeight(e.target.value);
          }}
        />
        cm
        <TextField
          id="standard-basic"
          label="weight"
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
          }}
        />
        Kg
        <TextField
          id="standard-basic"
          label="weight Goal"
          value={weightGoal}
          onChange={(e) => {
            setWeightGoal(e.target.value);
          }}
        />
        Kg
      </form>
    </div>
  );
}
