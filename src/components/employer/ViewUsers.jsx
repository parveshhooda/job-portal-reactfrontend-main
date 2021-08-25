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
  deleteUserFromServer,
  viewUserFromServer,
} from "../../Backend/sendRequestToServer";

const ViewUsers = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  let history = useHistory();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  const handleReset = () => {
    window.location.reload();
  };

  function checkIfSalesUser(emp) {
    const designations = [
      "National Sales Head",
      "Regional Sales Head",
      "City Sales Head",
      "Sales Executive",
    ];
    return designations.includes(emp.designation);
  }

  // custom button

  const ColorButton = withStyles((theme) => ({
    root: {
      backgroundColor: "#FCBF00",
      color: "white",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#FCBF00",
      },
    },
  }))(Button);

  const fetchBlogs = async () => {
    // const obj = {
    //   id: "123",
    //   name: "Hr1",
    //   email: "hr1@getnada.com",
    //   phone: "90909090",
    //   role: "Hr",
    //   privileges: ["Add Hr", "View Hr"],
    // };
    const res = await viewUserFromServer();
    if (res.status === 200) {
      console.log({ res });
      setBlogs(res.result);
    } else setBlogs([]);
  };

  //  Search in textbox
  const searchBlogResult = (val) => {
    return blogs.filter((data) =>
      data.userName.toLowerCase().includes(val.toLowerCase())
    );
  };
  const search = (e) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);

    setSearchResult(searchBlogResult(e.target.value));
  };

  const editUser = (user) => {
    history.push("/add-user", { user });
  };

  const deleteUser = async (id) => {
    const res = await deleteUserFromServer({ id });
    if (res.status === 200) {
      console.log("User Deleted", res.result);
      window.location.reload();
    } else {
      console.log("Error Occured", res);
    }
  };
  const prev = JSON.parse(localStorage.getItem("previleges")) || [];
  const editP = prev.includes("Edit User");
  const deleteP = prev.includes("Delete User");

  const UserCard = ({ blog }) => {
    return (
      <Media list key={blog.id} className="blog-card">
        <Media tag="li">
          <Media body>
            <Media heading>{blog.userName}</Media>
            <p className="author-name">Email : {blog.emailId}</p>
            <p>Phone: {blog.number}</p>
            {/* <p>Designation: {blog.designation}</p> */}
            <p>Role: {blog.role}</p>

            <p className="view-edit">
              {editP && (
                <IconButton
                  aria-label="edit"
                  id={blog.id}
                  onClick={(e) => {
                    console.log("Edit User");
                    editUser(blog);
                  }}
                >
                  <CreateIcon />
                </IconButton>
              )}
              {deleteP && (
                <IconButton
                  aria-label="delete"
                  id={blog.id}
                  onClick={(e) => {
                    console.log("delete User");
                    deleteUser(blog.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </p>
          </Media>
        </Media>
      </Media>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2 style={{ textAlign: "center" }}>View User</h2>
        <div className="row pb-3 justify-content-center">
          <input
            type="text"
            className="col-10 col-md-6 search-box"
            placeholder="Search User"
            onChange={(e) => {
              search(e);
            }}
          />
        </div>
        {blogs.length === 0 ? (
          <div className="row justify-content-center">
            <p>No User's yet!</p>
          </div>
        ) : (
          <>
            {blogs.length > 0 && searchValue === "" ? (
              blogs.map((blog) => {
                return <UserCard blog={blog} />;
              })
            ) : (
              <>
                {searchResult.length > 0 ? (
                  searchResult.map((blog) => {
                    return <UserCard blog={blog} />;
                  })
                ) : (
                  <>
                    {searchValue !== "" ? (
                      <div className="row pb-3 justify-content-center">
                        <div>Search Not Found!</div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ViewUsers;
