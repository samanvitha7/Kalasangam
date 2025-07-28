const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

// POST /api/email-verification/send - Send verification email
router.post('/send', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    if (!user.email) {
      return res.status(400).json({
        success: false,
        message: 'No email address found for this account'
      });
    }

    // Generate verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Create verification URL
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/email-verification/verify/${verificationToken}`;

    // Send verification email
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
            
            <p>Thank you for joining our community of traditional arts enthusiasts! To complete your account setup and start exploring, please verify your email address.</p>
            
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
              If the button doesn't work, you can also copy and paste this link into your browser:
            </p>
            <p style="word-break: break-all; color: #E05264; font-size: 12px; background: #f8f9fa; padding: 10px; border-radius: 5px;">
              ${verificationUrl}
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p><strong>This verification link will expire in 24 hours.</strong></p>
              <p>If you didn't create an account with Kala Sangam, please ignore this email.</p>
              <p>For support, contact us at support@kalasangam.com</p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Verification email sent successfully. Please check your inbox and spam folder.'
    });

  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send verification email'
    });
  }
});

// GET /api/email-verification/verify/:token - Verify email with token
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Hash the token to match with database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with matching token and check expiration
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 10px;">
          <div style="color: #dc3545; font-size: 60px; margin-bottom: 20px;">❌</div>
          <h2 style="color: #dc3545; margin-bottom: 20px;">Verification Failed</h2>
          <p style="color: #666; margin-bottom: 30px;">This verification link is invalid or has expired.</p>
          <p style="color: #666; font-size: 14px;">Please request a new verification email from your account settings.</p>
          <a href="/home" style="background: #E05264; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">
            Return to Website
          </a>
        </div>
      `);
    }

    // Mark email as verified and clear verification fields
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpire = null;
    await user.save();

    res.send(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 10px;">
        <div style="color: #28a745; font-size: 60px; margin-bottom: 20px;">✅</div>
        <h2 style="color: #28a745; margin-bottom: 20px;">Email Verified Successfully!</h2>
        <p style="color: #666; margin-bottom: 30px;">Welcome to Kala Sangam, <strong>${user.name}</strong>!</p>
        <p style="color: #666; margin-bottom: 30px;">Your email has been verified and your account is now fully activated.</p>
        <a href="/home" style="background: linear-gradient(135deg, #E05264, #134856); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; box-shadow: 0 4px 12px rgba(224, 82, 100, 0.3);">
          Continue to Kala Sangam
        </a>
        <p style="color: #666; font-size: 14px; margin-top: 30px;">You can now close this tab and continue using the platform.</p>
      </div>
    `);

  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).send(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 10px;">
        <div style="color: #dc3545; font-size: 60px; margin-bottom: 20px;">⚠️</div>
        <h2 style="color: #dc3545; margin-bottom: 20px;">Verification Error</h2>
        <p style="color: #666; margin-bottom: 30px;">Something went wrong while verifying your email.</p>
        <p style="color: #666; font-size: 14px;">Please try again later or contact support.</p>
      </div>
    `);
  }
});

// GET /api/email-verification/status - Check verification status
router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('isEmailVerified email');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        isEmailVerified: user.isEmailVerified,
        email: user.email,
        hasEmail: !!user.email
      }
    });

  } catch (error) {
    console.error('Error checking verification status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check verification status'
    });
  }
});

module.exports = router;
