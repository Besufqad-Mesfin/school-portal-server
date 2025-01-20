const Notification = require('../models/Notification');

exports.sendDueDateReminder = async (req, res) => {
    const { userId, message } = req.body;

    try {
        const notification = new Notification({
            userId,
            message,
            type: 'due_date_reminder'
        });
        await notification.save();

        // Logic to send the notification (e.g., email, SMS) would go here

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.announceNewArrivals = async (req, res) => {
    const { users, message } = req.body; // Assume users is an array of user IDs

    try {
        const notifications = [];

        for (const userId of users) {
            const notification = new Notification({
                userId,
                message,
                type: 'new_arrival'
            });
            notifications.push(notification.save());
        }

        await Promise.all(notifications);
        res.status(201).json({ message: 'Notifications sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendGeneralAlerts = async (req, res) => {
    const { userId, message } = req.body;

    try {
        const notification = new Notification({
            userId,
            message,
            type: 'general_alert'
        });
        await notification.save();

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};