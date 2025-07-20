const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { validationResult } = require('express-validator');

// ✅ Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// ✅ REGISTER CONTROLLER
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create user with email already verified (no email verification required)
    const user = await User.create({ 
      name, 
      email, 
      password, 
      isEmailVerified: true  // Auto-verify for immediate access
    });

    // Generate JWT token immediately
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

// ✅ PHONE REGISTER CONTROLLER
const registerWithPhone = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, phoneNumber, password } = req.body;

  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already in use' });
    }

    // Create user with phone number
    const user = await User.create({ 
      name, 
      phoneNumber, 
      password,
      isEmailVerified: true  // Auto-verify for immediate access
    });

    // Generate JWT token immediately
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

// ✅ LOGIN CONTROLLER
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Email verification check removed - users can login immediately

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// ✅ PHONE LOGIN CONTROLLER
const loginWithPhone = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// ✅ ADMIN LOGIN CONTROLLER
const adminLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user has admin role
    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Admin login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Admin login failed', error: error.message });
  }
};

// ✅ FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = user.generatePasswordReset(); // assumes your User model has this method
    await user.save();

    const resetURL = `http://localhost:5174/reset-password/${resetToken}`;
    const message = `Click to reset password: ${resetURL}`;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset',
      text: message,
    });

    res.status(200).json({ message: 'Reset email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send reset email', error: error.message });
  }
};

// ✅ RESET PASSWORD
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Password reset failed', error: error.message });
  }
};

// ✅ GET CURRENT USER
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
};

// ✅ LOGOUT
const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully (client should delete token)' });
};

// ✅ VERIFY EMAIL
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ emailVerificationToken: token });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    await user.save();

    res.status(200).json({
      message: 'Email verified successfully! You can now log in.',
      verified: true
    });
  } catch (error) {
    res.status(500).json({ message: 'Email verification failed', error: error.message });
  }
};

// ✅ RESEND VERIFICATION EMAIL
const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = emailVerificationToken;
    await user.save();

    const verificationURL = `http://localhost:5174/verify-email/${emailVerificationToken}`;
    const message = `Please verify your email by clicking the link: ${verificationURL}`;

    await sendEmail({
      to: user.email,
      subject: 'KalaSangam - Verify Your Email',
      text: message,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h1 style="color: #284139; text-align: center;">Verify Your Email</h1>
          <p style="font-size: 16px; color: #555;">Please verify your email address to complete your registration.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationURL}" style="background: #284139; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">Verify Email</a>
          </div>
          <p style="color: #666; font-size: 14px;">If you didn't create this account, please ignore this email.</p>
        </div>
      `
    });

    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send verification email', error: error.message });
  }
};

// ✅ EXPORT ALL CONTROLLERS
module.exports = {
  register,
  registerWithPhone,
  login,
  loginWithPhone,
  adminLogin,
  forgotPassword,
  resetPassword,
  getMe,
  logout,
  verifyEmail,
  resendVerificationEmail,
};
