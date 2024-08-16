import express from 'express';

import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,

} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/', getUsers);
router.post('/new', createUser);
router.get('/product/:id', getUser);
router.post('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;