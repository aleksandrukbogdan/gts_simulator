import React, { useMemo } from 'react';

const NetworkMap = ({
    stations,
    pipelines,
    selectedElement,
    onSelectElement,
    accidentInfo,
}) => {
    // SVG dimensions - wider for complex network
    const width = 900;
    const height = 320;

    // Scale positions to fit SVG
    const scaledStations = useMemo(() => {
        return stations.map(station => ({
            ...station,
            scaledX: (station.position.x / 900) * (width - 60) + 30,
            scaledY: (station.position.y / 300) * (height - 40) + 20,
        }));
    }, [stations]);

    // Find station by ID
    const getStation = (id) => scaledStations.find(s => s.id === id);

    // Check if element is selected
    const isSelected = (type, id) => {
        return selectedElement?.type === type && selectedElement?.data.id === id;
    };

    // Check if station is affected by accident
    const isStationAffected = (stationId) => {
        return accidentInfo?.affectedStations?.includes(stationId);
    };

    // Check if pipeline is affected by accident
    const isPipelineAffected = (pipelineId) => {
        return accidentInfo?.affectedPipelines?.includes(pipelineId);
    };

    const handleStationClick = (station) => {
        const originalStation = stations.find(s => s.id === station.id);
        onSelectElement({ type: 'station', data: originalStation });
    };

    const handlePipelineClick = (pipeline) => {
        onSelectElement({ type: 'pipeline', data: pipeline });
    };

    // Get color based on station type
    const getStationColor = (type) => {
        switch (type) {
            case 'compressor': return '#22c55e'; // Green for CS
            case 'metering': return '#3b82f6'; // Blue for GIS
            case 'distribution': return '#f97316'; // Orange for GRS
            case 'junction': return '#a855f7'; // Purple for junctions
            default: return '#6b7280';
        }
    };

    // Get station type label
    const getStationLabel = (type) => {
        switch (type) {
            case 'compressor': return 'CS';
            case 'metering': return 'GIS';
            case 'distribution': return 'GRS';
            case 'junction': return 'PPG';
            default: return '';
        }
    };

    return (
        <div className="glass-card network-map">
            <div className="card-header">
                <span className="card-title">Gas Transmission System - Flow Diagram</span>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.7rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{
                            width: '10px',
                            height: '10px',
                            background: '#22c55e',
                            borderRadius: '2px'
                        }}></span>
                        CS
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{
                            width: '10px',
                            height: '10px',
                            background: '#3b82f6',
                            borderRadius: '2px'
                        }}></span>
                        GIS
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{
                            width: '10px',
                            height: '10px',
                            background: '#f97316',
                            borderRadius: '2px'
                        }}></span>
                        GRS
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{
                            width: '20px',
                            height: '3px',
                            background: 'linear-gradient(90deg, #eab308, #22c55e)',
                            borderRadius: '2px'
                        }}></span>
                        Pipeline
                    </span>
                </div>
            </div>
            <div className="card-content">
                <svg
                    className="network-svg"
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        {/* Pipeline gradient - yellow to green like reference */}
                        <linearGradient id="pipeGradientYG" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#eab308" />
                            <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>
                        <linearGradient id="pipeGradientYGVert" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#eab308" />
                            <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>

                        {/* Selected glow */}
                        <filter id="glowSelected" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Accident red glow */}
                        <filter id="glowAccident" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feFlood floodColor="#ef4444" floodOpacity="0.8" result="glowColor" />
                            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow" />
                            <feMerge>
                                <feMergeNode in="softGlow" />
                                <feMergeNode in="softGlow" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Arrow marker for flow direction */}
                        <marker
                            id="arrowGreen"
                            viewBox="0 0 10 10"
                            refX="5"
                            refY="5"
                            markerWidth="4"
                            markerHeight="4"
                            orient="auto-start-reverse"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                        </marker>

                        {/* Pulsing animation for accident elements */}
                        <style>
                            {`
                                @keyframes accidentPulse {
                                    0%, 100% { opacity: 1; }
                                    50% { opacity: 0.5; }
                                }
                                .accident-element {
                                    animation: accidentPulse 1s ease-in-out infinite;
                                }
                            `}
                        </style>
                    </defs>

                    {/* Pipelines */}
                    {pipelines.map((pipeline) => {
                        const fromStation = getStation(pipeline.from);
                        const toStation = getStation(pipeline.to);

                        if (!fromStation || !toStation) return null;

                        const selected = isSelected('pipeline', pipeline.id);
                        const affected = isPipelineAffected(pipeline.id);
                        const midX = (fromStation.scaledX + toStation.scaledX) / 2;
                        const midY = (fromStation.scaledY + toStation.scaledY) / 2;

                        // Calculate angle for flow label positioning
                        const dx = toStation.scaledX - fromStation.scaledX;
                        const dy = toStation.scaledY - fromStation.scaledY;
                        const labelOffset = dy > 20 || dy < -20 ? 0 : -8;

                        // Determine color based on state
                        const strokeColor = affected ? '#ef4444' : (selected ? '#60a5fa' : '#22c55e');
                        const strokeW = affected ? 4 : (selected ? 4 : 2.5);
                        const filterStyle = affected ? 'url(#glowAccident)' : (selected ? 'url(#glowSelected)' : 'none');

                        return (
                            <g key={pipeline.id} className={affected ? 'accident-element' : ''}>
                                {/* Pipeline line */}
                                <line
                                    x1={fromStation.scaledX}
                                    y1={fromStation.scaledY}
                                    x2={toStation.scaledX}
                                    y2={toStation.scaledY}
                                    stroke={strokeColor}
                                    strokeWidth={strokeW}
                                    strokeLinecap="round"
                                    style={{
                                        filter: filterStyle,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handlePipelineClick(pipeline)}
                                />

                                {/* Flow rate label - only show for significant flows */}
                                {pipeline.parameters.flowRate > 0 && (
                                    <text
                                        x={midX}
                                        y={midY + labelOffset}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        style={{
                                            fill: '#fbbf24',
                                            fontSize: '8px',
                                            fontFamily: 'var(--font-mono)',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        Q={pipeline.parameters.flowRate.toFixed(1)}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* Stations */}
                    {scaledStations.map((station) => {
                        const selected = isSelected('station', station.id);
                        const affected = isStationAffected(station.id);
                        const baseColor = getStationColor(station.type);
                        const color = affected ? '#ef4444' : baseColor;
                        const size = station.type === 'compressor' ? 10 : 8;

                        // Determine filter based on state
                        const filterStyle = affected ? 'url(#glowAccident)' : (selected ? 'url(#glowSelected)' : 'none');

                        return (
                            <g
                                key={station.id}
                                transform={`translate(${station.scaledX}, ${station.scaledY})`}
                                onClick={() => handleStationClick(station)}
                                style={{ cursor: 'pointer' }}
                                className={affected ? 'accident-element' : ''}
                            >
                                {/* Station marker - small square like in reference */}
                                <rect
                                    x={-size / 2}
                                    y={-size / 2}
                                    width={size}
                                    height={size}
                                    fill={color}
                                    stroke={affected ? '#ff6b6b' : (selected ? '#fff' : '#1a1a2e')}
                                    strokeWidth={affected ? 2 : (selected ? 2 : 1)}
                                    rx="1"
                                    style={{
                                        filter: filterStyle,
                                    }}
                                />

                                {/* Station label - positioned based on available space */}
                                <text
                                    x={0}
                                    y={-size / 2 - 5}
                                    textAnchor="middle"
                                    style={{
                                        fill: station.type === 'compressor' ? '#22c55e' : '#3b82f6',
                                        fontSize: '7px',
                                        fontWeight: '500',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {station.shortName}
                                </text>

                                {/* Flow rate at station */}
                                {station.parameters.flowRate > 0 && station.type !== 'junction' && (
                                    <text
                                        x={0}
                                        y={size / 2 + 10}
                                        textAnchor="middle"
                                        style={{
                                            fill: '#9ca3af',
                                            fontSize: '6px',
                                            fontFamily: 'var(--font-mono)',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        Q={station.parameters.flowRate.toFixed(1)}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* System totals panel in bottom right */}
                    <g transform={`translate(${width - 145}, ${height - 85})`}>
                        <rect
                            x="0"
                            y="0"
                            width="140"
                            height="80"
                            fill="rgba(26, 26, 46, 0.9)"
                            stroke="#374151"
                            strokeWidth="1"
                            rx="4"
                        />
                        <text x="70" y="15" textAnchor="middle" fill="#f9fafb" fontSize="8" fontWeight="600">
                            SYSTEM SUMMARY
                        </text>
                        <line x1="5" y1="20" x2="135" y2="20" stroke="#374151" strokeWidth="1" />

                        <text x="10" y="33" fill="#9ca3af" fontSize="7">Delivery to consumers</text>
                        <text x="130" y="33" textAnchor="end" fill="#22c55e" fontSize="7" fontFamily="var(--font-mono)">6,685.6</text>

                        <text x="10" y="45" fill="#9ca3af" fontSize="7">Internal consumption</text>
                        <text x="130" y="45" textAnchor="end" fill="#3b82f6" fontSize="7" fontFamily="var(--font-mono)">910.0</text>

                        <text x="10" y="57" fill="#9ca3af" fontSize="7">Injection to storage</text>
                        <text x="130" y="57" textAnchor="end" fill="#f97316" fontSize="7" fontFamily="var(--font-mono)">0.0</text>

                        <text x="10" y="69" fill="#9ca3af" fontSize="7">Storage change</text>
                        <text x="130" y="69" textAnchor="end" fill="#ef4444" fontSize="7" fontFamily="var(--font-mono)">-1,405.0</text>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default NetworkMap;
