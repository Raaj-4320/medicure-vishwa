import express from 'express';
import { getMedicines, updateMedicine, deleteMedicine } from '../controllers/pharmacy.controller.js';

const router = express.Router();

router.get('/', getMedicines);
router.patch('/:id', updateMedicine);
router.put('/:id', updateMedicine);
router.delete('/:id', deleteMedicine);

export default router;
