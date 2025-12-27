// Accident scenarios and AI responses for GTS Simulator
// Updated for large network (150 stations, 210 pipelines)

import { stations, pipelines, getKeyPipelines, getKeyStations } from './network';

export const accidentTypes = {
    pipeRupture: {
        id: 'pipeRupture',
        name: 'Pipeline Rupture',
        severity: 'critical',
        icon: '💥',
    },
    compressorFailure: {
        id: 'compressorFailure',
        name: 'Compressor Failure',
        severity: 'high',
        icon: '⚙️',
    },
    gasLeak: {
        id: 'gasLeak',
        name: 'Gas Leak',
        severity: 'high',
        icon: '🔥',
    },
    blockage: {
        id: 'blockage',
        name: 'Section Blockage',
        severity: 'medium',
        icon: '🚫',
    },
    pressureDrop: {
        id: 'pressureDrop',
        name: 'Pressure Drop',
        severity: 'medium',
        icon: '📉',
    },
};

// Generate accident scenarios dynamically based on the network
function generatePipelineScenarios() {
    const scenarios = {};
    const keyPipelines = getKeyPipelines();

    keyPipelines.forEach((pipeline, index) => {
        const fromStation = stations.find(s => s.id === pipeline.from);
        const toStation = stations.find(s => s.id === pipeline.to);

        if (!fromStation || !toStation) return;

        // Find nearby stations that would be affected
        const affectedStations = [pipeline.from, pipeline.to];
        const affectedPipelines = [pipeline.id];

        // Add adjacent pipelines
        pipelines.forEach(p => {
            if (p.from === pipeline.from || p.from === pipeline.to ||
                p.to === pipeline.from || p.to === pipeline.to) {
                if (!affectedPipelines.includes(p.id)) {
                    affectedPipelines.push(p.id);
                }
            }
        });

        scenarios[pipeline.id] = {
            pipeRupture: {
                affectedStations,
                affectedPipelines,
                pressureChange: { [pipeline.from]: -25, [pipeline.to]: -30 },
                flowRateChange: -35 - (index * 2),
                description: `
                    <p><span class="warning">CRITICAL EMERGENCY</span> on ${pipeline.name} (${fromStation.name} → ${toStation.name})</p>
                    <p>A pipeline rupture on this section will cause the following consequences:</p>
                    <ul>
                        <li>Immediate pressure drop of <span class="highlight">25-30 atm</span></li>
                        <li>Automatic shutdown of nearby compressor units</li>
                        <li>Emergency valves triggered at both ends</li>
                        <li>System flow rate reduction by <span class="warning">${35 + index * 2}%</span></li>
                    </ul>
                    <p>Estimated containment time: <span class="highlight">15-25 minutes</span></p>
                    <p>Estimated recovery time: <span class="warning">6-12 hours</span></p>
                `,
                recommendations: [
                    `Close emergency valves on ${pipeline.name}`,
                    `Reduce output from ${fromStation.name}`,
                    'Activate backup route through alternative branch',
                    'Dispatch emergency crew to contain the leak',
                ],
            },
            gasLeak: {
                affectedStations,
                affectedPipelines: [pipeline.id],
                pressureChange: { [pipeline.from]: -8, [pipeline.to]: -12 },
                flowRateChange: -15,
                description: `
                    <p><span class="warning">GAS LEAK</span> on ${pipeline.name}</p>
                    <p>Gas leak detected on ${fromStation.name} → ${toStation.name} section:</p>
                    <ul>
                        <li>Pressure drop: <span class="highlight">8-12 atm</span></li>
                        <li>Gas loss: approximately <span class="warning">15%</span> of flow rate</li>
                        <li>Pressure reduction recommended for safe repairs</li>
                    </ul>
                `,
                recommendations: [
                    'Reduce section pressure to 40 atm',
                    'Dispatch repair crew for diagnostics',
                    'Prepare sealing equipment',
                ],
            },
        };
    });

    return scenarios;
}

function generateStationScenarios() {
    const scenarios = {};
    const keyStations = getKeyStations();

    keyStations.forEach((station, index) => {
        // Find connected pipelines
        const connectedPipelines = pipelines.filter(
            p => p.from === station.id || p.to === station.id
        );

        // Find connected stations
        const connectedStationIds = new Set();
        connectedPipelines.forEach(p => {
            connectedStationIds.add(p.from === station.id ? p.to : p.from);
        });

        const affectedStations = [station.id, ...Array.from(connectedStationIds).slice(0, 2)];
        const affectedPipelines = connectedPipelines.slice(0, 3).map(p => p.id);

        scenarios[station.id] = {
            compressorFailure: {
                affectedStations,
                affectedPipelines,
                pressureChange: { [station.id]: -20 },
                flowRateChange: -22 - (index * 2),
                description: `
                    <p><span class="warning">COMPRESSOR FAILURE</span> at ${station.name}</p>
                    <p>Compressor unit failure at this station:</p>
                    <ul>
                        <li>Discharge pressure reduction by <span class="highlight">20 atm</span></li>
                        <li>Station output decrease by <span class="warning">${22 + index * 2}%</span></li>
                        <li>Cascade effect on ${connectedStationIds.size} connected stations</li>
                        <li>Remaining units: <span class="highlight">${(station.parameters.activeUnits || 2) - 1} of ${station.parameters.compressorUnits || 3}</span></li>
                    </ul>
                    <p>Backup unit can be started in <span class="highlight">45 minutes</span></p>
                `,
                recommendations: [
                    'Start backup compressor unit',
                    'Reduce inlet flow to stabilize',
                    'Check oil system condition',
                    'Diagnose the failed unit',
                ],
            },
        };
    });

    return scenarios;
}

// Generate scenarios
export const pipelineAccidentScenarios = generatePipelineScenarios();
export const stationAccidentScenarios = generateStationScenarios();

// General responses
export const generalResponses = {
    systemStatus: `
        <p><span class="success">System operating normally</span></p>
        <p>Current GTS status:</p>
        <ul>
            <li>Active stations: <span class="highlight">${stations.length} of ${stations.length}</span></li>
            <li>Sections in operation: <span class="highlight">${pipelines.length} of ${pipelines.length}</span></li>
            <li>Compressor stations: <span class="highlight">${stations.filter(s => s.type === 'compressor').length}</span></li>
            <li>Metering stations (GIS): <span class="highlight">${stations.filter(s => s.type === 'metering').length}</span></li>
            <li>Distribution stations (GRS): <span class="highlight">${stations.filter(s => s.type === 'distribution').length}</span></li>
            <li>System efficiency: <span class="success">85.1%</span></li>
        </ul>
    `,
    gasComposition: `
        <p>Transported gas composition:</p>
        <ul>
            <li>Methane (CH₄): <span class="highlight">94.5%</span></li>
            <li>Ethane (C₂H₆): <span class="highlight">2.8%</span></li>
            <li>Propane (C₃H₈): <span class="highlight">0.8%</span></li>
            <li>Butane (C₄H₁₀): <span class="highlight">0.3%</span></li>
            <li>CO₂: <span class="highlight">0.5%</span></li>
            <li>Nitrogen (N₂): <span class="highlight">0.9%</span></li>
            <li>H₂S: <span class="highlight">0.001%</span> (within normal limits)</li>
        </ul>
        <p>Heating value: <span class="highlight">35.8 MJ/m³</span></p>
    `,
    networkTopology: `
        <p>Gas transmission network topology:</p>
        <ul>
            <li>Total stations: <span class="highlight">${stations.length}</span></li>
            <li>Total pipeline sections: <span class="highlight">${pipelines.length}</span></li>
            <li>Network coverage area: <span class="highlight">~2000 x 1200 km²</span></li>
            <li>Pipe diameters: <span class="highlight">720-1420 mm</span></li>
            <li>Operating pressure: <span class="highlight">45-75 atm</span></li>
        </ul>
        <p>The network has a complex trunk-and-branch structure with redundancy.</p>
    `,
    help: `
        <p>I am an intelligent assistant for gas transmission system analysis. Here's what I can do:</p>
        <ul>
            <li>📊 Show <span class="highlight">station and section parameters</span></li>
            <li>🔍 Analyze <span class="highlight">emergency scenarios</span></li>
            <li>⚠️ Simulate <span class="highlight">accident consequences</span></li>
            <li>📈 Display <span class="highlight">gas composition</span> and characteristics</li>
        </ul>
        <p>Example questions:</p>
        <ul>
            <li>"Simulate accident on Line 1"</li>
            <li>"What happens during an accident on Line 5?"</li>
            <li>"Simulate station failure"</li>
            <li>"Show system status"</li>
        </ul>
    `,
};

// Function to parse question and generate response
export function generateAIResponse(question, networkState, conversationContext = {}) {
    const q = question.toLowerCase();

    // Check for help request
    if (q.includes('help') || q.includes('what can you do') || q.includes('помощь') || q.includes('что ты умеешь')) {
        return { type: 'text', content: generalResponses.help };
    }

    // Check for system status
    if (q.includes('status') || q.includes('system') || q.includes('статус') || q.includes('состояние')) {
        return { type: 'text', content: generalResponses.systemStatus };
    }

    // Check for gas composition
    if (q.includes('composition') || q.includes('состав') || q.includes('газ')) {
        return { type: 'text', content: generalResponses.gasComposition };
    }

    // Check for topology
    if (q.includes('topology') || q.includes('structure') || q.includes('network') || q.includes('топологи') || q.includes('сеть')) {
        return { type: 'text', content: generalResponses.networkTopology };
    }

    // Check for accident scenario on pipeline
    const lineMatch = q.match(/line\s*(\d+)/i) || q.match(/линии?\s*(\d+)/i) || q.match(/участ\w*\s*(\d+)/i);

    if (q.includes('accident') || q.includes('emergency') || q.includes('rupture') || q.includes('simulate') ||
        q.includes('авари') || q.includes('разрыв') || q.includes('симуляц') || q.includes('моделир')) {

        // Find relevant pipeline
        let targetPipeline = null;

        if (lineMatch) {
            const lineNum = parseInt(lineMatch[1]);
            targetPipeline = pipelines.find(p => p.name === `Line ${lineNum}`);
        }

        // If not found by line number, try first key pipeline
        if (!targetPipeline) {
            const keyPipelines = getKeyPipelines();
            targetPipeline = keyPipelines[0];
        }

        if (targetPipeline && pipelineAccidentScenarios[targetPipeline.id]) {
            const scenario = pipelineAccidentScenarios[targetPipeline.id].pipeRupture;
            return {
                type: 'accident',
                pipelineId: targetPipeline.id,
                accidentType: 'pipeRupture',
                content: scenario.description,
                recommendations: scenario.recommendations,
                affectedStations: scenario.affectedStations,
                affectedPipelines: scenario.affectedPipelines,
            };
        }

        // Station failure
        if (q.includes('station') || q.includes('compressor') || q.includes('failure') ||
            q.includes('станц') || q.includes('компрессор') || q.includes('отказ')) {
            const keyStations = getKeyStations();
            const targetStation = keyStations[0];

            if (targetStation && stationAccidentScenarios[targetStation.id]) {
                const scenario = stationAccidentScenarios[targetStation.id].compressorFailure;
                return {
                    type: 'accident',
                    stationId: targetStation.id,
                    accidentType: 'compressorFailure',
                    content: scenario.description,
                    recommendations: scenario.recommendations,
                    affectedStations: scenario.affectedStations,
                    affectedPipelines: scenario.affectedPipelines,
                };
            }
        }
    }

    // Default response
    return {
        type: 'text',
        content: `
            <p>I understood your question. For a more precise answer, please try:</p>
            <ul>
                <li>"Simulate accident on Line X" (where X is 1-${pipelines.length})</li>
                <li>"Simulate station failure"</li>
                <li>"Show system status"</li>
                <li>"Show gas composition"</li>
            </ul>
            <p>Or select an element on the map and ask a question about it.</p>
        `,
    };
}
