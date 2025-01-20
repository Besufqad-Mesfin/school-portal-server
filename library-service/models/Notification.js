const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    dateSent: { type: Date, default: Date.now },
    type: { type: String, enum: ['due_date_reminder', 'new_arrival', 'general_alert'], required: true }
});

module.exports = mongoose.model('Notification', notificationSchema);