const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    console.log('Creating email transporter...');
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_EMAIL ? process.env.SMTP_EMAIL.substring(0, 5) + '***' : 'undefined'
    });
    
    // For development, you can use Ethereal Email for testing
    let transporter;
    
    if (process.env.NODE_ENV === 'development' && process.env.USE_TEST_EMAIL === 'true') {
      // Create a test account with Ethereal Email
      const testAccount = await nodemailer.createTestAccount();
      
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('Using Ethereal Email for testing');
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }

    // Verify connection configuration
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.to || options.email,
      subject: options.subject,
      text: options.text || options.message,
      html: options.html
    };

    console.log('Sending email to:', message.to);
    const info = await transporter.sendMail(message);
    console.log('Email sent successfully! Message ID:', info.messageId);
    
    // If using test email, show preview URL
    if (process.env.NODE_ENV === 'development' && process.env.USE_TEST_EMAIL === 'true') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('SendEmail error:', error);
    throw error;
  }
};

module.exports = sendEmail;
