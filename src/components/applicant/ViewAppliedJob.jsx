import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

//components
import Navbar from "./Navbar";
import JobApplied from "./JobApplied";
import {
  viewAppliedJobFromServer,
  viewAppliedJobOfCandidateFromServer,
} from "../../Backend/sendRequestToServer";

export default function ViewAppliedJob() {
  //states
  const [appliedJobList, setAppliedJobList] = useState();

  const { currentUser } = useAuth();

  useEffect(() => {
    viewAppliedJobOfCandidateFromServer(currentUser ?? {}).then(
      (appliedJobList) => {
        if (appliedJobList.status === 200)
          setAppliedJobList(appliedJobList.result);
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="container pt-4 pb-4">
        <div className="mt-3 mb-3">
          <h3 className="text-center">Applied Jobs</h3> <br />
          <div className="row m-0">
            {appliedJobList
              ? appliedJobList.map((appliedJob, index) => (
                  <JobApplied appliedJob={appliedJob} key={index} />
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
