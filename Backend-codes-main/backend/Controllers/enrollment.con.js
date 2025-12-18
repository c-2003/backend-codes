import Enrollment from '../Models/enrollment.mod.js';

// Get new enrollments for each month
export const getEnrollmentsByMonth = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    // Aggregate enrollments by month
    const enrollmentsByMonth = await Enrollment.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$date' },
          newEnrollments: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // Sort by month
    ]);

    res.json(enrollmentsByMonth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
