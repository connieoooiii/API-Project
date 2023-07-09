import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);
  const {closeModal} = useModal();

  useEffect(() => {
    const errorsObj = {};

    if (!username) errorsObj.username = "Username is required";
    if (!email) errorsObj.email = "Email is required";
    if (!firstName) errorsObj.firstName = "First name is required";
    if (!lastName) errorsObj.lastName = "Last name is required";
    if (!password) errorsObj.password = "Password is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorsObj.email = "Please enter a valid email address";
    }

    if (username.length < 4)
      errorsObj.username = "Username must be at least 4 characters";
    if (password.length < 6)
      errorsObj.password = "Password must be at least 6 characters";

    setErrors(errorsObj);
  }, [username, email, firstName, lastName, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDidSubmit(true);

    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          console.log("data", data);
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  const disabled = password.length < 6 || username.length < 4 ? true : null;

  return (
    <div className="sign-up-wrap" style={{borderRadius: "10%"}}>
      <h1 className="sign-header">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />

        {didSubmit && errors.email && (
          <p className="sign-err">{errors.email}</p>
        )}

        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
        />

        {didSubmit && errors.username && (
          <p className="sign-err">{errors.username}</p>
        )}

        <input
          className="form-input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First Name"
        />

        {didSubmit && errors.firstName && (
          <p className="sign-err">{errors.firstName}</p>
        )}

        <input
          className="form-input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last Name"
        />

        {didSubmit && errors.lastName && (
          <p className="sign-err">{errors.lastName}</p>
        )}

        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />

        {didSubmit && errors.password && <p>{errors.password}</p>}

        <input
          className="form-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm Password"
        />

        {didSubmit && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <div>
          <button
            disabled={disabled}
            className={`signup-btn ${disabled ? "inactive" : ""}`}
            type="submit"
            style={{
              width: "15.5rem",
              height: "2rem",
              marginBottom: "2rem",
              marginLeft: "0.5rem",
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
