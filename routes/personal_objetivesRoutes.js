import express from 'express';

import {
  createPersonalObjective,
  getPersonalObjective,
  getPersonalObjetives,
  updatePersonalObjective,
  deletePersonalObjective,
} from '../controllers/personal_objetivesControllers.js';

const router = express.Router();

router.post('/personal_objectives', getPersonalObjetives);
router.post('/new_personal_objective', createPersonalObjective);
router.post('/personal_objective/:id', getPersonalObjective);
router.put('/update_personal_objective/:id', updatePersonalObjective);
router.delete('/delete_personal_objective/:id', deletePersonalObjective);

export default router;