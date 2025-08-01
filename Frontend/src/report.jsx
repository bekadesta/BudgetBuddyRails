import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header';
import './report.css';

function Report() {
  const [summary, setSummary] = useState({ Need: 0, Want: 0, Saving: 0 });
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/expenses',  { withCredentials: true } )
      .then(res => {
        setSummary(res.data.summary);
        setNotes(res.data.notes);
      })
      .catch(err => {
        console.error('Failed to fetch report data:', err);
      });
  }, []);

  return (
    <>
      <Header />
      <section className="report-container">
        <div>
          <h1>Monthly Spending Report</h1>

          <div className="summary-section">
            <div className="summary-box need">
              <h3>Needs</h3>
              <p>ETB {Number(summary.Need).toFixed(2)}</p>
            </div>
            <div className="summary-box want">
              <h3>Wants</h3>
              <p>ETB {Number(summary.Want).toFixed(2)}</p>
            </div>
            <div className="summary-box saving">
              <h3>Savings</h3>
              <p>ETB {Number(summary.Saving).toFixed(2)}</p>
            </div>
          </div>

          <h2 className="notes-title">Your Spending Notes This Month</h2>
          <div className="notes-section">
            {notes.length > 0 ? notes.map((note, i) => (
              <div className={`note-card ${note.category.toLowerCase()}`} key={i}>
                <h4>{note.category} - ETB {Number(note.amount).toFixed(2)}</h4>
                <p><strong>Note:</strong> {note.note}</p>
                <span className="date">{new Date(note.created_at).toLocaleDateString()}</span>
              </div>
            )) : (
              <p>No expenses recorded this month.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Report;
