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

const ViewRole = () => {
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

  // function edit blogs

  function EditEmployee(id) {
    console.log("this is ", id);
    history.push("/edit-applicant", id);
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
    const res = await viewRoleFromServer();
    if (res.status === 200) {
      console.log({ res });
      setBlogs(res.result);
    } else setBlogs([]);
  };

  //  Search in textbox
  const searchBlogResult = (val) => {
    return blogs.filter((data) =>
      data.role.toLowerCase().includes(val.toLowerCase())
    );
  };
  const search = (e) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);

    setSearchResult(searchBlogResult(e.target.value));
  };

  const deleteRole = async (id) => {
    const res = await deleteRoleFromServer({ id });
    if (res.status === 200) {
      console.log("Role Deleted", res.result);
      window.location.reload();
    } else {
      console.log("Error Occured", res);
    }
  };

  const editRole = async (role) => {
    history.push("/add-role", { role });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2 style={{ textAlign: "center" }}>View Role</h2>
        <div className="row pb-3 justify-content-center">
          <input
            type="text"
            className="col-10 col-md-6 search-box"
            placeholder="Search Role"
            onChange={(e) => {
              search(e);
            }}
          />
        </div>
        {blogs.length === 0 ? (
          <div className="row justify-content-center">
            <p>No Role yet!</p>
          </div>
        ) : (
          <>
            {blogs.length > 0 && searchValue === "" ? (
              blogs.map((blog) => {
                const prev = blog.permission_Arr
                  ? JSON.parse(blog.permission_Arr)["privileges"]
                  : [];
                return (
                  <Media list key={blog.id} className="blog-card">
                    <Media tag="li">
                      <Media body>
                        <Media heading>{blog.role}</Media>
                        <p>Description: {blog.roleDescription}</p>
                        <p>Privileges: {prev.toString()}</p>
                        {localStorage.getItem("email") !== blog.email && (
                          <p className="view-edit">
                            <IconButton
                              aria-label="edit"
                              id={blog.id}
                              onClick={(e) => {
                                console.log("Edit Applicant");
                                editRole(blog);
                              }}
                            >
                              <CreateIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              id={blog.id}
                              onClick={(e) => {
                                console.log("delete Applicant");
                                deleteRole(blog.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </p>
                        )}
                      </Media>
                    </Media>
                  </Media>
                );
              })
            ) : (
              <>
                {searchResult.length > 0 ? (
                  searchResult.map((blog) => {
                    const prev = blog.permission_Arr
                      ? JSON.parse(blog.permission_Arr)["privileges"]
                      : [];
                    return (
                      <Media list key={blog.id} className="blog-card">
                        <Media tag="li">
                          <Media body>
                            <Media heading>{blog.role}</Media>
                            <p>Description: {blog.roleDescription}</p>
                            <p>Priviledges: {prev.toString()}</p>
                            {localStorage.getItem("email") !== blog.email && (
                              <p className="view-edit">
                                <IconButton
                                  aria-label="edit"
                                  id={blog.id}
                                  onClick={(e) => {
                                    console.log("Edit applicant");
                                    editRole(blog);
                                  }}
                                >
                                  <CreateIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  id={blog.id}
                                  onClick={(e) => {
                                    console.log("delete applicant");
                                    deleteRole(blog.id);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </p>
                            )}
                          </Media>
                        </Media>
                      </Media>
                    );
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

export default ViewRole;
