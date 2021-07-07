import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextareaAutosize } from "@material-ui/core";
import { traineeInfo } from "../actions/userActions";

function TrainingPlan() {
  const [equipement, setEquipement] = React.useState("free dumble weight");
  const [days, setDays] = React.useState("2-3");
  const [healthIssues, setHealthIssues] = useState("");

  const UserTrainee = useSelector((state) => state.UserTrainee);
  const { trainee } = UserTrainee;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(traineeInfo({ ...trainee, equipement, days, healthIssues }));
  }, [equipement, days, healthIssues]);

  return (
    <div>
      <h4>what equipement do you have acces to ?</h4>
      <div class="select">
        <select
          name="slct"
          id="slct"
          onChange={(e) => {
            setEquipement(e.target.value);
          }}
        >
          <option value="free dumble weight">Free dumble weight</option>
          <option value="gym machines">Gym machines</option>
          <option value="2">cables weight</option>
          <option value="Body weight">Body weight</option>
        </select>
      </div>
      <h4>How many days you want to train ?</h4>
      <div class="select">
        <select
          name="slct"
          id="slct"
          onChange={(e) => {
            setDays(e.target.value);
          }}
        >
          <option value="2-3">2-3</option>
          <option value="3-4">3-4</option>
          <option value="4-5">4-5</option>
        </select>
      </div>
      <h4>do you have any injury or health issues ?</h4>
      <TextareaAutosize
        aria-label="minimum height"
        rowsMin={5}
        cols={40}
        style={{ color: "black" }}
        placeholder="Write here ..."
        onChange={(e) => {
          setHealthIssues(e.target.value);
        }}
      />
    </div>
  );
}

export default TrainingPlan;
