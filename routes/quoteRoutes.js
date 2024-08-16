import express from 'express';

import {
  createQuote,
  getQuote,
  getQuotes,
  updateQuote,
  deleteQuote,
} from '../controllers/quoteControllers.js';

const router = express.Router();

router.post('/quotes', getQuotes);
router.post('/new_quote/', createQuote);
router.post('/quote/:id', getQuote);
router.put('/update_quote/:id', updateQuote);
router.delete('/delete_quote/:id', deleteQuote);

export default router;