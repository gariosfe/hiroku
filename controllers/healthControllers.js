import firebase from '../firebase.js';
import health from '../models/healthModel.js';
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

export const createHealth = async (req, res, next) => {
    try {
      const data = req.body;
      const relactionHealt = {
        registration_date:data.registration_date,
        weight:data.weight, 
        heart_rate:data.heart_rate, 
        allergy:data.allergy,
        fk_user:doc(db, "user", data.idUser),
        fk_report: doc(db, "report", data.idReport),
        }
      await addDoc(collection(db, 'health'),relactionHealt);
      res.status(200).send('Health created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getHealths = async (req, res, next) => {
    try {
      const healths = await getDocs(collection(db, 'health'));
      const healthArray = [];
  
      if (healths.empty) {
        res.status(400).send('No healths found');
      } else {
        healths.forEach((doc) => {
          const Health = new health(
            doc.id,
            doc.data().registration_date,
            doc.data().weight,
            doc.data().heart_rate,
            doc.data().allergy,
          );
          healthArray.push(Health);
        });
  
        res.status(200).send(healthArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getHealth = async (req, res, next) => {
    try {
      const id = req.params.id;
      const health = doc(db, 'health', id);
      const data = await getDoc(health);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('health not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const updateHealth = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const health = doc(db, 'health', id);
      await updateDoc(health, data);
      res.status(200).send('Health updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const deleteHealth = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'health', id));
      res.status(200).send('Health deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  