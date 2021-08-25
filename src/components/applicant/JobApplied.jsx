import React, { useState, useEffect } from "react";

//material UI
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { viewJobFromServer } from "../../Backend/sendRequestToServer";

export default function JobApplied({ appliedJob }) {
  const [jobList, setJobList] = useState();

  useEffect(() => {
    viewJobFromServer().then((jobList) => {
      if (jobList.status === 200) setJobList(jobList.result);
    });
  }, []);

  const Status = ({ status }) => {
    if (status === "Accepted") {
      return <div style={{ color: "green" }}>{status}</div>;
    } else if (status === "Rejected") {
      return <div style={{ color: "red" }}>{status}</div>;
    } else return <div style={{ color: "orange" }}>Pending</div>;
  };

  return (
    <div className="col-12">
      {jobList
        ? jobList.map((job, index) =>
            job.title === appliedJob.jobName ? (
              <div key={index} className="border shadow-sm rounded-lg m-2 p-3">
                <h4 className="mb-2">
                  {job.title} - <Status status={appliedJob.status} />
                </h4>
                <div className="mb-3 badge badge-primary">{job.type}</div>
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
                <div className="small">{job.description}</div>
              </div>
            ) : (
              ""
            )
          )
        : ""}
    </div>
  );
}
