import React from 'react';
import { gasComposition } from '../data/network';

const ParametersPanel = ({ selectedElement, networkData }) => {
    const compositionColors = {
        methane: '#22c55e',
        ethane: '#3b82f6',
        propane: '#f97316',
        butane: '#eab308',
        co2: '#6b7280',
        nitrogen: '#a855f7',
    };

    const renderStationParams = (station) => (
        <>
            <div className="param-section">
                <div className="param-section-title">Pressure</div>
                <div className="param-grid">
                    <div className="param-item">
                        <span className="param-label">Inlet</span>
                        <span className="param-value highlight-blue">{station.parameters.inletPressure} atm</span>
                    </div>
                    <div className="param-item">
                        <span className="param-label">Outlet</span>
                        <span className="param-value highlight-green">{station.parameters.outletPressure} atm</span>
                    </div>
                </div>
            </div>

            <div className="param-section">
                <div className="param-section-title">Flow Parameters</div>
                <div className="param-grid">
                    <div className="param-item">
                        <span className="param-label">Temperature</span>
                        <span className="param-value">{station.parameters.temperature}°C</span>
                    </div>
                    <div className="param-item">
                        <span className="param-label">Flow Rate</span>
                        <span className="param-value highlight-orange">{station.parameters.flowRate} k m³/h</span>
                    </div>
                </div>
            </div>

            <div className="param-section">
                <div className="param-section-title">Compressors</div>
                <div className="param-grid">
                    <div className="param-item">
                        <span className="param-label">Power</span>
                        <span className="param-value">{station.parameters.power} MW</span>
                    </div>
                    <div className="param-item">
                        <span className="param-label">Efficiency</span>
                        <span className="param-value highlight-green">{station.parameters.efficiency}%</span>
                    </div>
                    <div className="param-item">
                        <span className="param-label">Units</span>
                        <span className="param-value">
                            {station.parameters.activeUnits} / {station.parameters.compressorUnits}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );

    const renderPipelineParams = (pipeline) => (
        <>
            <div className="param-section">
                <div className="param-section-title">Geometry</div>
                <div className="param-grid">
                    <div className="param-item">
                        <span className="param-label">Length</span>
                        <span className="param-value highlight-blue">{pipeline.parameters.length} km</span>
                    </div>
                    <div className="param-item">
                        <span className="param-label">Diameter</span>
                        <span className="param-value">{pipeline.parameters.diameter} mm</span>
                    </div>
                    <div className="param-item">
                        <span className="param-label">Wall Thickness</span>
                        <span className="param-value">{pipeline.parameters.wallThickness} mm</span>
                    </div>
                    <div className="param-item">
                        <span className="param-label">Material</span>
                        <span className="param-value">{pipeline.parameters.material}</span>
                    </div>
                </div>
            </div>

            <div className="param-section">
                <div className="param-section-title">Flow Parameters</div>
                <div className="param-grid">
                    <div className="param-item">
                        <span className="param-label">Pressure</span>
                        <span className="param-value highlight-blue">{pipeline.parameters.pressure} atm</span>
                    </div>
                    <div className="param-item">
                        <span className="param-label">Temperature</span>
                        <span className="param-value">{pipeline.parameters.temperature}°C</span>
                    </div>
                    <div className="param-item">
                        <span className="param-label">Flow Rate</span>
                        <span className="param-value highlight-orange">{pipeline.parameters.flowRate} k m³/h</span>
                    </div>
                    <div className="param-item">
                        <span className="param-label">Velocity</span>
                        <span className="param-value">{pipeline.parameters.velocity} m/s</span>
                    </div>
                </div>
            </div>
        </>
    );

    const renderGasComposition = () => (
        <div className="param-section">
            <div className="param-section-title">Состав газа</div>
            <div className="composition-bar">
                <div
                    className="composition-segment"
                    style={{ width: `${gasComposition.methane}%`, background: compositionColors.methane }}
                />
                <div
                    className="composition-segment"
                    style={{ width: `${gasComposition.ethane}%`, background: compositionColors.ethane }}
                />
                <div
                    className="composition-segment"
                    style={{ width: `${gasComposition.propane}%`, background: compositionColors.propane }}
                />
                <div
                    className="composition-segment"
                    style={{ width: `${gasComposition.co2 + gasComposition.nitrogen}%`, background: compositionColors.co2 }}
                />
            </div>
            <div className="composition-legend">
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: compositionColors.methane }}></span>
                    CH₄ {gasComposition.methane}%
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: compositionColors.ethane }}></span>
                    C₂H₆ {gasComposition.ethane}%
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: compositionColors.propane }}></span>
                    C₃H₈ {gasComposition.propane}%
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: compositionColors.nitrogen }}></span>
                    N₂ {gasComposition.nitrogen}%
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: compositionColors.co2 }}></span>
                    CO₂ {gasComposition.co2}%
                </div>
            </div>
        </div>
    );

    const renderDefaultContent = () => (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>📊</div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                Select a station or section<br />on the map to view parameters
            </p>
        </div>
    );

    return (
        <div className="glass-card parameters-panel">
            <div className="card-header">
                <span className="card-title">
                    {selectedElement
                        ? (selectedElement.type === 'station' ? selectedElement.data.name : selectedElement.data.name)
                        : 'Parameters'}
                </span>
                {selectedElement && (
                    <span
                        className={`status-indicator ${selectedElement.data.status}`}
                        title={selectedElement.data.status === 'normal' ? 'Normal' : 'Emergency'}
                    ></span>
                )}
            </div>
            <div className="card-content">
                {!selectedElement && renderDefaultContent()}
                {selectedElement?.type === 'station' && renderStationParams(selectedElement.data)}
                {selectedElement?.type === 'pipeline' && renderPipelineParams(selectedElement.data)}
                {renderGasComposition()}
            </div>
        </div>
    );
};

export default ParametersPanel;
