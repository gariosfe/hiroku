import firebase from '../firebase.js';
import authentication from '../models/authenticationModel.js';
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

export const createAuthentication = async (req, res, next) => {
    try {
      const data = req.body;
      const typeUser = {
        password:data.password, 
        email:data.email,
        fk_user: doc(db, "user", data.idsubCategory)
        }
      await addDoc(collection(db, 'authentication'), typeUser);
      res.status(200).send('Authentication created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};

export const getAuthentications = async (req, res, next) => {
    try {
      const authentications = await getDocs(collection(db, 'authentication'));
      const authenticationArray = [];
  
      if (authentications.empty) {
        res.status(400).send('No authentications found');
      } else {
        authentications.forEach((doc) => {
          const Authentication = new authentication(
            doc.id,
            doc.data().password,
            doc.data().email,
          );
          authenticationArray.push(Authentication);
        });
  
        res.status(200).send(authenticationArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getAuthentication = async (req, res, next) => {
    try {
      const id = req.params.id;
      const authentication = doc(db, 'authentication', id);
      const data = await getDoc(authentication);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Authentication not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const updateAuthentication = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const authentication = doc(db, 'authentication', id);
      await updateDoc(authentication, data);
      res.status(200).send('Authentication updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const deleteAuthentication = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'authentication', id));
      res.status(200).send('Authentication deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };