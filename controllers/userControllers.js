import firebase from '../firebase.js';
import user from '../models/userModel.js';
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

export const createUser = async (req, res, next) => {
    try {
      const data = req.body;
      const typeUser = {
      name:data.name,
      birth_date:data.birth_date,
      registration_date:data.registration_date,
      fk_typeuser: doc(db, "sub-category", data.idsubCategory)
      }
      await addDoc(collection(db, 'user'), typeUser);
      res.status(200).send('user created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

 
  
  export const getUsers = async (req, res, next) => {
    try {
      const users = await getDocs(collection(db, 'user'));
      const userArray = [];
  
      if (users.empty) {
        res.status(400).send('No users found');
      } else {
        users.forEach((doc) => {
          const User = new user(
            doc.id,
            doc.data().name,
            doc.data().birth_date,
            doc.data().registration_date,
          );
          userArray.push(User);
        });
  
        res.status(200).send(userArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = doc(db, 'user', id);
      const data = await getDoc(user);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('user not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const updateUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const user = doc(db, 'user', id);
      await updateDoc(user, data);
      res.status(200).send('user updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const deleteUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'user', id));
      res.status(200).send('user deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };