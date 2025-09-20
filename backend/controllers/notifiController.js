import Notification from "../models/Notification.js";

// Add notification

export const addNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    const notification = await Notification.create({
      user: userId,
      type,
      message,
    });
    res.status(201).json({message: "Notification created successfully",notification,});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get notification for a user

export const getUserNotificationsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const notifications = await Notification.find({ user:userId });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
