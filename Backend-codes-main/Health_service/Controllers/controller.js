import Service from '../Models/Service.models.js';

// Add new service
export const addService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const service = new Service({ name, description, price });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedService) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
