import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function LoginComponent() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("customer");
  const navigate = useNavigate();
  const AuthContext = useAuth();

  function addEmail(event) {
    setUserName(event.target.value);
  }

  function addPassword(event) {
    setPassword(event.target.value);
  }

  function changeOption(event) {
    console.log(event.target.value);
    setUserType(event.target.value);
  }

  function signup() {
    navigate("/signup");
  }

  async function checkValidation() {
    console.log(userType);
    if (await AuthContext.login(userName, password, userType)) {
      if (userType === "customer") navigate(`/Articles/${userName}`);
      else navigate(`/MyArticlesForSeller/${userName}`);
      //return <Navigate to="/Articles/${userName}"/>
      //setErrorMessage("Please Provide Correct Username and Password")
      //setAuthentication(true)
    } else {
      setErrorMessage("Please Provide Correct Username and Password");
    }
  }

  return (
    <div>
      <div className="container">{errorMessage}</div>
      <form className="form mt-5">
        <div className="form-group">
          <label className="mr-3" htmlFor="exampleInputEmail1">
            Email address
          </label>
          <input
            type="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            autoComplete="on"
            onChange={addEmail}
          />
        </div>
        <div className="form-group">
          <label className="mr-3" htmlFor="exampleInputPassword1">
            Password
          </label>
          <input
            type="password"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={addPassword}
          />
        </div>
        <div>
          <label className="btn btn-secondary">
            <input
              type="radio"
              name="options"
              value="customer"
              checked={userType === "customer"}
              autoComplete="on"
              onChange={changeOption}
            />{" "}
            Customer
          </label>
          <label className="btn btn-secondary ml-3">
            <input
              type="radio"
              name="options"
              value="seller"
              checked={userType === "seller"}
              onChange={changeOption}
            />{" "}
            Seller
          </label>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary m-3"
            onClick={checkValidation}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-primary m-3"
            onClick={signup}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
