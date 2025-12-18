import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import childrenRoutes from './Routes/children.routes.js';
import caregiversRoutes from './Routes/children.routes.js';
import attendanceRoutes from './Routes/Attendance.routes.js';
import financesRoutes from './Routes/financial.routes.js';
import enrollmentsRoutes from './Routes/enrollment.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/children', childrenRoutes);
app.use('/api/caregivers', caregiversRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/finances', financesRoutes);
app.use('/api/enrollments', enrollmentsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
