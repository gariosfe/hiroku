import express from 'express';

import {
  createCategory,
  getCategory,
  getCategorys,
  updateCategory,
  deleteCategory,
  createSubCategory,
} from '../controllers/categoryControllers.js';

const router = express.Router();

router.post('/categories', getCategorys);
router.post('/new_category', createCategory);
router.post('/new_sub_category', createSubCategory);
router.post('/category/:id', getCategory);
router.put('/update_category/:id', updateCategory);
router.delete('/delete_category/:id', deleteCategory);

export default router;