import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import NetworkMap from './components/NetworkMap';
import ParametersPanel from './components/ParametersPanel';
import AIChat from './components/AIChat';
import { stations as initialStations, pipelines as initialPipelines } from './data/network';

function App() {
    const [stations] = useState(initialStations);
    const [pipelines] = useState(initialPipelines);
    const [selectedElement, setSelectedElement] = useState(null);
    const [systemStatus] = useState('normal');
    const [accidentInfo, setAccidentInfo] = useState(null);

    const handleSelectElement = useCallback((element) => {
        setSelectedElement(element);
    }, []);

    // Handle accident simulation from AI chat
    const handleAccidentSimulation = useCallback((accident) => {
        console.log('Accident simulation triggered:', accident);
        setAccidentInfo({
            pipelineId: accident.pipelineId,
            stationId: accident.stationId,
            accidentType: accident.accidentType,
            affectedStations: accident.affectedStations || [],
            affectedPipelines: accident.affectedPipelines || [],
        });
    }, []);

    // Clear accident simulation
    const clearAccident = useCallback(() => {
        setAccidentInfo(null);
    }, []);

    // Get human-readable accident description
    const getAccidentDescription = () => {
        if (!accidentInfo) return '';
        if (accidentInfo.pipelineId) {
            const pipelineNames = {
                'pipe_surgut_bogat': 'Line 1 (GIS Surgut → CS Bogatinka)',
                'pipe_terensay_ufa': 'Line 29 (CS Terensay → PPTT Ufa)',
                'pipe_bogat_shatrov': 'Line 2 (CS Bogatinka → CS Shatrovskaya)',
            };
            return `Pipeline Rupture: ${pipelineNames[accidentInfo.pipelineId] || accidentInfo.pipelineId}`;
        }
        if (accidentInfo.stationId) {
            const stationNames = {
                'cs_bogatinka': 'CS Bogatinka',
                'cs_terensay': 'CS Terensay',
                'cs_magnitogorsk': 'CS Magnitogorsk',
            };
            return `Compressor Failure: ${stationNames[accidentInfo.stationId] || accidentInfo.stationId}`;
        }
        return 'Active Emergency';
    };

    return (
        <div className="app-container">
            {/* Accident Alert Banner */}
            {accidentInfo && (
                <div className="accident-alert-banner">
                    <div className="accident-alert-content">
                        <span className="accident-alert-icon">⚠️</span>
                        <span className="accident-alert-text">
                            <strong>EMERGENCY SIMULATION ACTIVE:</strong> {getAccidentDescription()}
                        </span>
                        <button className="accident-alert-close" onClick={clearAccident}>
                            ✕ Clear
                        </button>
                    </div>
                </div>
            )}

            <Header
                systemStatus={accidentInfo ? 'warning' : systemStatus}
            />

            <main className="main-content">
                <ParametersPanel
                    selectedElement={selectedElement}
                    networkData={{ stations, pipelines }}
                />

                <NetworkMap
                    stations={stations}
                    pipelines={pipelines}
                    selectedElement={selectedElement}
                    onSelectElement={handleSelectElement}
                    accidentInfo={accidentInfo}
                />

                <AIChat
                    networkData={{ stations, pipelines }}
                    onAccidentSimulation={handleAccidentSimulation}
                    selectedElement={selectedElement}
                    onClearAccident={clearAccident}
                    hasActiveAccident={!!accidentInfo}
                />
            </main>
        </div>
    );
}

export default App;
