import express from 'express';
import { addService, getServices, updateService, deleteService } from '../Controllers/controller.js';

const router = express.Router();

// Add a new service
router.post('/services', addService);

// Get all services
router.get('/services', getServices);

// Update a service
router.put('/services/:id', updateService);

// Delete a service
router.delete('/services/:id', deleteService);

export default router;
