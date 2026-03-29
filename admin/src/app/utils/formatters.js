// Utility functions for formatting and helpers

// Format currency to Philippine Peso
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date and time
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Format date only
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Format number with commas
export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-PH").format(number);
};

// Capitalize first letter
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
