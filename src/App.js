import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBill,
  editBill,
  removeBill,
  filterByCategory,
  calculateMinimumBills,
} from './features/billsSlice';
import TimeSeriesChart from './components/TimeSeriesChart';

const App = () => {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bills.filteredBills);
  const highlightedBills = useSelector((state) => state.bills.highlightedBills);
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: '',
    date: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [budget, setBudget] = useState(50000);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBill = () => {
    if (editingId === null) {
      dispatch(addBill({ ...formData, id: Date.now() }));
    } else {
      dispatch(editBill({ ...formData, id: editingId }));
      setEditingId(null);
    }
    setFormData({ description: '', category: '', amount: '', date: '' });
  };

  const handleEditBill = (id) => {
    const billToEdit = bills.find((bill) => bill.id === id);
    if (billToEdit) {
      setFormData({
        description: billToEdit.description,
        category: billToEdit.category,
        amount: billToEdit.amount,
        date: billToEdit.date,
      });
      setEditingId(id);
    }
  };

  const handleRemoveBill = (id) => {
    dispatch(removeBill(id));
  };

  const handleFilterChange = (e) => {
    dispatch(filterByCategory(e.target.value));
  };

  const handleMinimumBills = () => {
    dispatch(calculateMinimumBills(budget));
  };

  const generateChartData = () => {
    const chartLabels = [];
    const chartData = [];

    bills.forEach((bill) => {
      const billMonth = new Date(bill.date).toLocaleString('default', { month: 'short' });
      const existingIndex = chartLabels.indexOf(billMonth);

      if (existingIndex >= 0) {
        chartData[existingIndex] += parseFloat(bill.amount);
      } else {
        chartLabels.push(billMonth);
        chartData.push(parseFloat(bill.amount));
      }
    });

    return {
      labels: chartLabels,
      datasets: [
        {
          label: 'Total Bills Per Month',
          data: chartData,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div>
      <h1>Bill Manager</h1>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
      />
      <button onClick={handleAddBill}>
        {editingId === null ? 'Add Bill' : 'Save Changes'}
      </button>

      <h2>Filter by Category</h2>
      <select onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="Food & Dining">Food & Dining</option>
        <option value="Utility">Utility</option>
        <option value="Shopping">Shopping</option>
        <option value="Education">Education</option>
        <option value="Personal Care">Personal Care</option>
        <option value="Travel">Travel</option>
      </select>

      <h2>Bills</h2>
      <ul>
        {bills.map((bill) => (
          <li
            key={bill.id}
            style={{
              backgroundColor: highlightedBills.some((highlighted) => highlighted.id === bill.id)
                ? 'yellow'
                : 'transparent',
            }}
          >
            {bill.description} - {bill.category} - {bill.amount} - {bill.date}
            <button onClick={() => handleEditBill(bill.id)}>Edit</button>
            <button onClick={() => handleRemoveBill(bill.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h2>Monthly Budget</h2>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        placeholder="Set Budget"
      />
      <button onClick={handleMinimumBills}>Calculate Minimum Bills</button>

      <TimeSeriesChart data={generateChartData()} />
    </div>
  );
};

export default App;











