import firebase from '../firebase.js';
import personal_objetive from '../models/personal_objetivesModel.js';
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

export const createPersonalObjective = async (req, res, next) => {
    try {
      const data = req.body;
      const personal = {
      description:data.description, 
      end_date:data.end_date, 
      progress:data.progress, 
      start_date:data.start_date,
      fk_reports: doc(db, "report", data.idReport)
      }
      await addDoc(collection(db, 'personal_objetives'), personal);
      res.status(200).send('Personal Objective created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };



  export const getPersonalObjetives = async (req, res, next) => {
    try {
      const personal_objetives = await getDocs(collection(db, 'personal_objetives'));
      const personal_objetiveArray = [];
  
      if (personal_objetives.empty) {
        res.status(400).send('No personal objetives found');
      } else {
        personal_objetives.forEach((doc) => {
          const Personal_Objetive = new personal_objetive(
            doc.id,
            doc.data().description,
            doc.data().end_date,
            doc.data().progress,
            doc.data().start_date,
          );
          personal_objetiveArray.push(Personal_Objetive);
        });
  
        res.status(200).send(personal_objetiveArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };



  export const getPersonalObjective = async (req, res, next) => {
    try {
      const id = req.params.id;
      const personal_objective = doc(db, 'personal_objetives', id);
      const data = await getDoc(personal_objective);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Personal objective not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  export const updatePersonalObjective = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const personal_objective = doc(db, 'personal_objetives', id);
      await updateDoc(personal_objective, data);
      res.status(200).send('Personal objective updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  export const deletePersonalObjective = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'personal_objetives', id));
      res.status(200).send('Personal objective deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };