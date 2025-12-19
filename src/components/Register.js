import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";

const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerationSuccess, setRegisterationSuccess] = useState(null);

  const handleRegister = async () => {
    try {
      const { data } = await axios.post(
        `https://chat-chat-if63.onrender.com/auth/register`,
        { username, password }
      );
      setRegisterationSuccess(
        "You are registered successfully.Proceed to login."
      );
      console.log(data);
      setUser(data);

      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
      setRegisterationSuccess(
        error.response?.data?.message || "Error registering user"
      );
    } finally {
      setTimeout(() => setRegisterationSuccess(null), 2000);
    }
  };

  return (
    <div className="card  py-5 text-center">
      <div className="card-body">
        <h2>Register</h2>
        <p>Not a user yet? Register here</p>
        <p>{registerationSuccess}</p>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={username}
          className="form-control mt-3"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          className="form-control mt-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-success btn-lg mt-3"
          onClick={handleRegister}
        >
          Register
        </button>
        <p>
          Already have an account {" "} <Link to="/login">Login</Link>
        </p>
       
      </div>
    </div>
  );
};
export default Register;
