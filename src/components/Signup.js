import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Context } from "../context/notes/AlertState";

const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  // const { showAlert } = Context();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) showAlert("Passwords do not match", "danger");
    else if(/[^\d]/.test(email.slice(0, email.lastIndexOf("@")))) showAlert("Email should contain at least one letter in the local part along with the numbers.", "danger");
    else {
      const response = await fetch(
        `http://localhost:5000/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      const json = await response.json();
      // console.log(json);
      if (json.success) {
        // Set the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        showAlert("Signed up successfully", "success");
        navigate("/");
      } else {
        showAlert("Invalid credentials", "danger");
      }
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleOnSubmit}>
        <h2>Create an account to use OneNote</h2>
        <div className="my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <span className="required">*</span>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <span className="required">*</span>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            onChange={handleOnChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <span className="required">*</span>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={handleOnChange}
            minLength={5}
            required
          />
          <div id="passHelp" className="form-text">
            Your password is secure and end to end encrypted.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <span className="required">*</span>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            onChange={handleOnChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="custom-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
