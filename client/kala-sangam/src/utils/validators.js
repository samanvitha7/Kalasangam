// src/utils/validators.js

export const isEmailValid = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPasswordStrong = (password) => {
  if (password.length < 6) return false;
  if (!/\d/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  return true;
};

export const isPhoneNumberValid = (phoneNumber) => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }

  // Remove all spaces, dashes, parentheses, and dots for validation
  const cleanedNumber = phoneNumber.replace(/[\s\-().]/g, '');
  
  // Check if it starts with + (international format)
  const hasCountryCode = cleanedNumber.startsWith('+');
  
  if (hasCountryCode) {
    // International format: +[country code][number]
    // Should be between 10-18 digits total (including country code)
    const digitsOnly = cleanedNumber.substring(1); // Remove the +
    const isValidLength = digitsOnly.length >= 10 && digitsOnly.length <= 18;
    const isAllDigits = /^\d+$/.test(digitsOnly);
    return isValidLength && isAllDigits;
  } else {
    // Domestic format: assume it's a valid domestic number
    // Should be between 10-15 digits (most domestic numbers are 10-11 digits)
    const isValidLength = cleanedNumber.length >= 10 && cleanedNumber.length <= 15;
    const isAllDigits = /^\d+$/.test(cleanedNumber);
    return isValidLength && isAllDigits;
  }
};

// Helper function to format phone numbers for storage (removes formatting, keeps + if present)
export const formatPhoneForStorage = (phoneNumber) => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return '';
  }
  
  // Keep the + if it exists, remove all other formatting
  const cleaned = phoneNumber.replace(/[\s\-().]/g, '');
  return cleaned;
};

// Helper function to get phone validation error message
export const getPhoneValidationMessage = (phoneNumber) => {
  if (!phoneNumber) {
    return 'Phone number is required';
  }
  
  const cleaned = phoneNumber.replace(/[\s\-().]/g, '');
  
  if (cleaned.startsWith('+')) {
    const digitsOnly = cleaned.substring(1);
    if (!/^\d+$/.test(digitsOnly)) {
      return 'Phone number should contain only digits after country code';
    }
    if (digitsOnly.length < 10) {
      return 'International number too short (minimum 10 digits after country code)';
    }
    if (digitsOnly.length > 18) {
      return 'International number too long (maximum 18 digits after country code)';
    }
  } else {
    if (!/^\d+$/.test(cleaned)) {
      return 'Phone number should contain only digits (or + for international)';
    }
    if (cleaned.length < 10) {
      return 'Phone number too short (minimum 10 digits)';
    }
    if (cleaned.length > 15) {
      return 'Phone number too long (maximum 15 digits for domestic numbers)';
    }
  }
  
  return null; // Valid
};
