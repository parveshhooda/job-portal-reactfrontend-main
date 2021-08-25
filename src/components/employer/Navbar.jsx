import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import WorkIcon from "@material-ui/icons/Work";
import InfoIcon from "@material-ui/icons/Info";
import PersonIcon from "@material-ui/icons/Person";
import ClearIcon from "@material-ui/icons/Clear";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import Divider from "@material-ui/core/Divider";

import { EmojiObjects, ExpandLess, ExpandMore } from "@material-ui/icons";
import "./Navbar.css";
import { drawerCollapseable } from "../../Common/Constants";
import { useAuth } from "../../contexts/AuthContext";
import { getPrevilegesFromServer } from "../../Backend/sendRequestToServer";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "white",
    color: "black",
    padding: "5px",
    // paddingRight: "79px",
    // paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  menuButton: {
    fontFamily: "Roboto",
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  drawerContainer: {
    padding: "10px 15px",
    width: "275px",
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingRight: "10px",
    paddingTop: "10px",
    color: "#18D26E",
  },
  menuButtonList: {
    marginRight: "auto",
    float: "right",
  },
}));

const GetEmail = () => {
  const { currentUser } = useAuth();

  return (
    <span>
      Welcome,{" "}
      <span style={{ color: "#18D26E" }}>
        {currentUser ? currentUser.userName : ""}
        <p></p>
      </span>
      <p>
        Role: <b>{currentUser ? currentUser.role : ""}</b>
      </p>
      <span className="mr-3">
        Email: <b>{currentUser ? currentUser.emailId : ""}</b>
      </span>
    </span>
  );
};

export default function Navbar() {
  const {
    header,
    logo,
    menuButton,
    toolbar,
    drawerContainer,
    closeIcon,
    menuButtonList,
  } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  const [previleges, setPrevileges] = useState([]);

  let publicUrl = process.env.PUBLIC_URL + "/";

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    getPrevilegesList();
  }, []);

  //Get list of previleges from localstorage or Server
  const getPrevilegesList = async () => {
    let prev = JSON.parse(localStorage.getItem("previleges"));
    if (prev === undefined || prev === null) {
      const res = await getPrevilegesFromServer(currentUser.role); //API call to get Previleges
      if (res.status === 200) {
        prev = res.previleges;
        localStorage.setItem("previleges", JSON.stringify(prev));
      }
    }
    // let prevObj = {};
    // prev.forEach((val) => {
    //   prevObj[val] = 1;
    // });
    // let finalPrev = [];
    // for(let previlege of Object.keys(drawerCollapseable)){
    //   if(prevObj[previlege]){
    //     finalPrev.push(previlege);
    //   }
    // }
    setPrevileges(prev);
  };

  //  handle drawer open and close
  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

  const drawer = () => {
    return (
      <>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className="mt-2">
            <span className={closeIcon}>
              <ClearIcon onClick={handleDrawerClose} />
            </span>

            <div className={drawerContainer}>{getNewDrawer()}</div>
          </div>
        </Drawer>
      </>
    );
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        {drawer()}

        <div style={{ marginLeft: "auto" }}>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        {drawer()}
        <div style={{ marginLeft: "auto" }}>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const getNewDrawer = () => {
    return (
      <div>
        <br />
        <Divider />
        <List component="nav" aria-labelledby="nested-list-subheader">
          {previleges &&
            previleges.map((previlege, index) => {
              {
                /* console.log(previlege, drawerCollapseable); */
              }
              let updatePrev =
                previlege === "Add Role"
                  ? "Assign role and permission"
                  : previlege === "View Role"
                  ? "View role and permission"
                  : previlege;
              if (drawerCollapseable[previlege]) {
                return (
                  <>
                    <ListItem
                      key={index}
                      button
                      {...{
                        component: RouterLink,
                        to: `${drawerCollapseable[previlege]}`,
                        color: "inherit",
                        style: {
                          textDecoration: "none",
                          color: "black",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <img
                          alt="logo"
                          width="30px"
                          src={publicUrl + "images/empIcon.png"}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography style={{ fontWeight: "Bold" }}>
                            {updatePrev}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </>
                );
              }
              return null;
            })}
        </List>
      </div>
    );
  };

  const getMenuButtons = () => {
    return (
      <div>
        <li className="menu-item-has-children">
          <PersonIcon size="large" />
          <ul className="sub-menu">
            <li>
              <GetEmail />
            </li>
            <li>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  console.log("log out user fuction ");
                  logout();
                  history.push("/");
                }}
              >
                Log Out
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                color="primary"
                onClick={(e) => {
                  history.push("/reset-password");
                }}
              >
                Reset Password
              </Button>
            </li>
          </ul>
        </li>
      </div>
    );
  };

  return (
    <div>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
      <div className="mt-5"></div>
    </div>
  );
}
