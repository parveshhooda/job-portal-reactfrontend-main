import React, { useState, useEffect } from "react";

//components
import Navbar from "./Navbar";
import Job from "./Job";
import { viewJobFromServer } from "../../Backend/sendRequestToServer";

export default function AvailableJobs() {
  const [jobList, setJobList] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    viewJobFromServer().then((jobList) => {
      if (jobList.status === 200) setJobList(jobList.result);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container p-3">
        <h3 className="mt-3 mb-4 text-center">Jobs Available</h3>
        <div className="row m-0">
          {jobList
            ? jobList.map((job, index) => <Job job={job} key={index} />)
            : ""}
        </div>
      </div>
    </div>
  );
}
