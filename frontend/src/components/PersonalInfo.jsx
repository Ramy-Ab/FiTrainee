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
  const [btnS, setBtnS] = React.useState("btn1");

  const btns = ["Male", "Female", "Other"];

  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const UserTrainee = useSelector((state) => state.UserTrainee);
  const { trainee } = UserTrainee;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(traineeInfo({ ...trainee, height, weight, selectedDate, btnS }));
  }, [height, weight, selectedDate, btnS]);

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
            onClick={() => setBtnS(btn)}
            variant={btn === btnS ? "contained" : "outlined"}
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
            value={selectedDate}
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
      </form>
    </div>
  );
}
