import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [children, setChildren] = useState([]);
  const [caregivers, setCaregivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [childrenRes, caregiversRes] = await Promise.all([
          axios.get('/api/children'),
          axios.get('/api/caregivers'),
        ]);
        setChildren(childrenRes.data);
        setCaregivers(caregiversRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Children</h2>
      <ul>
        {children.map((child) => (
          <li key={child._id}>
            {child.name} - {child.status}
          </li>
        ))}
      </ul>
      <h2>Caregivers</h2>
      <ul>
        {caregivers.map((caregiver) => (
          <li key={caregiver._id}>
            {caregiver.name} - {caregiver.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
