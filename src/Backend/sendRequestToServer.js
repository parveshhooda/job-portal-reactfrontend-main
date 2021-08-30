import { useAuth } from "../contexts/AuthContext";

//const SERVER = "https://job-portal-latest.herokuapp.com";
// const SERVER = "http://localhost:8082";
//const SERVER = "https://jobportalproject2021-server.herokuapp.com";
//const SERVER = "https://jobportal-backend-for-netlify.herokuapp.com";
const SERVER =
  "http://jobportalnew-env.eba-f3i3nvpz.ap-south-1.elasticbeanstalk.com";
export async function loginWithServer(data) {
  try {
    const res = await fetch(SERVER + "/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function addUser(data) {
  try {
    const id = Math.floor(Math.random() * 100);
    const res = await fetch(SERVER + "/addUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function changePassword(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/resetPassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function verifyUser(data) {
  try {
    const res = await fetch(SERVER + "/verifyUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function sendOtpVerification(data) {
  try {
    const res = await fetch(SERVER + "/forgotPassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function verifyOtp(data) {
  try {
    const res = await fetch(SERVER + "/verifyOtp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function changeToNewPassword(data) {
  try {
    const res = await fetch(SERVER + "/changePassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function viewUserFromServer() {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/viewUser", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const result = await res.json();
    return { status: res.status, result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function addRole(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const id = Math.floor(Math.random() * 100);
    const res = await fetch(SERVER + "/addRole", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function viewRoleFromServer() {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/viewRole", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const result = await res.json();
    return { status: res.status, result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function editRoleFromServer(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/editRole", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function editUserFromServer(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/editUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function deleteRoleFromServer(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/deleteRole", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.text();
    return { status: res.status, result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function deleteUserFromServer(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/deleteUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.text();
    return { status: res.status, result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function getPrevilegesFromServer(role) {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    let previleges = [];
    const roles = await viewRoleFromServer();

    if (roles.status == 200 && roles.result) {
      for (let rol of roles.result) {
        if (rol.role === role) {
          previleges = JSON.parse(rol.permission_Arr)["privileges"];
          break;
        }
      }
    }

    console.log(previleges);

    return { status: 200, previleges };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function addJob(obj) {
  /*  Job Model : 
      title
      city
      openings
      description
      skills
      ctc
      uid
      employerEmail */
  const data = {
    title: obj.jobTitle,
    type: obj.jobType,
    city: obj.city,
    openings: obj.openings,
    description: obj.description,
    skills: obj.skills,
    ctc: obj.ctc,
    uid: obj.uid,
    employerEmail: obj.employerEmail,
  };
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/addJob", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    console.log(result);
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function viewJobFromServer() {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/viewJob", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const result = await res.json();
    console.log(result);
    return { status: res.status, result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function addAppliedJob(data) {
  /*  Job Model : 
      name
      phone
      email
      uid
      employeeEmail
      jobName
      appliedJobId
      */

  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/addAppliedJob", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    console.log(result);
    return { resStatus: res.status, ...result };
  } catch (e) {
    return { resStatus: 400, error: e.message };
  }
}

export async function viewAppliedJobFromServer() {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/viewAppliedJob", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const result = await res.json();
    console.log(result);
    return { status: res.status, result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}

export async function viewAppliedJobOfCandidateFromServer(data) {
  console.log("Applied job Candidate : ", { data });
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/viewAppliedJobOfCandidate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    console.log(result);
    return { status: res.status, result };
  } catch (e) {
    console.log(e);
    return { status: 400, error: e.message };
  }
}

export async function editResumeOfUser(data) {
  const user = JSON.parse(localStorage.getItem("user"));
  let jwt;
  if (user && user.jwt) {
    jwt = user.jwt;
  } else {
    return { status: 400, error: "Access Token is not Assigned" };
  }
  try {
    const res = await fetch(SERVER + "/editResumeOfUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await res.json();
    return { status: res.status, ...result };
  } catch (e) {
    return { status: 400, error: e.message };
  }
}
