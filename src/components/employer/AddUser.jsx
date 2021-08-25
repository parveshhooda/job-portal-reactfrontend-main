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
import { drawerCollapseable } from "../../Common/Constants";
import Navbar from "./Navbar";
import {
  addUser,
  editUserFromServer,
  viewRoleFromServer,
} from "../../Backend/sendRequestToServer";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

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

const AddUser = (props) => {
  const [showMobileErr, setMobileErr] = useState("");
  const [showEmailErr, setEmailErr] = useState("");
  const [showPassErr, setPassErr] = useState("");

  let location = useLocation();
  let isEdit = false,
    state = location.state;
  if (state && state.user) {
    // console.log(state.role);
    isEdit = true;
  }

  let history = useHistory();
  const [showSpinner, setShowSpinner] = React.useState(false);
  const handleReset = () => {
    window.location.reload();
  };

  // feild empty err hooks
  const [showTitleErr, setShowTitleErr] = React.useState(false);
  const [showDescErr, setShowDescErr] = React.useState(false);
  const [showLocationErr, setShowLocationErr] = React.useState(false);
  const [showQualErr, setShowQualErr] = React.useState(false);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    if (isEdit) {
      console.log(state.user);
      setApplicant({
        name: state.user.userName,
        email: state.user.emailId,
        phone: state.user.number,
        role: state.user.role,
      });
    }
  }, []);

  const handleChangex = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //priviledges dialog
  const [open, setOpen] = React.useState(false);

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

  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { name, email, password, phone, role } = applicant;
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    viewRoleFromServer().then((roles) => {
      if (roles.status === 200) setRoles(roles.result);
    });
  }, []);

  const onChange = (e) => {
    console.log(e.target.name);
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case "phone":
        if (!validatePhone(e.target.value)) {
          setMobileErr("Please Enter Valid Phone number");
        } else {
          setMobileErr("");
        }
        break;

      case "email":
        if (!validateEmail(e.target.value)) {
          setEmailErr("Please Enter Valid Email");
        } else {
          setEmailErr("");
        }
        break;

      default:
        break;
    }
  };

  const addUserButton = async (e) => {
    e.preventDefault();

    if (email === "" || password === "" || name === "" || phone === "") {
      alert("Please enter all fields");
    } else if (showEmailErr !== "" || showMobileErr !== "") {
      console.log("Email or phone is wrong");
      return false;
    } else {
      setShowSpinner(true);
      const res = await addUser({
        userName: name,
        emailId: email,
        number: phone,
        password: password,
        role: role,
      });

      if (res.status === 200) {
        setShowSpinner(false);
        swal("Success!", "User Added", "success").then((value) =>
          handleReset()
        );
      } else {
        setShowSpinner(false);
        console.log(res);
        swal("Failed!", "Failed to create User. Try Again!!!", "error");
      }
    }
  };

  const editUserButton = async (e) => {
    e.preventDefault();

    if (email === "" || name === "" || phone === "") {
      alert("Please enter all fields");
    } else if (showEmailErr !== "" || showMobileErr !== "") {
      console.log("Email or phone is wrong");
      return false;
    } else {
      setShowSpinner(true);
      const res = await editUserFromServer({
        id: state.user.id,
        userName: name,
        emailId: email,
        number: phone,
        role: role,
      });

      if (res.status === 200) {
        setShowSpinner(false);
        swal("Success!", "User Edit", "success").then((value) =>
          history.push("/view-user")
        );
      } else {
        setShowSpinner(false);
        console.log(res);
        swal("Failed!", "Failed to edit User. Try Again!!!", "error");
      }
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

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-6">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {isEdit ? "Edit User" : "Add User"}
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label="Name*"
                    name="name"
                    variant="outlined"
                    value={name}
                    onChange={onChange}
                    error={showTitleErr}
                    helperText={showTitleErr && "Please Enter Name"}
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email*"
                    name="email"
                    variant="outlined"
                    value={email}
                    onChange={onChange}
                    error={showDescErr}
                    helperText={showDescErr && "Please Enter Email"}
                  />
                  <span className={classes.errMsg}>{showEmailErr}</span>
                  {!isEdit && (
                    <>
                      {" "}
                      <TextField
                        label="Password*"
                        name="password"
                        type="password"
                        variant="outlined"
                        onChange={onChange}
                        error={showDescErr}
                        helperText={showDescErr && "Please Enter Email"}
                      />
                      <span className={classes.errMsg}>{showPassErr}</span>
                    </>
                  )}
                  <TextField
                    variant="outlined"
                    aria-label="empty textarea"
                    label="Phone*"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    error={showQualErr}
                    helperText={showQualErr && "Please Enter Phone"}
                  />
                  <span className={classes.errMsg}>{showMobileErr}</span>

                  <br />

                  <TextField
                    select
                    variant="outlined"
                    label="Select Role*"
                    name="role"
                    value={role}
                    onChange={onChange}
                    // error={showQualErr}
                    // helperText={showQualErr && "Please Enter Phone"}
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.id} value={option.role}>
                        {option.role}
                      </MenuItem>
                    ))}
                  </TextField>
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
              >
                <ColorButton
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    if (isEdit) {
                      editUserButton(e);
                    } else {
                      console.log("Add User function");
                      addUserButton(e);
                    }
                  }}
                >
                  {isEdit ? "Edit User" : "Add User"}{" "}
                </ColorButton>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
