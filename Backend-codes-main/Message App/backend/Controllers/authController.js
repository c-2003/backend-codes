import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register User
export const register = (req, res) => {
  const { name, email, phone_number, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = { name, email, phone_number, password: hashedPassword, role };
  User.create(newUser, (err, result) => {
    if (err) return res.status(500).json({ msg: "Error in registration" });
    res.json({ msg: "User registered successfully" });
  });
};

// Login User
export const login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ msg: "Invalid credentials" });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    User.updateStatus(user.id, 1, () =>
      res.json({ msg: "Login successful", user })
    );
  });
};

// Logout User
export const logout = (req, res) => {
  const { userId } = req.body;
  User.updateStatus(userId, 0, () => res.json({ msg: "Logout successful" }));
};
