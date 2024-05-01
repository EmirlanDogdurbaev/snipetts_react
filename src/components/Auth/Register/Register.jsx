import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {signup} from "../../../store/Slices/authSlice.js";

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const loading = useSelector((state) => state.auth.status === "loading");
  const error = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);

  const handleSignup = () => {
    dispatch(signup({ username, password, email }));

  };

  if (token) {
    return null;
  }

  return (
      <div >
        <div>
          <h2>Signup</h2>
          <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <button
              onClick={() => {
                handleSignup();
              }}
              disabled={loading}
          >
            {loading ? "Loading..." : "Signup"}
          </button>



          {error && <p>Error: {error}</p>}
        </div>
      </div>
  );
};

export default Register;
