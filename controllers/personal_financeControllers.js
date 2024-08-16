import firebase from '../firebase.js';
import personal_finance from '../models/personal_financeModel.js';
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

export const createPersonal_finance = async (req, res, next) => {
    try {
      const data = req.body;
      const finance = {
        amount:data.amount, 
        description:data.description, 
        transacion_date:data.transacion_date,
        fk_Category: doc(db, "sub-category", data.idsubCategory),
        fk_User: doc(db, "users", data.idUser)
        }
      await addDoc(collection(db, 'personal_finance'), finance);
      res.status(200).send('Personal Finance created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getPersonal_Finances = async (req, res, next) => {
    try {
      const personal_finances = await getDocs(collection(db, 'personal_finance'));
      const personal_financeArray = [];
  
      if (personal_finances.empty) {
        res.status(400).send('No personal finances found');
      } else {
        personal_finances.forEach((doc) => {
          const Personal_Finance = new personal_finance(
            doc.id,
            doc.data().amount,
            doc.data().description,
            doc.data().transaction_date,
          );
          personal_financeArray.push(Personal_Finance);
        });
  
        res.status(200).send(personal_financeArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getPersonalFinance = async (req, res, next) => {
    try {
      const id = req.params.id;
      const personal_finance = doc(db, 'personal_finance', id);
      const data = await getDoc(personal_finance);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('personal finance not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const updatePersonalFinance = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const personal_finance = doc(db, 'personal_finance', id);
      await updateDoc(personal_finance, data);
      res.status(200).send('personal finance updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const deletePersonalFinance = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'personal_finance', id));
      res.status(200).send('personal finance deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };