import express from 'express';
import { getFinancialOverview } from '../Controllers/financial.con.js';

const router = express.Router();

// GET financial overview for the last 30 days
router.get('/overview', getFinancialOverview);

export default router;
