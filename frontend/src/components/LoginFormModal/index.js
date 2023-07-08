import React, {useEffect, useState} from "react";
import * as sessionActions from "../../store/session";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const {closeModal} = useModal();

  useEffect(() => {
    const errorsOj = {};

    if (credential.length < 4)
      errorsOj.credential = "Username must be at least 4 characters";

    if (password.length < 6)
      errorsOj.password = "Password must be at least 6 characters";

    setErrors(errorsOj);
  }, [credential, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({credential, password}))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        const errObj = {};
        if (data && data.message) {
          errObj.message = data.message;

          setErrors(errObj);
        }
      });
  };

  const demoUser = (e) => {
    e.preventDefault();

    const credential = "demo@user.io";
    const password = "password";

    return dispatch(sessionActions.login({credential, password})).then(
      closeModal
    );
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        {errors.message && <p>{errors.message}</p>}
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Log In
        </button>
        <button onClick={demoUser}>Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
