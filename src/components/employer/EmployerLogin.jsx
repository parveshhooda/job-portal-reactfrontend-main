import React, { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

//material UI
import { TextField, Button, Divider } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const res = await login(email, password, false);
      if (res.status === 200) {
        history.push("/getstarted");
      } else {
        setError("Sign In Failed");
      }
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Parent>
        <div className="row">
          <div className="col-md-6 overflow-hidden">
            <img className="img-fluid " src="/images/employer.svg" alt="" />
          </div>
          <div className="col-md-6">
            <FormStyle>
              {error ? <Alert severity="error">{error}</Alert> : ""}
              <h3 className="mb-4 mt-2">Employer Login</h3>
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
              <Button
                className="mb-3 mt-3"
                disabled={loading}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                LogIn
              </Button>
              <Divider light />
              <div className="mt-3 mb-3 small text-muted">
                <Link to="/forgot-password" className="font-weight-bold">
                  Forgot Password
                </Link>
              </div>
              <div className="">
                <Link
                  to="/applicant-login"
                  className="small text-decoration-none bg-primary text-white pl-3 pr-3 pb-1 font-weight-bold rounded-pill"
                >
                  Applicant Login
                </Link>
              </div>
            </FormStyle>
          </div>
        </div>

        {/* <form>
            <input type="text" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button disabled={loading}>Log In</button>
          </form> */}
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
