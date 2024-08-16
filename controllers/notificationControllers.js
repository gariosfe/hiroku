import firebase from '../firebase.js';
import notification from '../models/notificationModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
const db = getFirestore(firebase);

export const createNotification = async (req, res, next) => {
    try {
      const data = req.body;
      const notification = {
        message:data.message,
        shipping_date:data.shipping_date, 
        state:data.state,
        fk_category: doc(db, "sub-category", data.idsubCategory),
        fk_user: doc(db, "user", data.idUser),
        }
      await addDoc(collection(db, 'notification'), notification);
      res.status(200).send('Notification created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getNotifications = async (req, res, next) => {
    try {
      const notifications = await getDocs(collection(db, 'notification'));
      const notificationArray = [];
  
      if (notifications.empty) {
        res.status(400).send('No notifications found');
      } else {
        notifications.forEach((doc) => {
          const Notification = new notification(
            doc.id,
            doc.data().message,
            doc.data().shipping_date,
            doc.data().state,
          );
          notificationArray.push(Notification);
        });
  
        res.status(200).send(notificationArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getNotification = async (req, res, next) => {
    try {
      const id = req.params.id;
      const notification = doc(db, 'notification', id);
      const data = await getDoc(notification);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('notification not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const updateNotification = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const notification = doc(db, 'notification', id);
      await updateDoc(notification, data);
      res.status(200).send('notification updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const deleteNotification = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'notification', id));
      res.status(200).send('notification deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };