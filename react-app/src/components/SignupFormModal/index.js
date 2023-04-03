import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { clearHistoryState } from "../../store/portfolioHistory";
import { clearInvestmentState } from "../../store/investments";
import { clearPortfolioState } from "../../store/portfolio";
import { clearTransactionState } from "../../store/transactions";
import { clearWatchlistsState } from "../../store/watchlists";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(clearPortfolioState());
      dispatch(clearInvestmentState());
      dispatch(clearHistoryState());
      dispatch(clearTransactionState());
      dispatch(clearWatchlistsState());
      if (email.includes("@") === false) {
        setErrors(["Must be a valid email address"]);
        return;
      }
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="sign-form-container">
      <div className="sign-form-div">
        <div className="sign-form-header">Sign Up</div>
        <form onSubmit={handleSubmit} className="sign-form-form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="sign-form-section-div">
            <label>
              <div>Email</div>
              <input
                type="text"
                value={email}
                className="sign-form-input"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="sign-form-section-div">
            <label>
              <div>Username</div>
              <input
                type="text"
                value={username}
                className="sign-form-input"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="sign-form-section-div">
            <label>
              <div>Password</div>
              <input
                type="password"
                value={password}
                className="sign-form-input"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="sign-form-section-div">
            <label>
              <div>Confirm Password</div>
              <input
                type="password"
                value={confirmPassword}
                className="sign-form-input"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="sign-form-section-div sign-button-div">
            <button className="sign-form-button" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
