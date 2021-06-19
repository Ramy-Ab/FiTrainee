import React from "react";
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

export default function NutritionsDialog({ openedNutritions }) {
  const [openNutritions, setOpenNutritions] = React.useState(openedNutritions);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpenNutritions(true);
  };

  const handleClose = () => {
    setOpenNutritions(false);
  };

  return (
    <div>
      {console.log("openNutritions in dialog: ", openNutritions)}

      <Dialog
        fullScreen={fullScreen}
        open={openNutritions}
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
              id="inlineFormInputGroupUsername2"
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
              id="inlineFormInputGroupUsername2"
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
            onClick={handleClose}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
