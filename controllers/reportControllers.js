import firebase from '../firebase.js';
import report from '../models/reportModel.js';
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

export const createReport = async (req, res, next) => {
    try {
      const data = req.body;
      const report = {
        name:data.name,
        generation_date:data.generation_date, 
        description:data.description, 
        format:data.format,
        fk_category: doc(db, "sub-category", data.idsubCategory)
      }
      await addDoc(collection(db, 'report'), report);
      res.status(200).send('report created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
};

export const getReports = async (req, res, next) => {
    try {
      const reports = await getDocs(collection(db, 'report'));
      const reportArray = [];
  
      if (reports.empty) {
        res.status(400).send('No reports found');
      } else {
        reports.forEach((doc) => {
          const Report = new report(
            doc.id,
            doc.data().name,
            doc.data().generation_date,
            doc.data().description,
            doc.data().format,
          );
          reportArray.push(Report);
        });
  
        res.status(200).send(reportArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const getReport = async (req, res, next) => {
    try {
      const id = req.params.id;
      const report = doc(db, 'report', id);
      const data = await getDoc(report);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('report not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const updateReport = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const report = doc(db, 'report', id);
      await updateDoc(report, data);
      res.status(200).send('report updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const deleteReport = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'report', id));
      res.status(200).send('report deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  