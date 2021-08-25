import React, { useEffect, useState } from "react";
import { Media } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import {
  deleteRoleFromServer,
  viewRoleFromServer,
} from "../../Backend/sendRequestToServer";
import "./landing.css";

const GetStarted = () => {
  return (
    <div>
      <Navbar />
      <div className="landing"></div>
    </div>
  );
};

export default GetStarted;
