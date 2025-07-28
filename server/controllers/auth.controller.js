const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { validationResult } = require('express-validator');
const ArtistProfile = require('../models/Artist');


// Generate JWT token
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

  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Normalize role to proper casing
    const normalizedRole = role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : 'Viewer';

    const user = await User.create({
      name,
      email,
      password,
      role: normalizedRole,
      isEmailVerified: false // Start with unverified email
    });

    // ✅ Create ArtistProfile if role is artist
    if (normalizedRole === "Artist") {
      await ArtistProfile.create({
        userId: user._id,
        name: user.name,
        email: user.email,
        bio: "",
        profilePic: "",
        artworks: []
      });
    }

    // Generate email verification token and send email
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email using the new email service
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
      });

      const verificationUrl = `${req.protocol}://${req.get('host')}/api/email-verification/verify/${verificationToken}`;
      console.log('📧 Sending verification email to:', user.email);
      console.log('🔗 Verification URL:', verificationUrl);

      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: 'Verify Your Email - Kala Sangam',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #E05264, #134856); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Kala Sangam</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Traditional Arts Platform</p>
            </div>
            
            <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 20px;">Welcome to Kala Sangam!</h2>
              
              <p>Hello <strong>${user.name}</strong>,</p>
              
              <p>Thank you for joining our community! Please verify your email address to complete your registration.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" 
                   style="background: linear-gradient(135deg, #E05264, #134856); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 25px; 
                          font-weight: bold; 
                          display: inline-block;
                          box-shadow: 0 4px 12px rgba(224, 82, 100, 0.3);">
                  Verify My Email
                </a>
              </div>
              
              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="word-break: break-all; color: #E05264; font-size: 12px; background: #f8f9fa; padding: 10px; border-radius: 5px;">
                ${verificationUrl}
              </p>
            </div>
          </div>
        `
      };

      const emailResult = await transporter.sendMail(mailOptions);
      console.log('✅ Verification email sent successfully:', emailResult.messageId);
    } catch (emailError) {
      console.error('❌ Failed to send verification email:', emailError.message);
      console.error('❌ Full email error:', emailError);
    }

    // ✅ Generate token (user can login but will see verification prompt)
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Account created successfully! Please check your email to verify your account.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
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
    // Use userId if available, fallback to id for compatibility
    const userId = req.user.userId || req.user.id;
    
    if (!userId) {
      return res.status(401).json({ 
        message: 'User ID not found in request'
      });
    }
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found'
      });
    }
    
    // Return the user data directly from req.user if available, otherwise from DB
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      bio: user.bio,
      location: user.location,
      specialization: user.specialization,
      avatar: user.avatar,
      coverImage: user.coverImage,
      isVerified: user.isVerified,
      verificationStatus: user.verificationStatus,
      createdAt: user.createdAt
    };
    
    res.status(200).json({ user: userData });
    
  } catch (error) {
    console.error('Get me error:', error);
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
    // Hash the token to match what's stored in database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({ 
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpire = null;
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
