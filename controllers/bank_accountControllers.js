import firebase from '../firebase.js';
import bank_account from '../models/bank_accountModel.js';
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

export const createBank_account = async (req, res, next) => {
    try {
      const data = req.body;
      const bank_account = {
        bank:data.bank,
        balance:data.bank,
        fk_user: doc(db, "user", data.idUser),
        fk_category: doc(db, "sub-category", data.idsubCategory),
        }
      await addDoc(collection(db, 'bank_account'), bank_account);
      res.status(200).send('Bank account created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getBank_accounts = async (req, res, next) => {
    try {
      const bank_accounts = await getDocs(collection(db, 'bank_account'));
      const bank_accountArray = [];
  
      if (bank_accounts.empty) {
        res.status(400).send('No bank accounts found');
      } else {
        bank_accounts.forEach((doc) => {
          const Bank_account = new bank_account(
            doc.id,
            doc.data().bank,
            doc.data().balance,
          );
          bank_accountArray.push(Bank_account);
        });
  
        res.status(200).send(bank_accountArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getBank_account = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bank_account = doc(db, 'bank_account', id);
      const data = await getDoc(bank_account);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Bank account not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const updateBank_account = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const bank_account = doc(db, 'bank_account', id);
      await updateDoc(bank_account, data);
      res.status(200).send('Bank account updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const deleteBank_account = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'bank_account', id));
      res.status(200).send('Bank account deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };