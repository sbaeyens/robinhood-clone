import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoClick = async () => {
    setPassword("password");
    setEmail("demo@aa.io");
    dispatch(login("demo@aa.io", "password"));

  };

  return (
    <div className="login-form-container">
      <div className="login-form-div">
        <h1 className="login-form-header">Log In</h1>
        <form className="login-form-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <input
              className="login-form-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              className="login-form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="login-form-section-div">
          <button className="login-form-buttons-login" type="submit">
            Log In
          </button>
          </div>
          <div className="login-form-section-div">
            <button
              className="login-form-buttons-demo"
              onClick={() => handleDemoClick()}
            >
              Demo User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
