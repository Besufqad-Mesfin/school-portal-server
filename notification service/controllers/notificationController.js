import Notification from '../models/notificationModel.js';

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

export default { getStudentGradeNotifications, getAnnouncements, getTeacherAssignmentNotifications, getAdminAlertNotifications };
