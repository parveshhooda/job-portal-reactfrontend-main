import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//material UI
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

export default function Job({ job }) {
  return (
    <div className="col-12">
      <div className="border shadow-sm rounded-lg p-3 m-2">
        <h4 className="mb-2">{job.title}</h4>
        <div className="row">
          <div className="col-6">
            <div className="mb-3 badge badge-primary">{job.type}</div>
          </div>
          {/* <div className="col-6 text-right">
            <Link
              to="/view-candidates"
              className="small bg-primary text-white font-weight-bold pl-2 pr-2 rounded-pill text-decoration-none pb-1"
            >
              View Candidates
            </Link>
          </div> */}
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
        <div className="small">{job.description}</div>
      </div>
    </div>
  );
}
