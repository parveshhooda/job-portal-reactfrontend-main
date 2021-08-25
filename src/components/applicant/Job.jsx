import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

//material UI
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Divider } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//components
import swal from "sweetalert";
import { addAppliedJob } from "../../Backend/sendRequestToServer";
import { useAuth } from "../../contexts/AuthContext";

export default function Job({ job }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { currentUser } = useAuth();

  const handleApplySubmit = async (jobName, appliedJobId) => {
    // setError("");
    setLoading(true);
    const values = {
      name: currentUser.userName,
      phone: currentUser.number,
      email: currentUser.emailId,
      uid: currentUser ? currentUser.id : "",
      jobName: jobName ? jobName : "",
      appliedJobId: appliedJobId ?? "",
      employerEmail: job.employerEmail ?? "",
    };

    const res = await addAppliedJob(values);

    if (res.resStatus === 200) {
      setLoading(false);
      swal("Success!", "Applied Job Added", "success").then((value) => {
        history.push("/view-applied-jobs");
      });
    } else {
      console.log(res);
      setLoading(false);
      swal("Failed!", "Failed to Add Job. Try Again!!!", "error");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="col-12">
      <div className="m-1">
        <div className="border shadow-sm rounded-lg p-3">
          <h4 className="mb-2">{job.title}</h4>
          <div className="row m-0">
            <div className="col-6">
              <div className="mb-3 badge badge-primary">{job.type}</div>
            </div>
            <div className="col-6 text-right small">
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleApplySubmit(job.title, job.id)}
                  size="small"
                >
                  Apply Job
                </Button>
              </div>
            </div>
          </div>
          <div className="row m-0 mb-3 small">
            <div className="col-4 p-0">
              <LocationOnIcon fontSize="small" /> {job.city}
            </div>
            <div className="col-4 p-0">
              <PersonIcon fontSize="small" /> Openings: {job.openings}
            </div>

            <div className="col-4 p-0">
              <AttachMoneyIcon fontSize="small" /> CTC: ₹{job.ctc}
            </div>
          </div>
          <div className="mb-2 small">
            <span className="font-weight-bold">Skills</span>
            <br />
            {job.skills}
          </div>
          <div className="small mb-3">{job.description}</div>
          <Divider />
          <div className="small mt-2">
            <span className="font-weight-bold">Contact:</span>{" "}
            {job.employerEmail}
          </div>
        </div>
      </div>
    </div>
  );
}
