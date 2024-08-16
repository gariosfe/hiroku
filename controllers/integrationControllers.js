import firebase from '../firebase.js';
import integration from '../models/integrationModel.js';

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

export const createIntegration = async (req, res, next) => {
    try {
      const data = req.body;
      const integration = {
        token:data.token, 
        date_expire:data.date_expire,
        fk_category: doc(db, "sub-category", data.idsubCategory),
        fk_report: doc(db, "report", data.idReport)
      }
      await addDoc(collection(db, 'integration'), integration);
      res.status(200).send('Integration created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getIntegrationes = async (req, res, next) => {
    try {
      const integrationes = await getDocs(collection(db, 'integration'));
      const integrationArray = [];
  
      if (integrationes.empty) {
        res.status(400).send('No integration finances found');
      } else {
        integrationes.forEach((doc) => {
          const Integration = new integration (
            doc.id,
            doc.data().token,
            doc.data().date_expire,
          );
          integrationArray.push(Integration);
        });
  
        res.status(200).send(integrationArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };


  export const getIntegration = async (req, res, next) => {
    try {
      const id = req.params.id;
      const integration = doc(db, 'integration', id);
      const data = await getDoc(integration);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Integration not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  export const updateIntegration = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const integration = doc(db, 'integration', id);
      await updateDoc(integration, data);
      res.status(200).send('Integration updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  export const deleteIntegration = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'integration', id));
      res.status(200).send('Integration deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  