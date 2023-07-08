import React, {useEffect, useState} from "react";
import * as sessionActions from "../../store/session";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);
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
    setDidSubmit(true);

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

  const disabled = password.length < 6 || credential.length < 4 ? true : null;

  return (
    <div className="log-wrap">
      <h1>Log In</h1>
      {didSubmit && errors.credential && (
        <p className="log-err">{errors.credential}</p>
      )}
      {didSubmit && errors.message && (
        <p className="log-err">{errors.message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="log-input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
        </div>

        <div>
          <input
            className="log-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <div className="log-btns">
          <button
            className={`log-submit ${disabled ? "inactive" : ""}`}
            type="submit"
            disabled={disabled}
          >
            Log In
          </button>
          <button className="demo-btn" onClick={demoUser}>
            Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
