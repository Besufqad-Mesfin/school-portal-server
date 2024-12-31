// controllers/Logout/studentLogout.js
export const studentLogout = (req, res) => {
    try {
        // If using sessions
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error during logout:', err);
                    return res.status(500).json({ success: false, message: 'Failed to log out. Please try again.' });
                }
                res.clearCookie('connect.sid'); // Clear the session cookie
                return res.status(200).json({ success: true, message: 'Successfully logged out.' });
            });
        } else {
            // If using tokens (e.g., JWT)
            res.status(200).json({ success: true, message: 'Successfully logged out. Clear token client-side.' });
        }
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ success: false, message: 'Unexpected error occurred during logout.' });
    }
};
