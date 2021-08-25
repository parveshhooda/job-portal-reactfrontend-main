import React, { useState, useEffect } from "react";
import {
  viewAppliedJobFromServer,
  viewUserFromServer,
} from "../../Backend/sendRequestToServer";
import { useAuth } from "../../contexts/AuthContext";

//components
import Candidates from "./Candidates";
import Navbar from "./Navbar";

export default function ViewCandidates() {
  const { currentUser } = useAuth();

  const [appliedjobList, setappliedJobList] = useState("");

  useEffect(() => {
    getAppliedJobs();
  }, []);

  async function getAppliedJobs() {
    let users = {};
    const res = await viewUserFromServer();
    if (res.status === 200) {
      for (let user of res.result) {
        users[user.emailId] = user.resumeUrl ?? "";
      }
      console.log(res.result);
    }

    let jobList = await viewAppliedJobFromServer();

    if (jobList.status === 200) {
      let tempJobs = [];
      for (let job of jobList.result) {
        job.resumeUrl = users[job.email] ?? "";
        tempJobs.push(job);
      }
      if (currentUser.role === "Super Admin") setappliedJobList(tempJobs);
      else
        setappliedJobList(
          tempJobs.filter((job) => job.employerEmail === currentUser.emailId)
        );
    }
  }

  console.log(appliedjobList);

  return (
    <>
      <Navbar />
      <div className="container p-3">
        <h3 className="mt-3 mb-2 text-center">View Applied Candidates</h3>{" "}
        <br />
        <div className="row m-0">
          {appliedjobList
            ? appliedjobList.map((appliedjob, index) => (
                <Candidates appliedjob={appliedjob} key={index} />
              ))
            : ""}
        </div>
      </div>
    </>
  );
}
