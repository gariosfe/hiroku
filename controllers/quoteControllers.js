import firebase from '../firebase.js';
import quote from '../models/quoteModel.js';
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

export const createQuote = async (req, res, next) => {
    try {
      const data = req.body;
      const typeUser = {
        dating_date:data.dating_date, 
        location:data.location, 
        state:data.state,
        fk_user: doc(db, "user", data.idUser),
        fk_category: doc(db, "sub-category", data.idsubCategory),
        fk_reports: doc(db, "report", data.idReport)
      }
      await addDoc(collection(db, 'quote'), typeUser);
      res.status(200).send('Quote created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getQuotes = async (req, res, next) => {
    try {
      const quotes = await getDocs(collection(db, 'quote'));
      const quoteArray = [];
  
      if (quotes.empty) {
        res.status(400).send('No Quotes found');
      } else {
        quotes.forEach((doc) => {
          const Quote = new quote(
            doc.id,
            doc.data().dating_date,
            doc.data().location,
            doc.data().state,
          );
          quoteArray.push(Quote);
        });
  
        res.status(200).send(quoteArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
};

export const getQuote = async (req, res, next) => {
    try {
      const id = req.params.id;
      const quote = doc(db, 'quote', id);
      const data = await getDoc(quote);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Quote not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
};

export const updateQuote = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const quote = doc(db, 'quote', id);
      await updateDoc(quote, data);
      res.status(200).send('Quote updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};

export const deleteQuote = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'quote', id));
      res.status(200).send('Quote deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};