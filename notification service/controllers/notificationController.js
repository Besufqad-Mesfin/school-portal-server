import { Notification, UserSettings } from '../models/notificationModel.js';

const getStudentGradeNotifications = async (req, res) => {
    try {
        const { studentId } = req.params;
        const notifications = await Notification.findAll({ where: { studentId } });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
};

const getAnnouncements = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: { type: 'announcement' } });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching announcements', error: error.message });
    }
};

const getTeacherAssignmentNotifications = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const notifications = await Notification.findAll({ where: { teacherId } });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assignments', error: error.message });
    }
};

const getAdminAlertNotifications = async (req, res) => {
    try {
        const { adminId } = req.params;
        const notifications = await Notification.findAll({ where: { adminId } });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching alerts', error: error.message });
    }
};

const sendNotification = async (req, res) => {
    try {
        const { title, message, recipients, role, type, metadata } = req.body;
        const notification = await Notification.create({ title, message, recipients, role, type, metadata });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error sending notification', error: error.message });
    }
};

const bulkSendNotifications = async (req, res) => {
    try {
        const notifications = await Notification.bulkCreate(req.body.notifications);
        res.status(201).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error sending notifications', error: error.message });
    }
};

const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        await Notification.update({ status: 'read' }, { where: { notificationId } });
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as read', error: error.message });
    }
};

const markNotificationAsUnread = async (req, res) => {
    try {
        const { notificationId } = req.params;
        await Notification.update({ status: 'unread' }, { where: { notificationId } });
        res.status(200).json({ message: 'Notification marked as unread' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as unread', error: error.message });
    }
};

const bulkMarkNotificationsAsRead = async (req, res) => {
    try {
        const { notificationIds } = req.body;
        await Notification.update({ status: 'read' }, { where: { notificationId: notificationIds } });
        res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notifications as read', error: error.message });
    }
};

const bulkMarkNotificationsAsUnread = async (req, res) => {
    try {
        const { notificationIds } = req.body;
        await Notification.update({ status: 'unread' }, { where: { notificationId: notificationIds } });
        res.status(200).json({ message: 'Notifications marked as unread' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notifications as unread', error: error.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        await Notification.destroy({ where: { notificationId } });
        res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error: error.message });
    }
};

const bulkDeleteNotifications = async (req, res) => {
    try {
        const { notificationIds } = req.body;
        await Notification.destroy({ where: { notificationId: notificationIds } });
        res.status(200).json({ message: 'Notifications deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notifications', error: error.message });
    }
};

const updateNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const updatedNotification = await Notification.update(req.body, { where: { notificationId }, returning: true });
        res.status(200).json(updatedNotification[1][0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error: error.message });
    }
};

const updateNotificationSettings = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedSettings = await UserSettings.update(req.body, { where: { userId }, returning: true });
        res.status(200).json(updatedSettings[1][0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification settings', error: error.message });
    }
};

export default { 
    getStudentGradeNotifications, 
    getAnnouncements, 
    getTeacherAssignmentNotifications, 
    getAdminAlertNotifications, 
    sendNotification, 
    bulkSendNotifications, 
    markNotificationAsRead, 
    markNotificationAsUnread, 
    bulkMarkNotificationsAsRead, 
    bulkMarkNotificationsAsUnread, 
    deleteNotification, 
    bulkDeleteNotifications, 
    updateNotification, 
    updateNotificationSettings 
};
