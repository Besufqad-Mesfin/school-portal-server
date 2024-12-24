const mockUser = {
  email: "test@example.com",
  password: "123456", // Plain text password for simplicity
  _id: "12345",
  lastLogin: null,
};

export const login = (req, res) => {
 
  const { email, password } = req.body;

  try {
    // Check if the email matches the mock user's email
    const user = mockUser.email === email ? mockUser : null;

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Check if the password matches the mock user's password
    if (password !== user.password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Update last login time in the mock object
    user.lastLogin = new Date();

    return res.status(200).json({ success: true, message: "Successfully logged in" });
  } catch (error) {
    console.log("Error in login:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
