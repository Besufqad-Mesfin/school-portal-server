import Notification from '../models/notification.js';

export const createNotification = async (req, res) => {
  try {
    const { title, message, recipientId } = req.body;
    const notification = await Notification.create({ title, message, recipientId });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const notification = await Notification.findByPk(notificationid);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.status = status;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
