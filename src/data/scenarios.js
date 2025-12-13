// Accident scenarios and AI responses for GTS Simulator

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

// Accident scenarios for specific pipeline sections
export const pipelineAccidentScenarios = {
    pipe_surgut_bogat: {
        pipeRupture: {
            affectedStations: ['gis_surgut', 'cs_bogatinka', 'cs_shatrovsk'],
            affectedPipelines: ['pipe_surgut_bogat', 'pipe_bogat_shatrov', 'pipe_shatrov_sysert', 'pipe_shatrov_dalmat'],
            pressureChange: { gis_surgut: -25, cs_bogatinka: -30 },
            flowRateChange: -45,
            description: `
        <p><span class="warning">CRITICAL EMERGENCY</span> on Line 1 (GIS Surgut → CS Bogatinka)</p>
        <p>A pipeline rupture on the main northern trunk will cause the following consequences:</p>
        <ul>
          <li>Immediate pressure drop of <span class="highlight">25-30 atm</span> at GIS Surgut and CS Bogatinka</li>
          <li>Automatic shutdown of compressor units at CS Bogatinka</li>
          <li>Emergency valves triggered at both ends of the section</li>
          <li>System flow rate reduction by <span class="warning">45%</span></li>
          <li>Total flow to PPTT Ufa significantly reduced</li>
        </ul>
        <p>Estimated containment time: <span class="highlight">15-20 minutes</span></p>
        <p>Estimated recovery time: <span class="warning">8-12 hours</span></p>
      `,
            recommendations: [
                'Immediately close emergency valves LV-SB1 and LV-SB2',
                'Reduce GIS Surgut output to minimum',
                'Activate backup route through southern branch',
                'Dispatch emergency crew to contain the leak',
            ],
        },
        gasLeak: {
            affectedStations: ['gis_surgut', 'cs_bogatinka'],
            affectedPipelines: ['pipe_surgut_bogat'],
            pressureChange: { gis_surgut: -8, cs_bogatinka: -12 },
            flowRateChange: -15,
            description: `
        <p><span class="warning">GAS LEAK</span> on Line 1</p>
        <p>Gas leak detected on GIS Surgut → CS Bogatinka section:</p>
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
    },
    pipe_terensay_ufa: {
        pipeRupture: {
            affectedStations: ['cs_terensay', 'pptt_ufa'],
            affectedPipelines: ['pipe_terensay_ufa', 'pipe_jalimbet_terensay'],
            pressureChange: { cs_terensay: -28, pptt_ufa: -35 },
            flowRateChange: -38,
            description: `
        <p><span class="warning">CRITICAL EMERGENCY</span> on Line 29 (CS Terensay → PPTT Ufa)</p>
        <p>A rupture on the terminal connection leads to serious consequences:</p>
        <ul>
          <li>Complete supply interruption to <span class="warning">PPTT Ufa</span> terminal</li>
          <li>Pressure drop of <span class="highlight">28-35 atm</span></li>
          <li>Flow rate to consumers: <span class="warning">6685.6 → 0 k m³/h</span></li>
          <li>All downstream consumers affected</li>
        </ul>
        <p>Alternative route: Must reroute through backup connections</p>
        <p>Power loss: <span class="highlight">~35 MW</span></p>
      `,
            recommendations: [
                'Close linear valves on Line 29',
                'Activate emergency shutdown at PPTT Ufa',
                'Notify all downstream consumers immediately',
                'Coordinate with dispatch center',
            ],
        },
        blockage: {
            affectedStations: ['cs_terensay', 'pptt_ufa'],
            affectedPipelines: ['pipe_terensay_ufa'],
            pressureChange: { cs_terensay: 5, pptt_ufa: -20 },
            flowRateChange: -30,
            description: `
        <p><span class="highlight">BLOCKAGE</span> on Line 29</p>
        <p>Partial blockage detected (hydrate plug or mechanical obstruction):</p>
        <ul>
          <li>Inlet pressure increase: <span class="highlight">+5 atm</span></li>
          <li>Outlet pressure drop: <span class="warning">-20 atm</span></li>
          <li>Flow reduction: <span class="warning">30%</span></li>
        </ul>
      `,
            recommendations: [
                'Run diagnostics with inline inspection tool',
                'For hydrate plug - apply section heating',
                'Consider using chemical inhibitors',
            ],
        },
    },
    pipe_bogat_shatrov: {
        pipeRupture: {
            affectedStations: ['cs_bogatinka', 'cs_shatrovsk'],
            affectedPipelines: ['pipe_bogat_shatrov', 'pipe_shatrov_sysert', 'pipe_shatrov_dalmat'],
            pressureChange: { cs_bogatinka: -22, cs_shatrovsk: -28 },
            flowRateChange: -35,
            description: `
        <p><span class="warning">CRITICAL EMERGENCY</span> on Line 2 (CS Bogatinka → CS Shatrovskaya)</p>
        <p>Rupture on the secondary northern trunk:</p>
        <ul>
          <li>Pressure drop of <span class="highlight">22-28 atm</span></li>
          <li>CS Shatrovskaya isolated from main supply</li>
          <li>GIS Sysert and downstream stations affected</li>
          <li>System flow rate reduction by <span class="warning">35%</span></li>
        </ul>
        <p>Estimated recovery time: <span class="warning">6-10 hours</span></p>
      `,
            recommendations: [
                'Close emergency valves on Line 2',
                'Isolate CS Shatrovskaya section',
                'Reroute flow through alternative paths',
                'Dispatch emergency repair crew',
            ],
        },
    },
};


// Accident scenarios for stations
export const stationAccidentScenarios = {
    cs_bogatinka: {
        compressorFailure: {
            affectedStations: ['cs_bogatinka', 'cs_shatrovsk', 'gis_surgut'],
            affectedPipelines: ['pipe_surgut_bogat', 'pipe_bogat_shatrov'],
            pressureChange: { cs_bogatinka: -20, cs_shatrovsk: -15, gis_surgut: -10 },
            flowRateChange: -25,
            description: `
        <p><span class="warning">COMPRESSOR FAILURE</span> at CS Bogatinka</p>
        <p>One compressor unit failure at the main northern compressor station:</p>
        <ul>
          <li>Discharge pressure reduction by <span class="highlight">20 atm</span></li>
          <li>Station output decrease by <span class="warning">25%</span></li>
          <li>Cascade effect on CS Shatrovskaya and GIS Surgut</li>
          <li>Remaining units: <span class="highlight">2 of 4</span></li>
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
    },
    cs_terensay: {
        compressorFailure: {
            affectedStations: ['cs_terensay', 'pptt_ufa', 'gis_jalimbet'],
            affectedPipelines: ['pipe_terensay_ufa', 'pipe_jalimbet_terensay'],
            pressureChange: { cs_terensay: -18, pptt_ufa: -22 },
            flowRateChange: -22,
            description: `
        <p><span class="warning">COMPRESSOR FAILURE</span> at CS Terensay</p>
        <p>Critical network node - affects PPTT Ufa terminal:</p>
        <ul>
          <li>PPTT Ufa receives <span class="warning">22% less</span> gas</li>
          <li>Backup activation required within <span class="highlight">30 min</span></li>
          <li>Flow rate: 456.2 → 355.8 k m³/h</li>
        </ul>
      `,
            recommendations: [
                'Immediate backup unit startup',
                'Temporary load increase on CS Dombarovka',
                'Notify end consumers of possible reduction',
            ],
        },
    },
    cs_magnitogorsk: {
        compressorFailure: {
            affectedStations: ['cs_magnitogorsk', 'gis_krasnogorsk', 'gis_kartaly'],
            affectedPipelines: ['pipe_magnit_krasnog', 'pipe_magnit_kartaly', 'pipe_urgala_magnit'],
            pressureChange: { cs_magnitogorsk: -16, gis_kartaly: -12 },
            flowRateChange: -18,
            description: `
        <p><span class="warning">COMPRESSOR FAILURE</span> at CS Magnitogorsk</p>
        <p>Central hub station failure:</p>
        <ul>
          <li>GIS Kartaly flow reduced by <span class="warning">18%</span></li>
          <li>ICA Central affected</li>
          <li>Pressure drop of <span class="highlight">16 atm</span></li>
        </ul>
      `,
            recommendations: [
                'Start backup compressor unit',
                'Reroute flow through Urgala branch',
                'Monitor ICA Central pressure',
            ],
        },
    },
};

// Flow rate responses for stations
export const flowRateResponses = {
    western: `
    <p>Current flow rate at <span class="highlight">CS "Western"</span> is <span class="highlight">850 thousand m³/day</span> (5-minute sensor polling interval).</p>
    <p>Daily calculation: <span class="highlight">20.4 million m³/day</span></p>
    <p>I can provide you with information about <span class="highlight">technological limits and constraints</span> set for this compressor station.</p>
  `,
    eastern: `
    <p>Current flow rate at <span class="highlight">CS "Eastern"</span> is <span class="highlight">720 thousand m³/day</span> (5-minute sensor polling interval).</p>
    <p>Daily calculation: <span class="highlight">17.3 million m³/day</span></p>
  `,
};

// Temperature graph responses
export const temperatureGraphResponses = {
    eastern: {
        type: 'graph',
        content: `
    <p>Here is the gas temperature change graph at <span class="highlight">GIS "Eastern"</span>, please review:</p>
  `,
        graphData: {
            label: 'Gas Temperature at GIS "Eastern" (Past Week)',
            data: [18.2, 19.5, 17.8, 20.1, 19.3, 18.7, 19.8],
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            unit: '°C',
        },
    },
};

// Emergency plan responses
export const emergencyPlanResponses = {
    northern: {
        documentName: 'Emergency Elimination Plan for GRS "Northern".pdf',
        summary: `
    <p>Providing you with <span class="highlight">"Emergency Elimination Plan for GRS Northern.pdf"</span>.</p>
    <p>I can describe in detail the steps you need to take, which isolation valves to close, who to notify, and provide phone numbers.</p>
  `,
        detailed: `
    <p><span class="warning">EMERGENCY ELIMINATION PLAN</span> for pipeline rupture at GRS "Northern" outlet:</p>
    
    <p><span class="highlight">Immediate Actions (first 5 minutes):</span></p>
    <ul>
      <li>Close isolation valve <span class="warning">LV-N1</span> at GRS inlet</li>
      <li>Close isolation valve <span class="warning">LV-N2</span> at the outlet to the consumer</li>
      <li>Activate emergency alarm system</li>
      <li>Start gas venting through emergency stack</li>
    </ul>
    
    <p><span class="highlight">Notification Procedure:</span></p>
    <ul>
      <li>Dispatch Center: <span class="highlight">+1-555-DISPATCH (347-7282)</span></li>
      <li>Emergency Services: <span class="highlight">+1-555-EMRGNCY (367-4629)</span></li>
      <li>On-duty Site Engineer: <span class="highlight">+1-555-SITE-ENG (748-3364)</span></li>
      <li>Environmental Service: <span class="highlight">+1-555-ENV-SVC (368-7821)</span></li>
    </ul>
    
    <p><span class="highlight">Valves to Close:</span></p>
    <ul>
      <li>LV-N1 (main inlet isolation valve)</li>
      <li>LV-N2 (outlet isolation valve)</li>
      <li>BV-N3 (bypass valve - if open)</li>
      <li>SV-N4, SV-N5 (sectioning valves on connected sections)</li>
    </ul>
    
    <p><span class="highlight">Safety Zone:</span></p>
    <ul>
      <li>Establish exclusion zone: <span class="warning">300 meters</span> from rupture site</li>
      <li>Evacuate personnel from hazardous area</li>
      <li>Block vehicle access to the site</li>
    </ul>
    
    <p>Estimated gas evacuation time: <span class="highlight">25-30 minutes</span></p>
    <p>Safe repair start time: <span class="highlight">after gas concentration drops below 0.5% LEL</span></p>
  `,
    },
};

// Responses to general questions
export const generalResponses = {
    systemStatus: `
    <p><span class="success">System operating normally</span></p>
    <p>Current GTS status:</p>
    <ul>
      <li>Active stations: <span class="highlight">6 of 6</span></li>
      <li>Sections in operation: <span class="highlight">7 of 7</span></li>
      <li>Total flow rate: <span class="highlight">282.4 k m³/h</span></li>
      <li>Average pressure: <span class="highlight">60.5 atm</span></li>
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
      <li>Total length: <span class="highlight">871.8 km</span></li>
      <li>Compressor stations: <span class="highlight">6</span></li>
      <li>Pipeline sections: <span class="highlight">7</span></li>
      <li>Pipe diameters: <span class="highlight">1020-1420 mm</span></li>
      <li>Operating pressure: <span class="highlight">50-75 atm</span></li>
    </ul>
    <p>The network has a ring structure with backup bypass capability.</p>
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
      <li>"What happens during an emergency on section 5?"</li>
      <li>"What is the pressure at CS-3?"</li>
      <li>"Show gas composition"</li>
      <li>"System status"</li>
    </ul>
  `,
};

// Function to parse question and generate response
export function generateAIResponse(question, networkState, conversationContext = {}) {
    const q = question.toLowerCase();

    // Check for detailed emergency plan request (follow-up)
    if ((q.includes('detail') || q.includes('describe') || q.includes('распиши') || q.includes('подробн')) &&
        conversationContext.lastTopic === 'emergencyPlan') {
        const location = conversationContext.lastLocation || 'northern';
        const plan = emergencyPlanResponses[location];
        if (plan) {
            return { type: 'text', content: plan.detailed };
        }
    }

    // Check for flow rate queries
    if ((q.includes('flow') || q.includes('rate') || q.includes('расход')) &&
        (q.includes('cs') || q.includes('кс') || q.includes('western') || q.includes('западн') ||
            q.includes('eastern') || q.includes('восточн'))) {
        if (q.includes('western') || q.includes('западн')) {
            return {
                type: 'text',
                content: flowRateResponses.western,
                topicContext: { lastTopic: 'flowRate', lastLocation: 'western' }
            };
        }
        if (q.includes('eastern') || q.includes('восточн')) {
            return {
                type: 'text',
                content: flowRateResponses.eastern,
                topicContext: { lastTopic: 'flowRate', lastLocation: 'eastern' }
            };
        }
    }

    // Check for temperature graph requests
    if ((q.includes('graph') || q.includes('chart') || q.includes('график') || q.includes('температур')) &&
        (q.includes('gis') || q.includes('гис') || q.includes('eastern') || q.includes('восточн') || q.includes('week') || q.includes('недел'))) {
        const graphResponse = temperatureGraphResponses.eastern;
        return {
            type: 'graph',
            content: graphResponse.content,
            graphData: graphResponse.graphData,
            topicContext: { lastTopic: 'temperatureGraph', lastLocation: 'eastern' }
        };
    }

    // Check for emergency plan requests
    if ((q.includes('plan') || q.includes('emergency') || q.includes('план') || q.includes('ликвидаци') || q.includes('авари')) &&
        (q.includes('grs') || q.includes('грс') || q.includes('northern') || q.includes('северн') || q.includes('rupture') || q.includes('разрыв'))) {
        const plan = emergencyPlanResponses.northern;
        return {
            type: 'document',
            documentName: plan.documentName,
            content: plan.summary,
            topicContext: { lastTopic: 'emergencyPlan', lastLocation: 'northern' }
        };
    }

    // Check for help request
    if (q.includes('help') || q.includes('what can you do') || q.includes('помощь') || q.includes('помоги') || q.includes('что ты умеешь')) {
        return { type: 'text', content: generalResponses.help };
    }

    // Check for system status
    if (q.includes('status') || q.includes('system') || q.includes('статус') || q.includes('состояние системы') || q.includes('как система')) {
        return { type: 'text', content: generalResponses.systemStatus };
    }

    // Check for gas composition
    if (q.includes('composition') || q.includes('gas') || q.includes('состав') || q.includes('газ')) {
        return { type: 'text', content: generalResponses.gasComposition };
    }

    // Check for topology
    if (q.includes('topology') || q.includes('structure') || q.includes('network') || q.includes('топологи') || q.includes('структур') || q.includes('сеть') || q.includes('схема')) {
        return { type: 'text', content: generalResponses.networkTopology };
    }

    // Check for accident scenario - match line numbers to actual pipeline IDs
    const lineMatch = q.match(/line\s*(\d+)/i) || q.match(/участ\w*\s*(\d+)/i) || q.match(/section\s*(\d+)/i);
    const stationNameMatch = q.match(/bogatinka/i) || q.match(/terensay/i) || q.match(/magnitogorsk/i);

    // Map line numbers to pipeline IDs
    const lineToPlipelineMap = {
        '1': 'pipe_surgut_bogat',
        '2': 'pipe_bogat_shatrov',
        '29': 'pipe_terensay_ufa',
    };

    // Map station names to station IDs
    const stationNameToIdMap = {
        'bogatinka': 'cs_bogatinka',
        'terensay': 'cs_terensay',
        'magnitogorsk': 'cs_magnitogorsk',
    };

    if (q.includes('accident') || q.includes('emergency') || q.includes('rupture') || q.includes('failure') || q.includes('what happens') ||
        q.includes('авари') || q.includes('разрыв') || q.includes('отказ') || q.includes('что будет')) {

        // Check for line-based accident
        if (lineMatch) {
            const lineNum = lineMatch[1];
            const pipeId = lineToPlipelineMap[lineNum];
            const scenarios = pipelineAccidentScenarios[pipeId];

            if (scenarios) {
                const accidentType = (q.includes('rupture') || q.includes('разрыв')) ? 'pipeRupture' :
                    (q.includes('leak') || q.includes('утечк')) ? 'gasLeak' :
                        (q.includes('blockage') || q.includes('блокир')) ? 'blockage' : 'pipeRupture';

                const scenario = scenarios[accidentType] || scenarios.pipeRupture;

                if (scenario) {
                    return {
                        type: 'accident',
                        pipelineId: pipeId,
                        accidentType: accidentType,
                        content: scenario.description,
                        recommendations: scenario.recommendations,
                        affectedStations: scenario.affectedStations,
                        affectedPipelines: scenario.affectedPipelines,
                    };
                }
            }

            return {
                type: 'text',
                content: `<p>Analysis of accident on Line ${lineNum}:</p>
          <p>In case of an accident on this section, automatic shutdown and flow rerouting through backup routes will occur. Available scenarios: Line 1, Line 2, Line 29.</p>`,
            };
        }

        // Check for station name-based accident
        if (stationNameMatch) {
            const stationName = stationNameMatch[0].toLowerCase();
            const stationId = stationNameToIdMap[stationName];
            const scenarios = stationAccidentScenarios[stationId];

            if (scenarios && scenarios.compressorFailure) {
                return {
                    type: 'accident',
                    stationId: stationId,
                    accidentType: 'compressorFailure',
                    content: scenarios.compressorFailure.description,
                    recommendations: scenarios.compressorFailure.recommendations,
                    affectedStations: scenarios.compressorFailure.affectedStations,
                    affectedPipelines: scenarios.compressorFailure.affectedPipelines,
                };
            }
        }
    }

    // Check for station parameters
    if (stationMatch && (q.includes('pressure') || q.includes('temperature') || q.includes('flow') || q.includes('parameter') ||
        q.includes('давлени') || q.includes('температур') || q.includes('расход') || q.includes('параметр'))) {
        const stationNum = stationMatch[1];
        const stationId = `ks${stationNum}`;
        const station = networkState?.stations?.find(s => s.id === stationId);

        if (station) {
            return {
                type: 'text',
                content: `
          <p>Parameters of <span class="highlight">${station.name}</span>:</p>
          <ul>
            <li>Inlet pressure: <span class="highlight">${station.parameters.inletPressure} atm</span></li>
            <li>Outlet pressure: <span class="highlight">${station.parameters.outletPressure} atm</span></li>
            <li>Temperature: <span class="highlight">${station.parameters.temperature}°C</span></li>
            <li>Flow rate: <span class="highlight">${station.parameters.flowRate} k m³/h</span></li>
            <li>Power: <span class="highlight">${station.parameters.power} MW</span></li>
            <li>Efficiency: <span class="highlight">${station.parameters.efficiency}%</span></li>
          </ul>
        `,
            };
        }
    }

    // Default response
    return {
        type: 'text',
        content: `
      <p>I understood your question. For a more precise answer, please clarify:</p>
      <ul>
        <li>Which specific <span class="highlight">section</span> or <span class="highlight">station</span> are you referring to?</li>
        <li>What type of <span class="highlight">accident</span> are you interested in?</li>
      </ul>
      <p>Or select an element on the map and ask a question about it.</p>
    `,
    };
}
