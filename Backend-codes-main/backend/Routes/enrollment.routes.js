import express from 'express';
import { getEnrollmentsByMonth } from '../Controllers/enrollment.con.js';

const router = express.Router();

// GET enrollments by month
router.get('/monthly', getEnrollmentsByMonth);

export default router;
