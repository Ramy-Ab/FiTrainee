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

export default function WeightDialog({ openedWeight }) {
  const [openWeight, setOpenWeight] = React.useState(openedWeight);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpenWeight(true);
  };

  const handleClose = () => {
    setOpenWeight(false);
  };

  return (
    <div>
      {console.log("openWeight in dialog: ", openWeight)}

      <Dialog
        fullScreen={fullScreen}
        open={openWeight}
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
              id="inlineFormInputGroupUsername2"
              placeholder="your actual weight ..."
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
