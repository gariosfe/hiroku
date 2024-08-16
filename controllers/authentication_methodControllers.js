import firebase from '../firebase.js';
import authentication_method from '../models/authentication_methodModel.js';
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

export const createAuthentication_method = async (req, res, next) => {
  try {
    const data = req.body;
    const type_aute = {
      name:data.name,
      description:data.description,
      fk_auten: doc(db, "authentication", data.idsubCategory)
      }
    await addDoc(collection(db, 'authentication_method'),type_aute);
    res.status(200).send('Authentication method created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAuthentication_methods = async (req, res, next) => {
  try {
    const authentication_methodsSnapshot = await getDocs(collection(db, 'authentication_method'));
    const authentication_methodArray = [];
  
    if (authentication_methodsSnapshot.empty) {
      res.status(400).send('No authentication methods found');
    } else {
      authentication_methodsSnapshot.forEach((doc) => {
        const Authentication_method = new authentication_method(
          doc.id,
          doc.data().name,
          doc.data().description,
        );
        authentication_methodArray.push(Authentication_method);
      });
  
      res.status(200).send(authentication_methodArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAuthentication_method = async (req, res, next) => {
  try {
    const id = req.params.id;
    const authentication_methodRef = doc(db, 'authentication_method', id);
    const data = await getDoc(authentication_methodRef);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Authentication method not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateAuthentication_method = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const authentication_methodRef = doc(db, 'authentication_method', id);
    await updateDoc(authentication_methodRef, data);
    res.status(200).send('Authentication method updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteAuthentication_method = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'authentication_method', id));
    res.status(200).send('Authentication method deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};