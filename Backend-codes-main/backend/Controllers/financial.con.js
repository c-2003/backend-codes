import FinancialRecord from '../Models/Financial.mod.js';

// Get financial overview for the last 30 days
export const getFinancialOverview = async (req, res) => {
  try {
    const currentDate = new Date();
    const last30Days = new Date(currentDate.setDate(currentDate.getDate() - 30));

    // Find financial records in the last 30 days
    const financialRecords = await FinancialRecord.find({ date: { $gte: last30Days } });

    // Calculate totals
    const totalRevenue = financialRecords.reduce((acc, record) => acc + record.revenue, 0);
    const totalExpenses = financialRecords.reduce((acc, record) => acc + record.expenses, 0);
    const profitMargin = totalRevenue - totalExpenses;

    res.json({
      totalRevenue,
      totalExpenses,
      profitMargin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
