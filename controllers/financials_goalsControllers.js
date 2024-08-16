import firebase from '../firebase.js';
import financials_goals from '../models/financials_goalsModel.js';

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



export const createFinancialsGoal = async (req, res, next) => {
    try {
      const data = req.body;
      const financials = {
        description:data.description, 
        target_amount:data.target_amount,
        current_amount:data.current_amount, 
        deadline:data.deadline,
        fk_User: doc(db, "user", data.idUser)
        }
      await addDoc(collection(db, 'financial_goal'), financials);
      res.status(200).send('Financials Goal created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getFinancialsGoals = async (req, res, next) => {
    try {
      const financials = await getDocs(collection(db, 'financial_goal'));
      const financialsArray = [];
  
      if (financials.empty) {
        res.status(400).send('No personal financial_goal found');
      } else {
        financials.forEach((doc) => {
          const Financials = new financials_goals(
            doc.id,
            doc.data().description,
            doc.data().target_amount,
            doc.data().current_amount,
            doc.data().deadline,
          );
          financialsArray.push(Financials);
        });
  
        res.status(200).send(financialsArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };





  export const getFinancialsGoal = async (req, res, next) => {
    try {
      const id = req.params.id;
      const financials_goal = doc(db, 'financial_goal', id);
      const data = await getDoc(financials_goal);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Financials goal not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  export const updateFinancialsGoal = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const financials_goal = doc(db, 'financial_goal', id);
      await updateDoc(financials_goal, data);
      res.status(200).send('Financials goal updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  export const deleteFinancialsGoal = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'financial_goal', id));
      res.status(200).send('Financials goal deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  