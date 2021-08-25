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
import { drawerCollapseable, permissions } from "../../Common/Constants";
import Navbar from "./Navbar";
import { addRole, editRoleFromServer } from "../../Backend/sendRequestToServer";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";

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

const AddRole = (props) => {
  const [showMobileErr, setMobileErr] = useState("");
  const [showEmailErr, setEmailErr] = useState("");
  const [showPassErr, setPassErr] = useState("");
  let location = useLocation();
  let isEdit = false,
    state = location.state;
  if (state && state.role) {
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
      setApplicant({
        name: state.role.role,
        roleDescription: state.role.roleDescription,
        pageName: JSON.parse(state.role.permission_Arr)["privileges"],
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
    roleDescription: "",
    pageName: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { name, roleDescription, pageName } = applicant;

  const onChange = (e) => {
    console.log(e.target.name);
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
    console.log(applicant.pageName);
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

  const onChangePrivilege = (e) => {
    console.log(e.target.name);
    const prv = e.target.value;
    let tempArr = [];
    if (e.target.checked) {
      tempArr = applicant.pageName;
      tempArr.push(prv);
    } else {
      tempArr = applicant.pageName;
      const index = tempArr.indexOf(prv);
      tempArr.splice(index, 1);
    }

    setApplicant({ ...applicant, pageName: tempArr });

    console.log(applicant.pageName);
  };

  const addRoleButton = async (e) => {
    e.preventDefault();

    if (name === "" || roleDescription === "" || pageName.length === 0) {
      alert("Please enter all fields");
    } else if (showEmailErr !== "" || showMobileErr !== "") {
      console.log("Email or phone is wrong");
      return false;
    } else {
      setShowSpinner(true);
      const res = await addRole({
        role: name,
        roleDescription: roleDescription,
        permission_Arr: JSON.stringify({ privileges: pageName }),
      });

      if (res.status === 200) {
        setShowSpinner(false);
        swal("Success!", "Role Added", "success").then((value) =>
          handleReset()
        );
      } else {
        setShowSpinner(false);
        console.log(res);
        swal("Failed!", "Failed to create Role. Try Again!!!", "error");
      }
    }
  };

  const editRoleButton = async (e) => {
    e.preventDefault();

    if (name === "" || roleDescription === "" || pageName.length === 0) {
      alert("Please enter all fields");
    } else if (showEmailErr !== "" || showMobileErr !== "") {
      console.log("Email or phone is wrong");
      return false;
    } else {
      setShowSpinner(true);
      const res = await editRoleFromServer({
        ...state.role,
        role: name,
        roleDescription: roleDescription,
        permission_Arr: JSON.stringify({ privileges: pageName }),
      });

      if (res.status === 200) {
        setShowSpinner(false);
        swal("Success!", "Role Edited", "success").then((value) =>
          history.push("/view-role")
        );
      } else {
        setShowSpinner(false);
        console.log(res);
        swal("Failed!", "Failed to create Role. Try Again!!!", "error");
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
                  {isEdit ? "Edit Role" : "Add Role"}
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label=" Role Name*"
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
                    label=" Role Description*"
                    name="roleDescription"
                    variant="outlined"
                    value={roleDescription}
                    onChange={onChange}
                    error={showTitleErr}
                    helperText={showTitleErr && "Please Enter Description"}
                    style={{ marginBottom: "10px" }}
                  />

                  <br />

                  <div>
                    <b style={{ marginBottom: "10px" }}>Selected Privileges:</b>
                    {applicant.pageName.map((value, index) => {
                      return <span key={index}>{value}; </span>;
                    })}
                  </div>
                </form>
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    Add Privileges
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Select Privileges"}
                    </DialogTitle>
                    <DialogContent>
                      {Object.keys(permissions).map((page, index) => (
                        <Accordion
                          expanded={expanded === page}
                          onChange={handleChangex(page)}
                          key={page}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                          >
                            <Typography className={classes.heading}>
                              {page}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <FormGroup row>
                              {permissions[page].map((pagex) => (
                                <FormControlLabel
                                  key={pagex}
                                  control={
                                    <Checkbox
                                      name="pageName"
                                      value={pagex}
                                      checked={
                                        applicant.pageName.indexOf(pagex) > -1
                                      }
                                      onChange={onChangePrivilege}
                                    />
                                  }
                                  label={pagex}
                                />
                              ))}
                            </FormGroup>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleClose} color="primary" autoFocus>
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
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
                    console.log("Add User function");
                    if (isEdit) {
                      editRoleButton(e);
                    } else addRoleButton(e);
                  }}
                >
                  {isEdit ? "Edit Role" : " Add Role"}
                </ColorButton>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRole;
