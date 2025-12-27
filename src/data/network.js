// Network data for GTS Simulator - Large Complex Network
// 150 stations and 210 pipelines for comprehensive simulation

// Station types: 'compressor' (CS), 'metering' (GIS), 'distribution' (GRS), 'junction'

// Generate large network algorithmically
function generateStations() {
    const stations = [];
    const types = ['compressor', 'metering', 'distribution', 'junction'];
    const typeWeights = [0.3, 0.35, 0.15, 0.2]; // Distribution of station types

    // Grid-based distribution with some randomness for organic feel
    const gridCols = 15;
    const gridRows = 10;
    const cellWidth = 1800 / gridCols;
    const cellHeight = 1100 / gridRows;

    let stationIndex = 0;

    // Create main trunk line stations (row 5 - middle) - 15 stations
    for (let col = 0; col < gridCols; col++) {
        const type = col % 3 === 0 ? 'compressor' : 'metering';
        const prefix = type === 'compressor' ? 'CS' : 'GIS';
        const x = 50 + col * cellWidth + (Math.random() - 0.5) * 30;
        const y = 550 + (Math.random() - 0.5) * 40;

        stations.push(createStation(`station_${stationIndex}`, `${prefix}-M${col + 1}`, type, x, y, stationIndex));
        stationIndex++;
    }

    // Create northern branch (rows 0-4) - ~55 stations
    for (let row = 0; row < 5; row++) {
        const stationsInRow = 9 + row * 2; // 9, 11, 13, 15, 17 = 65 stations
        for (let i = 0; i < stationsInRow; i++) {
            const rand = Math.random();
            let type;
            if (rand < 0.3) type = 'compressor';
            else if (rand < 0.65) type = 'metering';
            else if (rand < 0.8) type = 'distribution';
            else type = 'junction';

            const prefix = type === 'compressor' ? 'CS' : type === 'metering' ? 'GIS' : type === 'distribution' ? 'GRS' : 'JNC';
            const x = 50 + (i / (stationsInRow - 1)) * 1750 + (Math.random() - 0.5) * 40;
            const y = 50 + row * 100 + (Math.random() - 0.5) * 30;

            stations.push(createStation(`station_${stationIndex}`, `${prefix}-N${row + 1}${i + 1}`, type, x, y, stationIndex));
            stationIndex++;
        }
    }

    // Create southern branch (rows 6-9) - ~70 stations
    for (let row = 0; row < 5; row++) {
        const stationsInRow = 12 + row * 2; // 12, 14, 16, 18, 20 = 80 stations (but we slice to 150)
        for (let i = 0; i < stationsInRow; i++) {
            const rand = Math.random();
            let type;
            if (rand < 0.3) type = 'compressor';
            else if (rand < 0.65) type = 'metering';
            else if (rand < 0.8) type = 'distribution';
            else type = 'junction';

            const prefix = type === 'compressor' ? 'CS' : type === 'metering' ? 'GIS' : type === 'distribution' ? 'GRS' : 'JNC';
            const x = 50 + (i / (stationsInRow - 1)) * 1750 + (Math.random() - 0.5) * 40;
            const y = 650 + row * 100 + (Math.random() - 0.5) * 30;

            stations.push(createStation(`station_${stationIndex}`, `${prefix}-S${row + 1}${i + 1}`, type, x, y, stationIndex));
            stationIndex++;
        }
    }

    return stations.slice(0, 150); // Ensure exactly 150 stations
}

function createStation(id, name, type, x, y, index) {
    // Generate realistic parameters based on position
    const basePressure = 75 - (y / 1100) * 30; // Pressure decreases south
    const baseTemp = 8 + (y / 1100) * 18; // Temperature increases south
    const baseFlow = 1000 + Math.random() * 5000;

    return {
        id,
        name,
        shortName: name,
        type,
        position: { x: Math.round(x), y: Math.round(y) },
        status: 'normal',
        parameters: {
            inletPressure: +(basePressure + Math.random() * 5).toFixed(1),
            outletPressure: +(basePressure - 2 + Math.random() * 3).toFixed(1),
            temperature: +(baseTemp + Math.random() * 4).toFixed(1),
            flowRate: type === 'compressor' ? +(baseFlow).toFixed(1) : +(baseFlow * 0.3).toFixed(1),
            power: type === 'compressor' ? +(10 + Math.random() * 25).toFixed(1) : 0,
            efficiency: +(82 + Math.random() * 17).toFixed(1),
            ...(type === 'compressor' ? {
                compressorUnits: Math.floor(2 + Math.random() * 4),
                activeUnits: Math.floor(2 + Math.random() * 3),
            } : {})
        }
    };
}

function generatePipelines(stations) {
    const pipelines = [];
    let pipeIndex = 0;
    const connected = new Set();

    const addPipeline = (fromId, toId) => {
        const connKey1 = `${fromId}-${toId}`;
        const connKey2 = `${toId}-${fromId}`;
        if (!connected.has(connKey1) && !connected.has(connKey2)) {
            pipelines.push(createPipeline(`pipe_${pipeIndex}`, fromId, toId, pipeIndex));
            connected.add(connKey1);
            pipeIndex++;
            return true;
        }
        return false;
    };

    // Group stations by approximate Y position (rows)
    const rows = {};
    stations.forEach(s => {
        const rowKey = Math.floor(s.position.y / 100) * 100;
        if (!rows[rowKey]) rows[rowKey] = [];
        rows[rowKey].push(s);
    });

    // Sort each row by X and connect horizontally
    Object.keys(rows).forEach(rowKey => {
        const row = rows[rowKey].sort((a, b) => a.position.x - b.position.x);
        for (let i = 0; i < row.length - 1; i++) {
            addPipeline(row[i].id, row[i + 1].id);
        }
    });

    // Connect rows vertically - find nearest station in adjacent rows
    const sortedRowKeys = Object.keys(rows).map(Number).sort((a, b) => a - b);

    for (let r = 0; r < sortedRowKeys.length - 1; r++) {
        const currentRow = rows[sortedRowKeys[r]];
        const nextRow = rows[sortedRowKeys[r + 1]];

        // Connect every 2-3 stations in current row to the next row
        const step = Math.max(1, Math.floor(currentRow.length / 5));
        for (let i = 0; i < currentRow.length; i += step) {
            const station = currentRow[i];
            // Find nearest station in next row
            let nearest = nextRow[0];
            let minDist = Infinity;
            for (const next of nextRow) {
                const dist = Math.abs(next.position.x - station.position.x);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = next;
                }
            }
            addPipeline(station.id, nearest.id);
        }
    }

    // Add some additional cross-connections for network redundancy
    for (const station of stations) {
        const distances = stations
            .filter(s => s.id !== station.id)
            .map(s => ({
                station: s,
                dist: Math.sqrt(
                    Math.pow(s.position.x - station.position.x, 2) +
                    Math.pow(s.position.y - station.position.y, 2)
                )
            }))
            .sort((a, b) => a.dist - b.dist);

        // Connect to 1 nearest neighbor if not already connected
        for (const { station: neighbor, dist } of distances.slice(0, 2)) {
            if (dist < 200) {
                addPipeline(station.id, neighbor.id);
            }
        }
    }

    return pipelines.slice(0, 210); // Ensure exactly 210 pipelines
}

function createPipeline(id, from, to, index) {
    const diameters = [720, 820, 1020, 1220, 1420];
    const materials = ['X52', 'X60', 'X65', 'X70'];

    return {
        id,
        name: `Line ${index + 1}`,
        from,
        to,
        status: 'normal',
        parameters: {
            length: +(50 + Math.random() * 150).toFixed(1),
            diameter: diameters[Math.floor(Math.random() * diameters.length)],
            wallThickness: +(12 + Math.random() * 10).toFixed(1),
            pressure: +(45 + Math.random() * 30).toFixed(1),
            temperature: +(10 + Math.random() * 15).toFixed(1),
            flowRate: +(100 + Math.random() * 2000).toFixed(1),
            velocity: +(4 + Math.random() * 10).toFixed(1),
            material: materials[Math.floor(Math.random() * materials.length)],
        }
    };
}

// Generate the network
export const stations = generateStations();
export const pipelines = generatePipelines(stations);

export const gasComposition = {
    methane: 94.5,
    ethane: 2.8,
    propane: 0.8,
    butane: 0.3,
    co2: 0.5,
    nitrogen: 0.9,
    h2s: 0.001,
    moisture: 0.15,
};

export const systemTotals = {
    totalLength: pipelines.reduce((sum, p) => sum + p.parameters.length, 0).toFixed(1),
    totalFlowRate: stations.filter(s => s.type === 'compressor').reduce((sum, s) => sum + s.parameters.flowRate, 0).toFixed(1),
    totalPower: stations.filter(s => s.type === 'compressor').reduce((sum, s) => sum + s.parameters.power, 0).toFixed(1),
    stationsCount: stations.length,
    pipelinesCount: pipelines.length,
    avgPressure: (stations.reduce((sum, s) => sum + s.parameters.inletPressure, 0) / stations.length).toFixed(1),
    avgTemperature: (stations.reduce((sum, s) => sum + s.parameters.temperature, 0) / stations.length).toFixed(1),
    deliveryToConsumers: 25000.0,
    gasFromPKG: 3500.0,
    injectionToPKG: 0.0,
    gasStorageChange: -5000.0,
};

// Get station by ID
export function getStationById(id) {
    return stations.find(s => s.id === id);
}

// Get pipeline by ID
export function getPipelineById(id) {
    return pipelines.find(p => p.id === id);
}

// Get connected pipelines for a station
export function getPipelinesForStation(stationId) {
    return pipelines.filter(p => p.from === stationId || p.to === stationId);
}

// Get key pipelines for accident scenarios (main trunk lines)
export function getKeyPipelines() {
    return pipelines.slice(0, 15); // First 15 are main trunk
}

// Get key stations for accident scenarios (compressor stations)
export function getKeyStations() {
    return stations.filter(s => s.type === 'compressor').slice(0, 10);
}
