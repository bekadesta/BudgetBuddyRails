import React, {useState, useEffect} from 'react';
import './dashboard.css';
import Header from './header'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from './context/AuthContext'

const Dashboard = () => {
  const [budget, setBudget] = useState({
    needs_percent: 0,
    wants_percent: 0,
    savings_percent: 0
  });
  const {currentUser, setCurrentUser} = useAuth();
  console.log("Dashboard is rendering")
  console.log("Fetched Budget:", budget);
  const [income, setIncome] = useState(0);
  const [spending, setSpending] = useState(0);
  const[remaining, setRemaining] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
  setRemaining(income - spending);
}, [income, spending]);


    useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/incomes', {
          withCredentials: true
        });
        const total = res.data.total_income || 0;
        setIncome(total);
      } catch (err) {
        console.error('Error Fetching Income', err);
        setIncome(0);
      }
    };
    if (currentUser) fetchIncome();
  }, [spending, currentUser]);

  useEffect(() => {
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/me', { withCredentials: true });
      setCurrentUser(res.data);
    } catch (err) {
      setCurrentUser(null);
    }
  };
  fetchCurrentUser();
}, []);


useEffect(() => {
  const fetchBudget = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/budgets', {
        withCredentials: true
      });
      const data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        setBudget(data[data.length - 1]); // Latest budget
      } else if (data && data.needs_percent !== undefined) {
        setBudget(data);
      } else {
        // empty array or no valid budget - reset to zeros
        setBudget({ needs_percent: 0, wants_percent: 0, savings_percent: 0 });
      }
    } catch (err) {
      console.error('Error Fetching Budget', err);
      setBudget({ needs_percent: 0, wants_percent: 0, savings_percent: 0 }); // fallback on error
    }
  };
  if (currentUser) fetchBudget();
}, [currentUser]);

  useEffect(() => {
    const fetchSpending = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/expenses', {
          withCredentials: true
        });
        setSpending(res.data.total_spending || 0);
      } catch (err) {
        console.error('Error Fetching Spending', err);
        setSpending(0);
      }
    };
    if (currentUser) fetchSpending();
  }, [currentUser]);



  return (
    <>
    <Header />
    <div className="greeting">
    <h2>Hi, {currentUser?.username || 'Guest'} 👋</h2>
     </div>
        <div className="dashboard-container">
      <div className="summary-cards">
        <div className="card income">
          <h4>Total Income</h4>
          <h3>ETB {income.toFixed(2)}</h3>
        </div>
        <div className="card spending">
          <h4>Total Spending</h4>
          <h3>ETB {spending.toFixed(2)}</h3>
        </div>
        <div className="card budget">
          <h4>Remaining Budget</h4>
          <h3>ETB {remaining.toFixed(2)}</h3>
        </div>
      </div>

      <h2 className="dashboard-title">Dashboard</h2>

      <div className="spending-breakdown">
        <h3>Spending Breakdown</h3>
        <div className="category-summary">
          <div>
            <h4>Spending by Category</h4>
            <h3>ETB {spending.toFixed(2)}</h3>
          </div>

          <div>
            <h4>This Month</h4>
            <div className="bars">
              <div className="bar" style={{ height: `${budget.needs_percent}%`, backgroundColor: '#f77f00' , border: '1px solid black'}}></div>
              <div className="bar" style={{ height: `${budget.wants_percent}%`, backgroundColor: '#219ebc', border: '1px solid black' }}></div>
              <div className="bar" style={{ height: `${budget.savings_percent}%`, backgroundColor: '#52b788', border: '1px solid black' }}></div>
            </div>
            <div className="bar-labels">
              <span>Needs ({budget.needs_percent}%)</span>
              <span>Wants ({budget.wants_percent}%) </span>
              <span>Savings ({budget.savings_percent}%)</span>
            </div>
          </div>
        </div>

         <button className="input-btn" onClick={() => navigate('/income')}>
      INPUT INCOMEE
    </button>
      </div>
    </div>
    </>

  );
};

export default Dashboard;
