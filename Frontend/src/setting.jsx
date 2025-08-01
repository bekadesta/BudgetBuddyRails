import React, { useState } from 'react';
import Header from './header'; // Adjust the path as needed
import './setting.css'; // Optional CSS

function SettingsAlerts() {
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const [budgetNearingLimit, setBudgetNearingLimit] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(false);
  const [dailySummary, setDailySummary] = useState(false);

  return (
    <>
      <Header />

      <div className="content-area">
        <div className="settings-card">
          <h2>Settings</h2>

          <div className="section">
            <h3>Budget alerts</h3>

            <div className="setting-item">
              <div className="setting-text">
                <h4>Budget exceeded</h4>
                <p>Get notified when you're close to exceeding your budget.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={budgetExceeded}
                  onChange={() => setBudgetExceeded(!budgetExceeded)}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-text">
                <h4>Budget nearing limit</h4>
                <p>Receive alerts when you're nearing your budget limit.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={budgetNearingLimit}
                  onChange={() => setBudgetNearingLimit(!budgetNearingLimit)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="section">
            <h3>Daily spending reminders</h3>

            <div className="setting-item">
              <div className="setting-text">
                <h4>Daily spending reminder</h4>
                <p>Get a daily reminder to track your expenses.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={dailyReminder}
                  onChange={() => setDailyReminder(!dailyReminder)}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-text">
                <h4>Daily spending summary</h4>
                <p>Receive a summary of your daily spending.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={dailySummary}
                  onChange={() => setDailySummary(!dailySummary)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsAlerts;
