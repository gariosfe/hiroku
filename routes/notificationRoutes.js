import express from 'express';

import {
  createNotification,
  getNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
} from '../controllers/notificationControllers.js';

const router = express.Router();

router.post('/notifications', getNotifications);
router.post('/new_notification/', createNotification);
router.post('/notification/:id', getNotification);
router.put('/update_notification/:id', updateNotification);
router.delete('/delete_notification/:id', deleteNotification);

export default router;