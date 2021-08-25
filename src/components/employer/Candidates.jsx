import React, { useEffect } from "react";

//material UI
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/Email";
import { Button } from "@material-ui/core";
import { addAppliedJob } from "../../Backend/sendRequestToServer";
import swal from "sweetalert";
import "./candidates.css";

export default function Candidates({ appliedjob }) {
  const updateJob = async (status) => {
    const res = await addAppliedJob({ ...appliedjob, status });

    if (res.resStatus === 200) {
      // setLoading(false);
      swal("Success!", "Job Status Changed", "success").then((value) => {
        window.location.reload();
      });
    } else {
      console.log(res);
      // setLoading(false);
      swal("Failed!", "Failed to Add Job. Try Again!!!", "error");
    }
  };

  const Status = ({ status }) => {
    if (status === "Accepted") {
      return <h6 style={{ color: "green", fontSize: "18px" }}>{status}</h6>;
    } else if (status === "Rejected") {
      return <h6 style={{ color: "red", fontSize: "18px" }}>{status}</h6>;
    } else
      return <h6 style={{ color: "orange", fontSize: "18px" }}>Pending</h6>;
  };

  const showResume = (resumeUrl) => {
    console.log(resumeUrl);
    window.open(resumeUrl, "_blank");
  };
  return (
    <div className="col-md-6 col-12">
      <div className="border shadow-sm rounded-lg p-3 m-1">
        <h5 className="">{appliedjob.name}</h5>
        <div className="small">Applied for: {appliedjob.jobName}</div>
        <br />
        <h6>Contact Details:</h6>
        <div>
          <EmailIcon fontSize="small" /> {appliedjob.email}
        </div>
        <div>
          <PhoneAndroidIcon fontSize="small" /> {appliedjob.phone}
        </div>
        <br />
        <div className="mt-2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => showResume(appliedjob.resumeUrl)}
          >
            Show Resume
          </Button>
          &emsp;
          <Button
            variant="outlined"
            color="primary"
            href={`mailto:${appliedjob.email}`}
          >
            Send Invite
          </Button>
        </div>
        <br />
        {!appliedjob.status || appliedjob.status === "Pending" ? (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateJob("Accepted")}
            >
              Accept
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="secondary"
              onClick={() => updateJob("Rejected")}
            >
              Reject
            </Button>
            &nbsp;
          </div>
        ) : (
          <Status status={appliedjob.status} />
        )}
      </div>
    </div>
  );
}
