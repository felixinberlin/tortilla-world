/**
 * FILE: DevPanel.tsx
 *
 * PURPOSE:
 * Developer & Debugging panel displaying live Action Log history and replay tools.
 *
 * RESPONSIBILITY:
 * - Reads action history from getActionLog().
 * - Displays chronological action log.
 * - Allows running automated AI action plans (TW-08).
 */

import React, { useState } from 'react';
import { getActionLog, clearActionLog } from '../../store/middleware/actionLog';
import { executeAIPlan, createTortillaAIPlan } from '../../systems/aiDispatcher';

export const DevPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setRefreshCount] = useState(0);

  const logEntries = getActionLog();

  const handleClear = () => {
    clearActionLog();
    setRefreshCount((c) => c + 1);
  };

  const handleRunAI = () => {
    const plan = createTortillaAIPlan();
    executeAIPlan(plan);
    setRefreshCount((c) => c + 1);
  };

  return (
    <div className={`dev-panel ${isOpen ? 'open' : 'closed'}`}>
      <button className="dev-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '❌ Close Dev Panel' : '🛠️ Dev Panel & Action Log'}
      </button>

      {isOpen && (
        <div className="dev-content">
          <div className="dev-actions-header">
            <h4>World Action Log ({logEntries.length})</h4>
            <div className="btn-group">
              <button className="btn-small" onClick={handleRunAI}>🤖 Run AI Cook Plan</button>
              <button className="btn-small btn-secondary" onClick={handleClear}>🗑️ Clear Log</button>
            </div>
          </div>

          <div className="log-stream">
            {logEntries.slice().reverse().map((entry, idx) => (
              <div key={`${entry.timestamp}-${idx}`} className="log-entry">
                <span className="log-time">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                <span className="log-action">{entry.action}</span>
              </div>
            ))}
            {logEntries.length === 0 && (
              <span className="empty-log">No world actions recorded yet.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
