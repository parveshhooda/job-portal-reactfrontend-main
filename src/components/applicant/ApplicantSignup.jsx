import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";
import swal from "sweetalert";
import firebase from "firebase/app";
import "firebase/storage";

//material UI
import { TextField, Button, Divider } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { addUser } from "../../Backend/sendRequestToServer";
import "./signup.css";

export default function ApplicantSignup() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [resume, setResume] = useState();
  const [fileChosen, setFileChosen] = useState("No file chosen");

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const storage = firebase.storage();

  function handleFileChange(e) {
    setResume(e.target.files[0]);
    setFileChosen(e.target.files[0].name);
  }

  async function uploadResume() {
    const uploadTask = storage.ref(`resume/${email}-${fileChosen}`).put(resume);
    const url = await (await uploadTask).ref.getDownloadURL();
    return url;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confPassword) {
      return setError("Passwords do not match");
    }

    if (!resume) {
      return setError("Upload Resume");
    }

    try {
      setError("");
      setLoading(true);

      const downloadUrl = await uploadResume();
      console.log(downloadUrl);
      // await signup(email, password);
      const res = await addUser({
        userName: name,
        emailId: email,
        number: phone,
        password: password,
        role: "Candidate",
        resumeUrl: downloadUrl,
      });

      if (res.status === 200) {
        setLoading(false);
        history.push("/applicant-login");
      } else {
        setLoading(false);
        console.log(res);
        swal("Failed!", "Failed to create User. Try Again!!!", "error");
      }

      // history.push("/employee-login");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Parent>
        <div className="row">
          <div className="col-md-6">
            <FormStyle>
              {error ? <Alert severity="error">{error}</Alert> : ""}
              <h3 className="mb-4 mt-2">Applicant Sign Up</h3>
              <div className="mb-3 mt-3">
                <TextField
                  type="text"
                  id="name"
                  label="Enter Name"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="small"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3 mt-3">
                <TextField
                  type="text"
                  id="phone"
                  label="Enter Phone no"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="small"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3 mt-3">
                <TextField
                  type="text"
                  id="email"
                  label="Enter Email"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3 mb-3">
                <TextField
                  type="password"
                  id="password"
                  label="Enter Password"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-3 mb-3">
                <TextField
                  type="password"
                  id="confpassword"
                  label="Confirm Password"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="small"
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </div>

              <div className="mt-3 mb-3">
                Upload Resume
                <br />
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
                className="mb-3 mt-3"
                disabled={loading}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Divider light />

              <div className="small text-muted mt-2 mb-2">
                Already have an account?{" "}
                <Link to="/applicant-login" className="font-weight-bold">
                  Log In
                </Link>
              </div>
              <div className="small text-muted">
                Login as{" "}
                <Link to="/employer-login" className="font-weight-bold">
                  Employer
                </Link>
              </div>
              {/* <form onSubmit={handleSubmit}>
            <input type="text" placeholder="email" ref={emailRef} id="email" />
            <input
              type="password"
              placeholder="password"
              ref={passwordRef}
              id="password"
            />
            <input
              type="password"
              placeholder="confirm password"
              ref={passwordConfirmRef}
              id="password-confirm"
            />
            <button disabled={loading}>Sign Up</button>
          </form> */}
            </FormStyle>
          </div>
          <div className="col-md-6 overflow-hidden">
            <img className="img-fluid " src="/images/employee.svg" alt="" />
          </div>
        </div>
      </Parent>
    </>
  );
}

const Parent = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormStyle = styled.div`
  max-width: 500px;
  /* background-color: aqua; */
  padding: 1rem;
`;
