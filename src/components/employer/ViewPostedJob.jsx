import React, { useState, useEffect } from "react";
import {
  viewJobFromServer,
  viewUserFromServer,
} from "../../Backend/sendRequestToServer";
import { useAuth } from "../../contexts/AuthContext";

//component
import Job from "./Job";
import Navbar from "./Navbar";

//material UI

export default function ViewPostedJob() {
  //states
  const [jobList, setJobList] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    viewJobFromServer().then((jobList) => {
      if (jobList.status === 200)
        if (currentUser.role === "Super Admin") setJobList(jobList.result);
        else
          setJobList(
            jobList.result.filter(
              (job) => job.employerEmail === currentUser.emailId
            )
          );
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container p-3">
        <h3 className="mt-3 text-center">View Posted Job</h3> <br />
        <div className="row m-0">
          {jobList
            ? jobList.map((job, index) => <Job job={job} key={index} />)
            : ""}
        </div>
      </div>
    </div>
  );
}
