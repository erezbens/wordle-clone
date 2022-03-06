import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  logout,
} from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/Login.css";

function Logout() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return <></>;
}

export default Logout;
