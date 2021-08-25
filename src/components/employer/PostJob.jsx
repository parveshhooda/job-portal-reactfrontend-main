import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";

//components
import Navbar from "./Navbar";

//material UI
import Grid from "@material-ui/core/Grid";
import { TextField, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import swal from "sweetalert";
import { addJob } from "../../Backend/sendRequestToServer";

export default function PostJob() {
  const { currentUser } = useAuth();

  const initFieldValues = {
    jobTitle: "",
    jobType: "In-office",
    city: "",
    openings: "",
    description: "",
    skills: "",
    ctc: "",
    uid: currentUser ? currentUser.id : "",
    employerEmail: currentUser ? currentUser.emailId : "",
  };

  //states
  const [values, setValues] = useState(initFieldValues);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const res = await addJob(values);

    if (res.status === 200) {
      setLoading(false);

      swal("Success!", "Job Added", "success").then((value) => {
        history.push("/view-posted-jobs");
      });
    } else {
      console.log(res);
      setLoading(false);

      swal("Failed!", "Failed to create Jobs. Try Again!!!", "error");
    }
  };

  return (
    <>
      <Navbar />
      <Parent>
        <div className="container">
          {error ? <Alert severity="error">{error}</Alert> : ""}
          <h3 className="mt-3 mb-3 text-center">Post Job</h3>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Grid>
                <Grid item xs="12">
                  <div className="mb-3 mt-3">
                    <TextField
                      type="text"
                      id="jobtitle"
                      label="Job Title"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      size="small"
                      name="jobTitle"
                      value={values.jobTitle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs="12">
                  <div className="form-group">
                    <select
                      className="form-control w-50"
                      name="jobType"
                      value={values.jobType}
                      onChange={handleInputChange}
                      required
                    >
                      <option>In-office</option>
                      <option>Remote</option>
                    </select>
                  </div>
                </Grid>
                <Grid item xs="12">
                  <div className="mb-3 mt-3">
                    <TextField
                      type="text"
                      id="city"
                      label="City"
                      variant="outlined"
                      color="primary"
                      size="small"
                      name="city"
                      value={values.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs="12">
                  <div className="mb-3 mt-3">
                    <TextField
                      type="text"
                      id="openings"
                      label="Openings"
                      variant="outlined"
                      color="primary"
                      size="small"
                      name="openings"
                      value={values.openings}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs="12">
                  <div className="mb-3 mt-3">
                    <TextField
                      type="text"
                      id="skills"
                      label="Skills"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      size="small"
                      name="skills"
                      value={values.skills}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs="12">
                  <div className="mb-3 mt-3">
                    <TextField
                      type="text"
                      id="ctc"
                      label="CTC"
                      variant="outlined"
                      color="primary"
                      size="small"
                      name="ctc"
                      value={values.ctc}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <div className="mb-3 mt-3">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    value={values.description}
                    rows="12"
                    placeholder="Job Description"
                    name="description"
                    value={values.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Button
            className="mb-3 mt-3"
            disabled={loading}
            variant="contained"
            color="primary"
            onClick={handlePostSubmit}
          >
            Post Job
          </Button>
          {/* <form onSubmit={handlePostSubmit}>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                className="form-control"
                name="jobTitle"
                value={values.jobTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Job Type</label>
              <select
                className="form-control"
                name="jobType"
                value={values.jobType}
                onChange={handleInputChange}
              >
                <option>In-office</option>
                <option>Remote</option>
              </select>
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={values.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>No of Openings</label>
              <input
                type="text"
                className="form-control"
                name="openings"
                value={values.openings}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Job Description</label>
              <textarea
                className="form-control"
                value={values.description}
                rows="3"
                name="description"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Skills required</label>
              <input
                type="text"
                className="form-control"
                name="skills"
                value={values.skills}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>CTC</label>
              <input
                type="text"
                className="form-control"
                name="ctc"
                value={values.ctc}
                onChange={handleInputChange}
              />
            </div>
            <button disabled={loading} type="submit">
              Post
            </button>
          </form> */}
        </div>
      </Parent>
    </>
  );
}

const Parent = styled.div`
  padding: 1rem;
`;
