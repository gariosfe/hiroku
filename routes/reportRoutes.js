import express from 'express';

import {
    createReport,
    getReport,
    getReports,
    updateReport,
    deleteReport,
}   from '../controllers/reportControllers.js';

const router = express.Router();

router.post('/reports', getReports);
router.post('/new_report/', createReport);
router.get('/report/:id', getReport);
router.post('/update_report/:id', updateReport);
router.delete('/delete_report/:id', deleteReport);

export default router;