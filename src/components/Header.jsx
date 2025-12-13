import React from 'react';
import { systemTotals } from '../data/network';

const Header = ({ systemStatus }) => {
    const getStatusText = () => {
        switch (systemStatus) {
            case 'warning':
                return 'Warning';
            case 'danger':
                return 'Emergency';
            default:
                return 'System Normal';
        }
    };

    const statusClass = systemStatus;

    return (
        <header className="header">
            <div className="header-left">
                <div className="header-logo">
                    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="18" r="16" fill="#111827" stroke="#3b82f6" strokeWidth="2" />
                        <path
                            d="M8 18 L14 18 L14 12 L22 12 L22 18 L28 18"
                            stroke="url(#headerGrad)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <circle cx="8" cy="18" r="2.5" fill="#f97316" />
                        <circle cx="28" cy="18" r="2.5" fill="#22c55e" />
                        <defs>
                            <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#60a5fa" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div>
                        <div className="header-title">GTS Simulator</div>
                        <div className="header-subtitle">Gas Transmission System</div>
                    </div>
                </div>
            </div>

            <div className="header-stats">
                <div className="stat-item">
                    <span className="stat-value">{systemTotals.totalFlowRate}</span>
                    <span className="stat-label">k m³/h</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{systemTotals.avgPressure}</span>
                    <span className="stat-label">atm (avg)</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{systemTotals.totalPower}</span>
                    <span className="stat-label">МВт</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{systemTotals.totalLength}</span>
                    <span className="stat-label">км</span>
                </div>
            </div>

            <div className="header-right">
                <div className={`system-status`}>
                    <span className={`status-indicator ${statusClass}`}></span>
                    <span>{getStatusText()}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
