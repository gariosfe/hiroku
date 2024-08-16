import firebase from '../firebase.js';
import task from '../models/tasksModel.js';
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

export const createTask = async (req, res, next) => {
    try {
      const data = req.body;
      const task = {
        title:data.title, 
        description:data.description, 
        expiration_date:data.expiration_date,
        state:data.state,
        fk_user: doc(db, "user", data.idUser),
        fk_category: doc(db, "sub-category", data.idsubCategory),
        fk_reports: doc(db, "report", data.idReport)
      }
      await addDoc(collection(db, 'task'), task);
      res.status(200).send('task created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  export const getTasks = async (req, res, next) => {
    try {
        const tasks= await getDocs(collection(db, 'task'));
        const taskArray = [];
    
        if (tasks.empty) {
          res.status(400).send('No tasks found');
        } else {
          tasks.forEach((doc) => {
            const tasks = new task(
              doc.id,
              doc.data().title,
              doc.data().description,
              doc.data().expiration_date,
              doc.data().expiration_date,
            );
            taskArray.push(tasks);
          });
    
          res.status(200).send(taskArray);
        }
      } catch (error) {
        res.status(400).send(error.message);
      }
    };
  
  
  export const getTask = async (req, res, next) => {
    try {
      const id = req.params.id;
      const task = doc(db, 'task', id);
      const data = await getDoc(task);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('task not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  export const updateTask = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const task = doc(db, 'task', id);
      await updateDoc(task, data);
      res.status(200).send('task updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  export const deleteTask = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'task', id));
      res.status(200).send('task deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };