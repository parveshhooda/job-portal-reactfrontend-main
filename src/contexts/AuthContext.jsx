import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  candidateLoginWithServer,
  loginWithServer,
} from "../Backend/sendRequestToServer";
import firebase from "firebase/app";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function initFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyDhqMOYAoxr6mDD8esUzDnqI_JNZZIgC2I",
      authDomain: "job-portal-latest.firebaseapp.com",
      projectId: "job-portal-latest",
      storageBucket: "job-portal-latest.appspot.com",
      messagingSenderId: "786750618884",
      appId: "1:786750618884:web:b98c0dae338ca972a3e451",
      measurementId: "G-M2K3RJ986S",
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    console.log(firebase.storage().app);
  }

  async function login(email, password, candidate) {
    let res = await loginWithServer({
      emailId: email,
      password: password,
      isApplicant: candidate,
    }); // Response contains status and User Object

    console.log({ res });
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res));
      setCurrentUser(res);
      setLoading(false);
    }
    return res;
  }

  function setUserDetails(res) {
    localStorage.setItem("user", JSON.stringify(res));
    setCurrentUser(res);
  }

  function logout() {
    localStorage.clear();
    setCurrentUser();
  }

  useEffect(() => {
    const res = localStorage.getItem("user");
    if (res) {
      setCurrentUser(JSON.parse(res));
    }
    initFirebase();
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    setUserDetails,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
