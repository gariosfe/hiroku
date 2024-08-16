import express from 'express';

import {
  createAuthentication_method,
  getAuthentication_method,
  getAuthentication_methods,
  updateAuthentication_method,
  deleteAuthentication_method,
} from '../controllers/authentication_methodControllers.js';

const router = express.Router();

router.post('/authentication_methods', getAuthentication_methods);
router.post('/new_authentication_method/', createAuthentication_method);
router.post('/authentication_method/:id', getAuthentication_method);
router.put('/update_authentication_method/:id', updateAuthentication_method);
router.delete('/delete_authentication_method/:id', deleteAuthentication_method);

export default router;