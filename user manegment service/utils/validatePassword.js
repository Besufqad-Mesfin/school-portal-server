
export function validatePassword(password) {
    // Check for a minimum length of 8 characters
    const minLength = /.{8,}/;
    if (!minLength.test(password)) {
      return false;
    }
  
    // Check for at least one uppercase letter
    const hasUpperCase = /[A-Z]/;
    if (!hasUpperCase.test(password)) {
      return false;
    }
  
    // Check for at least one lowercase letter
    const hasLowerCase = /[a-z]/;
    if (!hasLowerCase.test(password)) {
      return false;
    }
  
    // Check for at least one number
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      return false;
    }
  
    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (!hasSpecialChar.test(password)) {
      return false;
    }
  
    // If all checks pass, return true
    return true;
  }
  