// Login.js
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await authStore.login(email, password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {authStore.error && <p>{authStore.error}</p>}
    </div>
  );
});

export default Login;
