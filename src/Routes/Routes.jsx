import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

//components
//employer
import EmployerLogin from "../components/employer/EmployerLogin";

import AddRole from "../components/employer/AddRole";
import ViewRole from "../components/employer/ViewRole";
import PostJob from "../components/employer/PostJob";
import ViewPostedJob from "../components/employer/ViewPostedJob";
import GetStarted from "../components/employer/GetStarted";

import ApplicantSignup from "../components/applicant/ApplicantSignup";
import ApplicantLogin from "../components/applicant/ApplicantLogin";
import AvailableJobs from "../components/applicant/AvailableJobs";
import ViewAppliedJob from "../components/applicant/ViewAppliedJob";
import ViewCandidates from "../components/employer/ViewCandidates";
import AddUser from "../components/employer/AddUser";
import ViewUsers from "../components/employer/ViewUsers";
import ResetPassword from "../components/employer/ResetPassword";
import EmailVerification from "../Common/EmailVerification";
import ForgotPassword from "../Common/ForgotPassword";
import UploadResume from "../components/applicant/UploadResume";

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/getstarted">
            <GetStarted />
          </Route>

          <Route exact path={["/employer-login", "/"]}>
            <EmployerLogin />
          </Route>
          <Route exact path="/reset-password">
            <ResetPassword />
          </Route>

          <Route exact path="/emailVerification">
            <EmailVerification />
          </Route>

          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>

          <Route exact path="/add-user">
            <AddUser />
          </Route>
          <Route exact path="/view-user">
            <ViewUsers />
          </Route>

          <Route exact path="/add-role">
            <AddRole />
          </Route>
          <Route exact path="/view-role">
            <ViewRole />
          </Route>

          <Route exact path="/post-job">
            <PostJob />
          </Route>

          <Route exact path="/view-posted-jobs">
            <ViewPostedJob />
          </Route>

          <Route exact path="/applicant-login">
            <ApplicantLogin />
          </Route>
          <Route exact path="/applicant-signup">
            <ApplicantSignup />
          </Route>

          <Route exact path="/available-jobs">
            <AvailableJobs />
          </Route>

          <Route exact path="/view-applied-jobs">
            <ViewAppliedJob />
          </Route>
          <Route exact path="/view-applied-candidates">
            <ViewCandidates />
          </Route>
          <Route exact path="/upload-resume">
            <UploadResume />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
