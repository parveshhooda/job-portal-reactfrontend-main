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
import { drawerCollapseable } from "./Constants";
import Navbar from "../components/employer/Navbar";
import {
  addUser,
  changePassword,
  changeToNewPassword,
  sendOtpVerification,
  verifyOtp,
  viewRoleFromServer,
} from "../Backend/sendRequestToServer";
import swal from "sweetalert";
import { useAuth } from "../contexts/AuthContext";

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

const ResetPassword = (props) => {
  let history = useHistory();
  const [showSpinner, setShowSpinner] = React.useState(false);
  const handleReset = () => {
    history.push("/");
  };
  const { currentUser } = useAuth();

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

  const [email, setEmail] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState(null);

  const otpButton = async (e) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    const res = await sendOtpVerification({
      emailId: email,
    });

    if (res.status === 200) {
      swal("Success!", "Email Sent", "success").then((value) =>
        setOtpSent(true)
      );
    } else {
      console.log(res);
      swal("Failed!", "Failed to send Email. Try Again!!!", "error");
    }
  };

  const verifyOtpButton = async (e) => {
    e.preventDefault();
    if (!otp) {
      return;
    }
    setShowSpinner(true);
    const res = await verifyOtp({
      emailId: email,
      otp: otp,
    });

    if (res.status === 200) {
      setShowSpinner(false);
      swal("Success!", "Otp Verified", "success").then((value) =>
        setShowPassword(true)
      );
      delete res.status;
      setUser(res);
    } else {
      setShowSpinner(false);
      console.log(res);
      swal("Failed!", "Failed to verify otp. Try Again!!!", "error");
    }
  };

  const setNewPassword = async (e) => {
    e.preventDefault();
    if (!newPass || !confirmPass || newPass !== confirmPass) {
      return;
    }
    setShowSpinner(true);
    const res = await changeToNewPassword({ ...user, ...password });

    if (res.status === 200) {
      setShowSpinner(false);
      swal("Success!", "Password Changed", "success").then((value) =>
        handleReset()
      );
    } else {
      setShowSpinner(false);
      console.log(res);
      swal("Failed!", "Failed to change Password. Try Again!!!", "error");
    }
  };

  // email validation
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  // phone validation
  const validatePhone = (mob) => {
    const re = /^[0-9]{10}$/;
    return re.test(mob);
  };

  // custom button

  const ColorButton = withStyles((theme) => ({
    root: {
      backgroundColor: "#FCBF00",
      "&:hover": {
        backgroundColor: "#FCBF00",
      },
    },
  }))(Button);

  // const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [password, setPassword] = useState({
    newPass: "",
    confirmPass: "",
  });

  const { newPass, confirmPass } = password;

  const onChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container mt-5 pt-5">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-6">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Forgot Password
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    disabled={otpSent}
                    id="outlined-basic"
                    label="Email*"
                    name="email"
                    variant="outlined"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      console.log("Reset function");
                      otpButton(e);
                    }}
                  >
                    Send OTP
                  </Button>
                  <br />
                  {otpSent && (
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="OTP*"
                        name="otp"
                        type="password"
                        variant="outlined"
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ marginBottom: "10px" }}
                      />
                      <br />
                      <ColorButton
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          console.log("verify function");
                          verifyOtpButton(e);
                        }}
                      >
                        Verify Otp
                      </ColorButton>
                    </div>
                  )}
                  <br />
                  {showPassword && (
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="New Password*"
                        name="newPass"
                        type="password"
                        variant="outlined"
                        onChange={onChange}
                        style={{ marginBottom: "10px" }}
                      />
                      <TextField
                        label="Password*"
                        label="Confirm Password*"
                        name="confirmPass"
                        type="password"
                        variant="outlined"
                        onChange={onChange}
                        style={{ marginBottom: "10px" }}
                      />
                      <ColorButton
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          console.log("new password function");
                          setNewPassword(e);
                        }}
                      >
                        Submit
                      </ColorButton>
                    </div>
                  )}
                </form>
              </CardContent>
              <div>
                {showSpinner ? (
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

export default ResetPassword;
