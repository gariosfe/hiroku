import express from 'express';

import {
  createPersonal_finance,
  getPersonalFinance,
  getPersonal_Finances,
  updatePersonalFinance,
  deletePersonalFinance,
} from '../controllers/personal_financeControllers.js';

const router = express.Router();

router.post('/personal_finances', getPersonal_Finances);
router.post('/new_personal_finance/', createPersonal_finance);
router.post('/personal_finance/:id', getPersonalFinance);
router.put('/update_personal_finance/:id', updatePersonalFinance);
router.delete('/delete_personal_finance/:id', deletePersonalFinance);

export default router;