import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import { CircularProgress } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { useHistory } from "react-router";
import { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";

import swal from "sweetalert";
import { useAuth } from "../../contexts/AuthContext";
import "./signup.css";
import { editResumeOfUser } from "../../Backend/sendRequestToServer";
import firebase from "firebase/app";
import "firebase/storage";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    // margin: "15px 15px 15px 15px",
    borderRadius: "10px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 5px 10px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.21)",
  },
  form: {
    margin: "15px 15px 15px 15px",
    borderRadius: "10px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  pos: {
    marginTop: 20,
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  label: {
    color: "#000",
  },

  textField: {
    "& .MuiInputBase-input": {
      color: "#000",
    },
  },

  errMsg: {
    color: "red",
    fontWeight: "bold",
    fontSize: "small",
    marginBottom: "10px",
    textAlign: "left",
  },
}));

const UploadResume = (props) => {
  let history = useHistory();
  const [showSpinner, setShowSpinner] = React.useState(false);
  const handleReset = () => {
    history.push("/");
  };
  const { currentUser, setUserDetails } = useAuth();
  const storage = firebase.storage();

  const classes = useStyles();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        backgroundColor: "#fff",
        color: "#000",
      },
    },
  };

  const [resume, setResume] = useState();
  const [fileChosen, setFileChosen] = useState("No file chosen");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // custom button

  const ColorButton = withStyles((theme) => ({
    root: {
      backgroundColor: "#FCBF00",
      "&:hover": {
        backgroundColor: "#FCBF00",
      },
    },
  }))(Button);

  function handleFileChange(e) {
    setResume(e.target.files[0]);
    setFileChosen(e.target.files[0].name);
  }

  async function uploadResume() {
    setLoading(true);
    const uploadTask = storage
      .ref(`resume/${currentUser.emailId}-${fileChosen}`)
      .put(resume);
    const url = await (await uploadTask).ref.getDownloadURL();
    console.log(url);
    // await signup(email, password);
    const res = await editResumeOfUser({
      emailId: currentUser.emailId,
      resumeUrl: url,
    });

    if (res.status === 200) {
      let user = { ...currentUser, resumeUrl: res.resumeUrl };
      setUserDetails(user);
      setLoading(false);
      swal("Success!", "Resume Uploaded", "success");
    } else {
      setLoading(false);
      console.log(res);
      swal("Failed!", "Failed to create User. Try Again!!!", "error");
    }
    return url;
  }
  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-6">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Upload Resume
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                  <div className="mt-3 mb-3">
                    <input
                      accept=".pdf"
                      type="file"
                      id="actual-btn"
                      hidden
                      onChange={handleFileChange}
                    />
                    <label id="upload-label" for="actual-btn">
                      Choose File
                    </label>
                    <span id="file-chosen">{fileChosen}</span>
                  </div>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      console.log("upload function");
                      uploadResume(e);
                    }}
                  >
                    Upload
                  </Button>
                  <br />
                </form>
              </CardContent>
              <div>
                {loading ? (
                  <div>
                    <span style={{ marginLeft: "10px", color: "#ff0000" }}>
                      <h5>Please DO NOT REFRESH the page...</h5>
                    </span>
                    <CircularProgress
                      style={{
                        color: "#18D26E",
                      }}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <CardActions
                style={{ justifyContent: "center", fontWeight: "bold" }}
              ></CardActions>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadResume;
