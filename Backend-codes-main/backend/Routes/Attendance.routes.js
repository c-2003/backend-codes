import express from 'express';
import { getAttendanceMetrics } from '../Controllers/attendence.con.js';

const router = express.Router();

// GET attendance metrics
router.get('/metrics', getAttendanceMetrics);

export default router;
