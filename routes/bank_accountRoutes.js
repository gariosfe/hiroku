import express from 'express';

import {
  createBank_account,
  getBank_account,
  getBank_accounts,
  updateBank_account,
  deleteBank_account,
} from '../controllers/bank_accountControllers.js';

const router = express.Router();

router.post('/bank_accounts', getBank_accounts);
router.post('/new_bank_account/', createBank_account);
router.post('/bank_account/:id', getBank_account);
router.put('/update_bank_account/:id', updateBank_account);
router.delete('/delete_bank_account/:id', deleteBank_account);

export default router;