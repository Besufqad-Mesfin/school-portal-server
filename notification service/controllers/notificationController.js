import { Notification, UserSettings } from '../models/notificationModel.js';

// Get student grade notifications
export const getStudentGradeNotifications = async (req, res) => {
    try {
        const { studentId } = req.params;
        const notifications = await Notification.findAll({
            where: { recipients: { [Op.contains]: [studentId] }, type: 'grade' }
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get general announcements
export const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Notification.findAll({ where: { type: 'announcement' } });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get unread notifications for a student
export const getStudentUnreadNotifications = async (req, res) => {
    try {
        const { studentId } = req.params;
        const unreadNotifications = await Notification.findAll({
            where: { recipients: { [Op.contains]: [studentId] }, status: 'unread' }
        });
        res.json(unreadNotifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get teacher notifications
export const getTeacherNotifications = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const notifications = await Notification.findAll({
            where: { recipients: { [Op.contains]: [teacherId] } }
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get unread count for a teacher
export const getTeacherUnreadNotificationCount = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const count = await Notification.count({
            where: { recipients: { [Op.contains]: [teacherId] }, status: 'unread' }
        });
        res.json({ unreadCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get unread notifications for a teacher
export const getTeacherUnreadNotifications = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const unreadNotifications = await Notification.findAll({
            where: { recipients: { [Op.contains]: [teacherId] }, status: 'unread' }
        });
        res.json(unreadNotifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get unread notifications for an admin
export const getAdminUnreadNotifications = async (req, res) => {
    try {
        const { adminId } = req.params;
        const unreadNotifications = await Notification.findAll({
            where: { recipients: { [Op.contains]: [adminId] }, status: 'unread' }
        });
        res.json(unreadNotifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all admin notifications
export const getAdminNotifications = async (req, res) => {
    try {
        const { adminId } = req.params;
        const notifications = await Notification.findAll({
            where: { recipients: { [Op.contains]: [adminId] } }
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Post an admin alert notification
export const postAdminAlertNotification = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { title, message, recipients } = req.body;

        const notification = await Notification.create({
            notificationId: crypto.randomUUID(),
            title,
            message,
            recipients,
            role: 'admin',
            type: 'alert'
        });

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Post a teacher assignment notification
export const postTeacherAssignmentNotification = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { title, message, recipients, metadata } = req.body;

        const notification = await Notification.create({
            notificationId: crypto.randomUUID(),
            title,
            message,
            recipients,
            role: 'teacher',
            type: 'assignment',
            metadata
        });

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Send a notification to a user
export const sendNotification = async (req, res) => {
    try {
        const { title, message, recipients, role, type, metadata } = req.body;

        const notification = await Notification.create({
            notificationId: crypto.randomUUID(),
            title,
            message,
            recipients,
            role,
            type,
            metadata
        });

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bulk send notifications
export const bulkSendNotifications = async (req, res) => {
    try {
        const notifications = await Notification.bulkCreate(req.body);
        res.status(201).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        await Notification.update({ status: 'read' }, { where: { notificationId } });
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark a notification as unread
export const markNotificationAsUnread = async (req, res) => {
    try {
        const { notificationId } = req.params;
        await Notification.update({ status: 'unread' }, { where: { notificationId } });
        res.json({ message: 'Notification marked as unread' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bulk mark notifications as read
export const bulkMarkNotificationsAsRead = async (req, res) => {
    try {
        await Notification.update({ status: 'read' }, { where: { notificationId: req.body.notificationIds } });
        res.json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bulk mark notifications as unread
export const bulkMarkNotificationsAsUnread = async (req, res) => {
    try {
        await Notification.update({ status: 'unread' }, { where: { notificationId: req.body.notificationIds } });
        res.json({ message: 'Notifications marked as unread' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
    try {
        await Notification.destroy({ where: { notificationId: req.params.notificationId } });
        res.json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bulk delete notifications
export const bulkDeleteNotifications = async (req, res) => {
    try {
        await Notification.destroy({ where: { notificationId: req.body.notificationIds } });
        res.json({ message: 'Notifications deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update notification settings
export const updateNotificationSettings = async (req, res) => {
    try {
        await UserSettings.update(req.body, { where: { userId: req.params.userId } });
        res.json({ message: 'Notification settings updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
