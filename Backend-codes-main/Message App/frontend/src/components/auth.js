import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
  });

  const handleRegister = () => {
    axios
      .post("/api/auth/register", formData)
      .then((response) => alert(response.data.msg))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <select
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="Student">Student</option>
        <option value="Teacher">Teacher</option>
        <option value="Institute">Institute</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Auth;
