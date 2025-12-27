import React, { useState, useMemo, useRef, useCallback } from 'react';

const NetworkMap = ({
    stations,
    pipelines,
    selectedElement,
    onSelectElement,
    accidentInfo,
}) => {
    // SVG dimensions - larger for complex network
    const baseWidth = 1900;
    const baseHeight = 1150;

    // Zoom and pan state
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const svgRef = useRef(null);

    // Calculate viewBox based on zoom and pan
    const viewBox = useMemo(() => {
        const width = baseWidth / zoom;
        const height = baseHeight / zoom;
        const x = pan.x;
        const y = pan.y;
        return `${x} ${y} ${width} ${height}`;
    }, [zoom, pan]);

    // Handle mouse wheel zoom
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.min(Math.max(zoom * delta, 0.5), 5);

        // Zoom towards cursor position
        if (svgRef.current) {
            const rect = svgRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const svgX = pan.x + (mouseX / rect.width) * (baseWidth / zoom);
            const svgY = pan.y + (mouseY / rect.height) * (baseHeight / zoom);

            const newWidth = baseWidth / newZoom;
            const newHeight = baseHeight / newZoom;

            const newPanX = svgX - (mouseX / rect.width) * newWidth;
            const newPanY = svgY - (mouseY / rect.height) * newHeight;

            setPan({ x: newPanX, y: newPanY });
        }

        setZoom(newZoom);
    }, [zoom, pan]);

    // Handle pan start
    const handleMouseDown = useCallback((e) => {
        if (e.button === 0) { // Left click
            setIsPanning(true);
            setPanStart({ x: e.clientX, y: e.clientY });
        }
    }, []);

    // Handle pan move
    const handleMouseMove = useCallback((e) => {
        if (isPanning && svgRef.current) {
            const rect = svgRef.current.getBoundingClientRect();
            const dx = (e.clientX - panStart.x) * (baseWidth / zoom) / rect.width;
            const dy = (e.clientY - panStart.y) * (baseHeight / zoom) / rect.height;

            setPan(prev => ({
                x: prev.x - dx,
                y: prev.y - dy
            }));
            setPanStart({ x: e.clientX, y: e.clientY });
        }
    }, [isPanning, panStart, zoom]);

    // Handle pan end
    const handleMouseUp = useCallback(() => {
        setIsPanning(false);
    }, []);

    // Zoom control functions
    const zoomIn = () => setZoom(z => Math.min(z * 1.3, 5));
    const zoomOut = () => setZoom(z => Math.max(z / 1.3, 0.5));
    const resetView = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    // Export to PNG
    const exportToPNG = useCallback(() => {
        if (!svgRef.current) return;

        const svg = svgRef.current;
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            // High resolution export (3x)
            const scale = 3;
            const canvas = document.createElement('canvas');
            canvas.width = baseWidth * scale;
            canvas.height = baseHeight * scale;

            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#0f0f23';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const pngUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `gts_network_${Date.now()}.png`;
            link.href = pngUrl;
            link.click();

            URL.revokeObjectURL(url);
        };
        img.src = url;
    }, []);

    // Scale positions to fit SVG
    const scaledStations = useMemo(() => {
        return stations.map(station => ({
            ...station,
            scaledX: station.position.x,
            scaledY: station.position.y,
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

    const handleStationClick = (e, station) => {
        e.stopPropagation();
        const originalStation = stations.find(s => s.id === station.id);
        onSelectElement({ type: 'station', data: originalStation });
    };

    const handlePipelineClick = (e, pipeline) => {
        e.stopPropagation();
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

    return (
        <div className="glass-card network-map">
            <div className="card-header">
                <span className="card-title">Gas Transmission System - {stations.length} Stations, {pipelines.length} Pipelines</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {/* Legend */}
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.65rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '2px' }}></span>
                            CS
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '2px' }}></span>
                            GIS
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#f97316', borderRadius: '2px' }}></span>
                            GRS
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#a855f7', borderRadius: '2px' }}></span>
                            JNC
                        </span>
                    </div>
                    {/* Export button */}
                    <button
                        onClick={exportToPNG}
                        className="zoom-btn"
                        title="Export to PNG"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    >
                        📷 Export
                    </button>
                </div>
            </div>
            <div className="card-content" style={{ position: 'relative' }}>
                {/* Zoom controls */}
                <div className="zoom-controls">
                    <button onClick={zoomIn} className="zoom-btn" title="Zoom In">+</button>
                    <button onClick={zoomOut} className="zoom-btn" title="Zoom Out">−</button>
                    <button onClick={resetView} className="zoom-btn" title="Reset View" style={{ fontSize: '0.7rem' }}>⟲</button>
                    <span className="zoom-level">{Math.round(zoom * 100)}%</span>
                </div>

                <svg
                    ref={svgRef}
                    className="network-svg"
                    viewBox={viewBox}
                    preserveAspectRatio="xMidYMid meet"
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
                >
                    <defs>
                        {/* Pipeline gradient */}
                        <linearGradient id="pipeGradientYG" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#eab308" />
                            <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>

                        {/* Selected glow */}
                        <filter id="glowSelected" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Accident red glow */}
                        <filter id="glowAccident" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feFlood floodColor="#ef4444" floodOpacity="0.8" result="glowColor" />
                            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow" />
                            <feMerge>
                                <feMergeNode in="softGlow" />
                                <feMergeNode in="softGlow" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Pulsing animation for accident elements */}
                        <style>
                            {`
                                @keyframes accidentPulse {
                                    0%, 100% { opacity: 1; }
                                    50% { opacity: 0.4; }
                                }
                                .accident-element {
                                    animation: accidentPulse 0.8s ease-in-out infinite;
                                }
                            `}
                        </style>
                    </defs>

                    {/* Background grid for reference */}
                    <g opacity="0.1">
                        {[...Array(20)].map((_, i) => (
                            <line key={`vgrid-${i}`} x1={i * 100} y1="0" x2={i * 100} y2={baseHeight} stroke="#4b5563" strokeWidth="1" />
                        ))}
                        {[...Array(12)].map((_, i) => (
                            <line key={`hgrid-${i}`} x1="0" y1={i * 100} x2={baseWidth} y2={i * 100} stroke="#4b5563" strokeWidth="1" />
                        ))}
                    </g>

                    {/* Pipelines */}
                    {pipelines.map((pipeline) => {
                        const fromStation = getStation(pipeline.from);
                        const toStation = getStation(pipeline.to);

                        if (!fromStation || !toStation) return null;

                        const selected = isSelected('pipeline', pipeline.id);
                        const affected = isPipelineAffected(pipeline.id);

                        const strokeColor = affected ? '#ef4444' : (selected ? '#60a5fa' : '#22c55e');
                        const strokeW = affected ? 4 : (selected ? 3 : 1.5);
                        const filterStyle = affected ? 'url(#glowAccident)' : (selected ? 'url(#glowSelected)' : 'none');

                        return (
                            <line
                                key={pipeline.id}
                                className={affected ? 'accident-element' : ''}
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
                                onClick={(e) => handlePipelineClick(e, pipeline)}
                            />
                        );
                    })}

                    {/* Stations */}
                    {scaledStations.map((station) => {
                        const selected = isSelected('station', station.id);
                        const affected = isStationAffected(station.id);
                        const baseColor = getStationColor(station.type);
                        const color = affected ? '#ef4444' : baseColor;
                        const size = station.type === 'compressor' ? 12 : 8;

                        const filterStyle = affected ? 'url(#glowAccident)' : (selected ? 'url(#glowSelected)' : 'none');

                        return (
                            <g
                                key={station.id}
                                transform={`translate(${station.scaledX}, ${station.scaledY})`}
                                onClick={(e) => handleStationClick(e, station)}
                                style={{ cursor: 'pointer' }}
                                className={affected ? 'accident-element' : ''}
                            >
                                {/* Station marker */}
                                <rect
                                    x={-size / 2}
                                    y={-size / 2}
                                    width={size}
                                    height={size}
                                    fill={color}
                                    stroke={affected ? '#ff6b6b' : (selected ? '#fff' : '#1a1a2e')}
                                    strokeWidth={affected ? 2 : (selected ? 2 : 0.5)}
                                    rx="2"
                                    style={{ filter: filterStyle }}
                                />

                                {/* Station label - only show when zoomed in enough */}
                                {zoom >= 1.5 && (
                                    <text
                                        x={0}
                                        y={-size / 2 - 4}
                                        textAnchor="middle"
                                        style={{
                                            fill: baseColor,
                                            fontSize: '8px',
                                            fontWeight: '500',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        {station.shortName}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* System summary panel */}
                    <g transform={`translate(${baseWidth - 180}, ${baseHeight - 100})`}>
                        <rect
                            x="0"
                            y="0"
                            width="170"
                            height="90"
                            fill="rgba(26, 26, 46, 0.95)"
                            stroke="#374151"
                            strokeWidth="1"
                            rx="4"
                        />
                        <text x="85" y="16" textAnchor="middle" fill="#f9fafb" fontSize="10" fontWeight="600">
                            SYSTEM SUMMARY
                        </text>
                        <line x1="5" y1="22" x2="165" y2="22" stroke="#374151" strokeWidth="1" />

                        <text x="10" y="38" fill="#9ca3af" fontSize="8">Total Stations</text>
                        <text x="160" y="38" textAnchor="end" fill="#22c55e" fontSize="8" fontFamily="var(--font-mono)">{stations.length}</text>

                        <text x="10" y="52" fill="#9ca3af" fontSize="8">Total Pipelines</text>
                        <text x="160" y="52" textAnchor="end" fill="#3b82f6" fontSize="8" fontFamily="var(--font-mono)">{pipelines.length}</text>

                        <text x="10" y="66" fill="#9ca3af" fontSize="8">Delivery to consumers</text>
                        <text x="160" y="66" textAnchor="end" fill="#22c55e" fontSize="8" fontFamily="var(--font-mono)">25,000.0</text>

                        <text x="10" y="80" fill="#9ca3af" fontSize="8">Zoom Level</text>
                        <text x="160" y="80" textAnchor="end" fill="#fbbf24" fontSize="8" fontFamily="var(--font-mono)">{Math.round(zoom * 100)}%</text>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default NetworkMap;
