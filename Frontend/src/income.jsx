
import React, { useState } from 'react';
import Header from './header'; // Adjust path if needed
import './income.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Income() {
  const[amount, setAmount] = useState('');
    const navigate = useNavigate();
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      'http://localhost:3000/api/incomes',
      {
        income: {
          amount: parseInt(amount),
        }
      },
      { withCredentials: true } // IMPORTANT: to send the session cookie!
    );

    console.log('Income Saved: ', res.data);
    navigate('/dashboard');
  } catch (err) {
    console.error("Income Failed to save:", err.response?.data || err);
  }
};
  return (
    <>
      <Header />
      <div className="daily-income-container">

        <div className="daily-income-label">
          <p >What is your daily income?</p>
        </div>
        <input className="daily-income-input" type="number"  placeholder="ETB 0.00"  min="0" required  value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

       

        <button className="next-button" onClick={handleSubmit}>Next</button>
      </div>
    </>
  );
}

export default Income;
