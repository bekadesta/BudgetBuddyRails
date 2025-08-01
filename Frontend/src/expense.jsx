import React, { useState } from 'react';
import Header from './header';
import './expense.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Expense() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
      const navigate = useNavigate();
  


const handleSave = async () => {
  if (!amount || parseFloat(amount) <= 0) {
    setError('Please enter a valid amount.');
    return;
  }
  if (!category.trim()) {
    setError('Please enter a category.');
    return;
  }

  setError('');

  try {
    const res = await axios.post('http://localhost:3000/api/expenses', {
      expense: {
        amount: parseInt(amount),
        category,
        note,
      }
    }, { withCredentials: true });

    console.log('Saved Expense:', res.data);
    navigate('/dashboard')

    // Reset fields
    setAmount('');
    setCategory('');
    setNote('');
  } catch (err) {
    console.error("Error saving expense:", err);
    if (err.response) {
      console.error("Backend response:", err.response.data);
      alert(`Server Error: ${err.response.data.errors?.join(', ')}`);
    } else {
      alert("Network or unknown error occurred.");
    }
  }
};

  return (
    <>
      <Header />
      <div className="expense-form-container">
        <h2 className="expense-title">Add your daily expense here</h2>

        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input id="amount" type="number" min="0" placeholder='ETB 0.00' value={amount} onChange={(e) => setAmount(e.target.value)}
          />
        </div>

<div className="input-group">
  <label htmlFor="category">Category</label>
  <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
    <option value="">-- Select Category --</option>
    <option value="Need">Needs</option>
    <option value="Want">Wants</option>
    <option value="Saving">Savings</option>
  </select>
</div>
        <div className="input-group">
          <label htmlFor="note">Note</label>
          <input id="note" type="text" placeholder='note(not mandatory)' value={note} onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button className="save-button" onClick={handleSave}>Save</button>

        {error && <p className="error-message">{error}</p>}
      </div>
    </>
  );
}

export default Expense;
