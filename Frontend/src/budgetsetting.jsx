import React, { useState } from 'react';
import Header from './header'; // Adjust path if needed
import './budgetSetting.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function BudgetSettings() {
  const [needs, setNeeds] = useState('');
  const [wants, setWants] = useState('');
  const [savings, setSavings] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const total = Number(needs) + Number(wants) + Number(savings);
  if (total !== 100) {
    alert('The total allocation must equal 100%.');
    return;
  }

  try {
    const res =await axios.post(
  'http://localhost:3000/api/budgets',
  {
    budget: {
      needs_percent: parseInt(needs),
      wants_percent: parseInt(wants),
      savings_percent: parseInt(savings)
    }
  },
  {
    withCredentials: true // this must be in the 3rd argument
  }
);
    navigate('/dashboard');
    console.log('Saved:', res.data);
  } catch (err) {
    console.error("Failed to save budget settings:", err.response?.data || err);
    alert('Failed to save settings: ' + (err.response?.data?.errors?.join(', ') || 'Unknown error'));
  }
};

  return (
    <>
      <Header />
      <section className="containerforsettings">
        <div>
          <h2>Budget Settings</h2>

          <h3>Budgeting Rule</h3>

          <div className="rule-box">
            <p>
              <strong>The 50/30/20 Rule</strong>
              <br />
              Needs: 50%, Wants: 30%, Savings: 20%
            </p>
          </div>

          <h2>Default Budget Allocation</h2>
          <ul>
            <li>Needs (50%): ETB 0.00</li>
            <li>Wants (30%): ETB 0.00</li>
            <li>Savings (20%): ETB 0.00</li>
          </ul>

          <div className="custom-box">
            <p>
              <strong>Custom Budgeting</strong>
              <br />
              <span>Customize your budget allocation percentages</span>
            </p>
          </div>

          <h3>Your Custom Budget Allocation</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group2">
              <label htmlFor="needs"><h4>Needs (%)</h4></label>
              <input type="number" id="needs" min="0" value={needs} onChange={(e) => setNeeds(e.target.value)}
              />
            </div>

            <div className="input-group2">
              <label htmlFor="wants"><h4>Wants (%)</h4></label>
              <input type="number" id="wants" min="0" value={wants} onChange={(e) => setWants(e.target.value)}
              />
            </div>

            <div className="input-group2">
              <label htmlFor="savings"><h4>Savings (%)</h4></label>
              <input type="number" id="savings" min="0" value={savings} onChange={(e) => setSavings(e.target.value)}
              />
            </div>

            <div className="styled-button2">
              <button type="submit">Save Change</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default BudgetSettings;
