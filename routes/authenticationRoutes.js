import express from 'express';

import {
  createAuthentication,
  getAuthentication,
  getAuthentications,
  updateAuthentication,
  deleteAuthentication,
} from '../controllers/authenticationControllers.js';

const router = express.Router();

router.post('/authentications', getAuthentications);
router.post('/new_authentication/', createAuthentication);
router.post('/authentication/:id', getAuthentication);
router.put('/update_authentication/:id', updateAuthentication);
router.delete('/delete_authentication/:id', deleteAuthentication);

export default router;