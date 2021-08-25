import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Spinner } from "reactstrap";
import { verifyUser } from "../Backend/sendRequestToServer";

const EmailVerification = () => {
  const [success, setSuccess] = useState(true);
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    const email = params.get("email");
    const token = params.get("token");
    console.log({ email, token });
    verifyUser({ emailId: email, token: token }).then((res) => {
      if (res.status === 200) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {success ? (
        <>
          <h3>You Are Verified! You can login now.</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              history.push("/");
            }}
          >
            Login
          </Button>
        </>
      ) : success === false ? (
        <h3>You Are Not Verified.</h3>
      ) : (
        <Spinner color="primary" />
      )}
    </div>
  );
};

export default EmailVerification;
