import React, { useState, useEffect } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";

const Register = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [group, setGroup] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    await authStore.register(email, password, firstName, lastName, phone, selectedGroup);
  };

  useEffect(() => {
    axios
      .get("https://orenvadi.pythonanywhere.com/api/v1/group/all")
      .then((resp) => {
        setGroup(resp.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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

        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />

        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />

        <select
          name="group"
          id="group"
          onChange={(e) => setSelectedGroup(e.target.value)}
          value={selectedGroup}
        >
          {group.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <button type="submit">Register</button>
      </form>
      {authStore.error && <p>{authStore.error}</p>}
    </div>
  );
});

export default Register;
