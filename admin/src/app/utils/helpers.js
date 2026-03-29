// Helper utility functions

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },
};

// API helpers
export const apiHelpers = {
  // Simulate API delay
  delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Handle API errors
  handleError: (error) => {
    console.error("API Error:", error);
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  },
};

// Validation helpers
export const validators = {
  isEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isPhoneNumber: (phone) => {
    const phoneRegex = /^(\+63|0)[0-9]{10}$/;
    return phoneRegex.test(phone);
  },

  isRequired: (value) => {
    return (
      value !== null && value !== undefined && value.toString().trim() !== ""
    );
  },
};
