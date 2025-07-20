// src/utils/validators.js

export const isEmailValid = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPasswordStrong = (password) =>
  password.length >= 6;

export const isPhoneNumberValid = (phoneNumber) => {
  // Accepts various phone number formats including international
  const phoneRegex = /^[+]?[(]?[\d\s\-()]{10,18}$/;
  return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
};
