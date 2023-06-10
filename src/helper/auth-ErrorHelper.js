const ValError = (success, message) => {
  return { success: success, error: message };
};

module.exports = { ValError };
