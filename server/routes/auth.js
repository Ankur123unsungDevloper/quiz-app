import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Ensure the correct path to your User model

// User Signup
export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ username, password: hashedPassword });
    await newUser .save();
    res.status(201).json({ message: 'User  registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User  not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check Authentication Status
export const checkAuth = (req, res) => {
  res.json({ message: 'User  is authenticated', user: req.user });
};

// User Logout
export const logout = (req, res) => {
  // Handle logout logic (e.g., invalidate token on client-side)
  res.json({ message: 'User  logged out successfully' });
};

// Verify Email (Placeholder)
export const verifyEmail = (req, res) => {
  // Implement email verification logic
  res.json({ message: 'Email verification link sent' });
};

// Forgot Password (Placeholder)
export const forgotPassword = (req, res) => {
  // Implement forgot password logic
  res.json({ message: 'Password reset link sent' });
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verify token logic here (not implemented)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update user password logic here (not implemented)
    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};