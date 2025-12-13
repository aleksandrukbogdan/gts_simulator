// Network data for GTS Simulator - Complex Regional Network
// Based on real gas transmission system topology

// Station types: 'compressor' (CS), 'metering' (GIS), 'distribution' (GRS), 'junction'
export const stations = [
    // Top row - Northern branch
    {
        id: 'gis_surgut',
        name: 'GIS Surgut',
        shortName: 'GIS Surgut',
        type: 'metering',
        position: { x: 850, y: 30 },
        status: 'normal',
        parameters: {
            inletPressure: 72.5,
            outletPressure: 71.8,
            temperature: 8.2,
            flowRate: 4485.0,
            power: 0,
            efficiency: 99.2,
        }
    },
    {
        id: 'cs_bogatinka',
        name: 'CS Bogatinka',
        shortName: 'CS Bogatinka',
        type: 'compressor',
        position: { x: 750, y: 30 },
        status: 'normal',
        parameters: {
            inletPressure: 52.8,
            outletPressure: 74.1,
            temperature: 14.2,
            flowRate: 1876.8,
            power: 28.5,
            efficiency: 86.2,
            compressorUnits: 4,
            activeUnits: 3,
        }
    },
    {
        id: 'cs_shatrovsk',
        name: 'CS Shatrovskaya',
        shortName: 'CS Shatrov.',
        type: 'compressor',
        position: { x: 620, y: 30 },
        status: 'normal',
        parameters: {
            inletPressure: 51.5,
            outletPressure: 73.8,
            temperature: 15.8,
            flowRate: 544.5,
            power: 15.2,
            efficiency: 85.8,
            compressorUnits: 3,
            activeUnits: 3,
        }
    },
    {
        id: 'cs_dalmatovo',
        name: 'CS Dalmatovskaya',
        shortName: 'CS Dalmat.',
        type: 'compressor',
        position: { x: 480, y: 45 },
        status: 'normal',
        parameters: {
            inletPressure: 50.2,
            outletPressure: 72.5,
            temperature: 16.4,
            flowRate: 138.0,
            power: 14.8,
            efficiency: 84.5,
            compressorUnits: 4,
            activeUnits: 3,
        }
    },
    {
        id: 'gis_sysert',
        name: 'GIS Sysert',
        shortName: 'GIS Sysert',
        type: 'metering',
        position: { x: 620, y: 80 },
        status: 'normal',
        parameters: {
            inletPressure: 68.5,
            outletPressure: 67.2,
            temperature: 12.5,
            flowRate: 138.0,
            power: 0,
            efficiency: 99.1,
        }
    },
    {
        id: 'gis_ntura',
        name: 'GIS N.Tura',
        shortName: 'GIS N.Tura',
        type: 'metering',
        position: { x: 480, y: 15 },
        status: 'normal',
        parameters: {
            inletPressure: 65.2,
            outletPressure: 64.8,
            temperature: 10.5,
            flowRate: 1876.8,
            power: 0,
            efficiency: 99.5,
        }
    },
    // Upper middle - Main trunk
    {
        id: 'gis_dolgodereven',
        name: 'GIS Dolgoderevenskaya',
        shortName: 'GIS Dolgoder.',
        type: 'metering',
        position: { x: 350, y: 65 },
        status: 'normal',
        parameters: {
            inletPressure: 62.8,
            outletPressure: 62.2,
            temperature: 14.5,
            flowRate: 6.7,
            power: 0,
            efficiency: 99.3,
        }
    },
    {
        id: 'gis_urgala',
        name: 'GIS Urgala',
        shortName: 'GIS Urgala',
        type: 'metering',
        position: { x: 250, y: 80 },
        status: 'normal',
        parameters: {
            inletPressure: 60.5,
            outletPressure: 60.0,
            temperature: 15.2,
            flowRate: 0.0,
            power: 0,
            efficiency: 99.4,
        }
    },
    {
        id: 'cs_urgala',
        name: 'CS Urgala',
        shortName: 'CS Urgala',
        type: 'compressor',
        position: { x: 200, y: 95 },
        status: 'normal',
        parameters: {
            inletPressure: 49.8,
            outletPressure: 71.2,
            temperature: 17.2,
            flowRate: 810.0,
            power: 14.2,
            efficiency: 83.9,
            compressorUnits: 3,
            activeUnits: 3,
        }
    },
    // Middle section - Central hub
    {
        id: 'gis_krasnogorsk',
        name: 'GIS Krasnogorsk',
        shortName: 'GIS Krasnogr.',
        type: 'metering',
        position: { x: 400, y: 120 },
        status: 'normal',
        parameters: {
            inletPressure: 58.2,
            outletPressure: 57.8,
            temperature: 17.0,
            flowRate: 0.0,
            power: 0,
            efficiency: 99.2,
        }
    },
    {
        id: 'cs_magnitogorsk',
        name: 'CS Magnitogorsk',
        shortName: 'CS Magnit.',
        type: 'compressor',
        position: { x: 340, y: 140 },
        status: 'normal',
        parameters: {
            inletPressure: 48.5,
            outletPressure: 70.8,
            temperature: 18.5,
            flowRate: 205.5,
            power: 13.8,
            efficiency: 82.5,
            compressorUnits: 4,
            activeUnits: 4,
        }
    },
    {
        id: 'gis_kartaly',
        name: 'GIS Kartaly',
        shortName: 'GIS Kartaly',
        type: 'metering',
        position: { x: 450, y: 140 },
        status: 'normal',
        parameters: {
            inletPressure: 55.8,
            outletPressure: 55.2,
            temperature: 17.8,
            flowRate: 205.5,
            power: 0,
            efficiency: 99.1,
        }
    },
    // Central junction
    {
        id: 'ica_central',
        name: 'ICA Central',
        shortName: 'ICA',
        type: 'junction',
        position: { x: 520, y: 155 },
        status: 'normal',
        parameters: {
            inletPressure: 52.5,
            outletPressure: 52.0,
            temperature: 18.2,
            flowRate: 11.3,
            power: 0,
            efficiency: 99.0,
        }
    },
    {
        id: 'gis_jalimbet',
        name: 'GIS Jalimbet',
        shortName: 'GIS Jalimbet',
        type: 'metering',
        position: { x: 580, y: 145 },
        status: 'normal',
        parameters: {
            inletPressure: 50.2,
            outletPressure: 49.8,
            temperature: 18.8,
            flowRate: 11.3,
            power: 0,
            efficiency: 99.2,
        }
    },
    // Southern branch - left side
    {
        id: 'gis_krasnoarm',
        name: 'GIS Krasnoarmeyskaya',
        shortName: 'GIS Krasnr.',
        type: 'metering',
        position: { x: 30, y: 180 },
        status: 'normal',
        parameters: {
            inletPressure: 48.5,
            outletPressure: 48.0,
            temperature: 19.2,
            flowRate: 5.0,
            power: 0,
            efficiency: 99.3,
        }
    },
    {
        id: 'gis_staleksandr',
        name: 'CS St.Aleksandrovka',
        shortName: 'CS St.Aleksandr.',
        type: 'compressor',
        position: { x: 180, y: 205 },
        status: 'normal',
        parameters: {
            inletPressure: 47.2,
            outletPressure: 68.5,
            temperature: 19.8,
            flowRate: 1294.8,
            power: 12.5,
            efficiency: 81.8,
            compressorUnits: 3,
            activeUnits: 2,
        }
    },
    {
        id: 'cs_buzulino',
        name: 'CS Buzulino',
        shortName: 'CS Buzulino',
        type: 'compressor',
        position: { x: 280, y: 205 },
        status: 'normal',
        parameters: {
            inletPressure: 46.5,
            outletPressure: 67.8,
            temperature: 20.2,
            flowRate: 827.4,
            power: 11.8,
            efficiency: 80.5,
            compressorUnits: 3,
            activeUnits: 3,
        }
    },
    // Orenburg branch
    {
        id: 'ppg_orenburg',
        name: 'PPG Orenburg',
        shortName: 'PPG Orenburg',
        type: 'junction',
        position: { x: 280, y: 175 },
        status: 'normal',
        parameters: {
            inletPressure: 45.8,
            outletPressure: 45.2,
            temperature: 20.8,
            flowRate: 0.0,
            power: 0,
            efficiency: 99.1,
        }
    },
    {
        id: 'grs_orenburg',
        name: 'GRS Orenburg',
        shortName: 'GRS Orenburg',
        type: 'distribution',
        position: { x: 350, y: 165 },
        status: 'normal',
        parameters: {
            inletPressure: 44.5,
            outletPressure: 12.0,
            temperature: 21.2,
            flowRate: 0.0,
            power: 0,
            efficiency: 98.5,
        }
    },
    // Central-South hub
    {
        id: 'cs_orenburgsk',
        name: 'CS Orenburgskaya',
        shortName: 'CS Orenbrg.',
        type: 'compressor',
        position: { x: 330, y: 210 },
        status: 'normal',
        parameters: {
            inletPressure: 43.2,
            outletPressure: 65.8,
            temperature: 21.8,
            flowRate: 0.0,
            power: 10.5,
            efficiency: 79.8,
            compressorUnits: 4,
            activeUnits: 3,
        }
    },
    {
        id: 'gis_saraktas',
        name: 'GIS Saraktash',
        shortName: 'GIS Saraktash',
        type: 'metering',
        position: { x: 400, y: 215 },
        status: 'normal',
        parameters: {
            inletPressure: 42.5,
            outletPressure: 42.0,
            temperature: 22.2,
            flowRate: 0.0,
            power: 0,
            efficiency: 99.0,
        }
    },
    // Eastern branch
    {
        id: 'cs_terensay',
        name: 'CS Terensay',
        shortName: 'CS Terensay',
        type: 'compressor',
        position: { x: 610, y: 185 },
        status: 'normal',
        parameters: {
            inletPressure: 41.8,
            outletPressure: 63.5,
            temperature: 22.8,
            flowRate: 456.2,
            power: 9.8,
            efficiency: 78.5,
            compressorUnits: 3,
            activeUnits: 2,
        }
    },
    {
        id: 'cs_dombarovka',
        name: 'CS Dombarovka',
        shortName: 'CS Dombrovka',
        type: 'compressor',
        position: { x: 530, y: 205 },
        status: 'normal',
        parameters: {
            inletPressure: 40.5,
            outletPressure: 62.2,
            temperature: 23.2,
            flowRate: 0.0,
            power: 8.5,
            efficiency: 77.2,
            compressorUnits: 3,
            activeUnits: 2,
        }
    },
    {
        id: 'gis_dombarovka',
        name: 'GIS Dombarovka',
        shortName: 'GIS Dombrvka',
        type: 'metering',
        position: { x: 475, y: 230 },
        status: 'normal',
        parameters: {
            inletPressure: 39.8,
            outletPressure: 39.2,
            temperature: 23.5,
            flowRate: 456.2,
            power: 0,
            efficiency: 98.8,
        }
    },
    {
        id: 'cs_mednogorsk',
        name: 'CS Mednogorsk',
        shortName: 'CS Medngrsk',
        type: 'compressor',
        position: { x: 430, y: 245 },
        status: 'normal',
        parameters: {
            inletPressure: 38.5,
            outletPressure: 60.8,
            temperature: 24.0,
            flowRate: 0.0,
            power: 7.8,
            efficiency: 76.5,
            compressorUnits: 2,
            activeUnits: 2,
        }
    },
    // Bottom row - Southern terminals
    {
        id: 'gis_alekseevka1',
        name: 'GIS-1 Alekseevskaya',
        shortName: 'GIS-1 Alekseev.',
        type: 'metering',
        position: { x: 230, y: 250 },
        status: 'normal',
        parameters: {
            inletPressure: 37.2,
            outletPressure: 36.8,
            temperature: 24.5,
            flowRate: 1294.8,
            power: 0,
            efficiency: 98.5,
        }
    },
    {
        id: 'gis_alekseevka2',
        name: 'GIS-2 Alekseevskaya',
        shortName: 'GIS-2 Alekseev.',
        type: 'metering',
        position: { x: 280, y: 270 },
        status: 'normal',
        parameters: {
            inletPressure: 36.5,
            outletPressure: 36.0,
            temperature: 25.0,
            flowRate: 0.0,
            power: 0,
            efficiency: 98.2,
        }
    },
    {
        id: 'cs_alekseevka',
        name: 'CS Alekseevskaya',
        shortName: 'CS Alekseev.',
        type: 'compressor',
        position: { x: 320, y: 280 },
        status: 'normal',
        parameters: {
            inletPressure: 35.8,
            outletPressure: 58.5,
            temperature: 25.5,
            flowRate: 0.0,
            power: 6.5,
            efficiency: 75.8,
            compressorUnits: 2,
            activeUnits: 2,
        }
    },
    // Far right - Output terminals
    {
        id: 'pptt_ufa',
        name: 'PPTT Ufa',
        shortName: 'PPTT Ufa',
        type: 'junction',
        position: { x: 700, y: 235 },
        status: 'normal',
        parameters: {
            inletPressure: 34.5,
            outletPressure: 34.0,
            temperature: 26.0,
            flowRate: 6685.6,
            power: 0,
            efficiency: 99.5,
        }
    },
    // Extra nodes for complexity
    {
        id: 'pptt_yugors',
        name: 'PPTT Yugorsk',
        shortName: 'PPTT Yugorsk',
        type: 'junction',
        position: { x: 380, y: 50 },
        status: 'normal',
        parameters: {
            inletPressure: 65.5,
            outletPressure: 65.0,
            temperature: 11.5,
            flowRate: 0.0,
            power: 0,
            efficiency: 99.6,
        }
    },
];

export const pipelines = [
    // Northern trunk line
    {
        id: 'pipe_surgut_bogat',
        name: 'Line 1',
        from: 'gis_surgut',
        to: 'cs_bogatinka',
        status: 'normal',
        parameters: {
            length: 95.5,
            diameter: 1420,
            wallThickness: 21.8,
            pressure: 72.0,
            temperature: 10.2,
            flowRate: 4485.0,
            velocity: 12.5,
            material: 'X70',
        }
    },
    {
        id: 'pipe_bogat_shatrov',
        name: 'Line 2',
        from: 'cs_bogatinka',
        to: 'cs_shatrovsk',
        status: 'normal',
        parameters: {
            length: 118.2,
            diameter: 1420,
            wallThickness: 21.8,
            pressure: 68.5,
            temperature: 13.1,
            flowRate: 544.5,
            velocity: 8.2,
            material: 'X70',
        }
    },
    {
        id: 'pipe_shatrov_sysert',
        name: 'Line 3',
        from: 'cs_shatrovsk',
        to: 'gis_sysert',
        status: 'normal',
        parameters: {
            length: 85.0,
            diameter: 1220,
            wallThickness: 18.5,
            pressure: 65.2,
            temperature: 14.5,
            flowRate: 138.0,
            velocity: 6.8,
            material: 'X70',
        }
    },
    {
        id: 'pipe_shatrov_dalmat',
        name: 'Line 4',
        from: 'cs_shatrovsk',
        to: 'cs_dalmatovo',
        status: 'normal',
        parameters: {
            length: 142.8,
            diameter: 1420,
            wallThickness: 21.8,
            pressure: 62.8,
            temperature: 15.8,
            flowRate: 138.0,
            velocity: 7.5,
            material: 'X70',
        }
    },
    {
        id: 'pipe_dalmat_ntura',
        name: 'Line 5',
        from: 'cs_dalmatovo',
        to: 'gis_ntura',
        status: 'normal',
        parameters: {
            length: 65.0,
            diameter: 1020,
            wallThickness: 16.0,
            pressure: 64.5,
            temperature: 11.2,
            flowRate: 1876.8,
            velocity: 9.2,
            material: 'X65',
        }
    },
    {
        id: 'pipe_dalmat_yugors',
        name: 'Line 6',
        from: 'cs_dalmatovo',
        to: 'pptt_yugors',
        status: 'normal',
        parameters: {
            length: 78.5,
            diameter: 1220,
            wallThickness: 18.5,
            pressure: 63.0,
            temperature: 14.0,
            flowRate: 0.0,
            velocity: 7.0,
            material: 'X70',
        }
    },
    // Central trunk
    {
        id: 'pipe_yugors_dolgoder',
        name: 'Line 7',
        from: 'pptt_yugors',
        to: 'gis_dolgodereven',
        status: 'normal',
        parameters: {
            length: 55.0,
            diameter: 1020,
            wallThickness: 16.0,
            pressure: 62.0,
            temperature: 15.5,
            flowRate: 6.7,
            velocity: 5.5,
            material: 'X65',
        }
    },
    {
        id: 'pipe_dolgoder_urgala',
        name: 'Line 8',
        from: 'gis_dolgodereven',
        to: 'gis_urgala',
        status: 'normal',
        parameters: {
            length: 95.5,
            diameter: 1020,
            wallThickness: 16.0,
            pressure: 60.5,
            temperature: 16.2,
            flowRate: 0.0,
            velocity: 4.8,
            material: 'X65',
        }
    },
    {
        id: 'pipe_urgala_csurgala',
        name: 'Line 9',
        from: 'gis_urgala',
        to: 'cs_urgala',
        status: 'normal',
        parameters: {
            length: 25.0,
            diameter: 820,
            wallThickness: 14.0,
            pressure: 58.5,
            temperature: 16.8,
            flowRate: 810.0,
            velocity: 6.2,
            material: 'X60',
        }
    },
    // Middle hub connections
    {
        id: 'pipe_urgala_magnit',
        name: 'Line 10',
        from: 'cs_urgala',
        to: 'cs_magnitogorsk',
        status: 'normal',
        parameters: {
            length: 145.0,
            diameter: 1220,
            wallThickness: 18.5,
            pressure: 55.8,
            temperature: 17.8,
            flowRate: 810.0,
            velocity: 7.5,
            material: 'X70',
        }
    },
    {
        id: 'pipe_magnit_krasnog',
        name: 'Line 11',
        from: 'cs_magnitogorsk',
        to: 'gis_krasnogorsk',
        status: 'normal',
        parameters: {
            length: 65.0,
            diameter: 1020,
            wallThickness: 16.0,
            pressure: 68.5,
            temperature: 18.2,
            flowRate: 0.0,
            velocity: 5.8,
            material: 'X65',
        }
    },
    {
        id: 'pipe_magnit_kartaly',
        name: 'Line 12',
        from: 'cs_magnitogorsk',
        to: 'gis_kartaly',
        status: 'normal',
        parameters: {
            length: 112.5,
            diameter: 1220,
            wallThickness: 18.5,
            pressure: 66.0,
            temperature: 18.5,
            flowRate: 205.5,
            velocity: 6.8,
            material: 'X70',
        }
    },
    {
        id: 'pipe_kartaly_ica',
        name: 'Line 13',
        from: 'gis_kartaly',
        to: 'ica_central',
        status: 'normal',
        parameters: {
            length: 72.0,
            diameter: 1020,
            wallThickness: 16.0,
            pressure: 54.5,
            temperature: 18.8,
            flowRate: 11.3,
            velocity: 5.2,
            material: 'X65',
        }
    },
    {
        id: 'pipe_ica_jalimbet',
        name: 'Line 14',
        from: 'ica_central',
        to: 'gis_jalimbet',
        status: 'normal',
        parameters: {
            length: 58.0,
            diameter: 820,
            wallThickness: 14.0,
            pressure: 51.0,
            temperature: 19.2,
            flowRate: 11.3,
            velocity: 4.8,
            material: 'X60',
        }
    },
    // Southern/Western branch
    {
        id: 'pipe_urgala_krasnoarm',
        name: 'Line 15',
        from: 'cs_urgala',
        to: 'gis_krasnoarm',
        status: 'normal',
        parameters: {
            length: 175.0,
            diameter: 820,
            wallThickness: 14.0,
            pressure: 48.0,
            temperature: 19.5,
            flowRate: 5.0,
            velocity: 4.2,
            material: 'X60',
        }
    },
    {
        id: 'pipe_krasnoarm_staleks',
        name: 'Line 16',
        from: 'gis_krasnoarm',
        to: 'gis_staleksandr',
        status: 'normal',
        parameters: {
            length: 155.0,
            diameter: 1020,
            wallThickness: 16.0,
            pressure: 46.5,
            temperature: 20.0,
            flowRate: 1294.8,
            velocity: 7.8,
            material: 'X65',
        }
    },
    {
        id: 'pipe_staleks_buzul',
        name: 'Line 17',
        from: 'gis_staleksandr',
        to: 'cs_buzulino',
        status: 'normal',
        parameters: {
            length: 98.5,
            diameter: 1220,
            wallThickness: 18.5,
            pressure: 65.0,
            temperature: 20.5,
            flowRate: 827.4,
            velocity: 6.2,
            material: 'X70',
        }
    },
    // Orenburg connections
    {
        id: 'pipe_buzul_ppgorenburg',
        name: 'Line 18',
        from: 'cs_buzulino',
        to: 'ppg_orenburg',
        status: 'normal',
        parameters: {
            length: 45.0,
            diameter: 1020,
            wallThickness: 16.0,
            pressure: 64.0,
            temperature: 21.0,
            flowRate: 0.0,
            velocity: 5.5,
            material: 'X65',
        }
    },
    {
        id: 'pipe_ppgorenburg_grs',
        name: 'Line 19',
        from: 'ppg_orenburg',
        to: 'grs_orenburg',
        status: 'normal',
        parameters: {
            length: 72.0,
            diameter: 820,
            wallThickness: 14.0,
            pressure: 44.0,
            temperature: 21.5,
            flowRate: 0.0,
            velocity: 3.8,
            material: 'X60',
        }
    },
    {
        id: 'pipe_grs_csorenburg',
        name: 'Line 20',
        from: 'grs_orenburg',
        to: 'cs_orenburgsk',
        status: 'normal',
        parameters: {
            length: 32.0,
            diameter: 720,
            wallThickness: 12.0,
            pressure: 42.5,
            temperature: 22.0,
            flowRate: 0.0,
            velocity: 3.2,
            material: 'X52',
        }
    },
    {
        id: 'pipe_csorenburg_saraktas',
        name: 'Line 21',
        from: 'cs_orenburgsk',
        to: 'gis_saraktas',
        status: 'normal',
        parameters: {
            length: 68.0,
            diameter: 820,
            wallThickness: 14.0,
            pressure: 63.0,
            temperature: 22.5,
            flowRate: 0.0,
            velocity: 4.5,
            material: 'X60',
        }
    },
    // Eastern hub
    {
        id: 'pipe_jalimbet_terensay',
        name: 'Line 22',
        from: 'gis_jalimbet',
        to: 'cs_terensay',
        status: 'normal',
        parameters: {
            length: 42.0,
            diameter: 1020,
            wallThickness: 16.0,
            pressure: 48.5,
            temperature: 23.0,
            flowRate: 456.2,
            velocity: 5.8,
            material: 'X65',
        }
    },
    {
        id: 'pipe_terensay_dombar_cs',
        name: 'Line 23',
        from: 'cs_terensay',
        to: 'cs_dombarovka',
        status: 'normal',
        parameters: {
            length: 85.0,
            diameter: 1020,
            wallThickness: 16.0,
            pressure: 60.0,
            temperature: 23.5,
            flowRate: 0.0,
            velocity: 4.8,
            material: 'X65',
        }
    },
    {
        id: 'pipe_dombar_cs_gis',
        name: 'Line 24',
        from: 'cs_dombarovka',
        to: 'gis_dombarovka',
        status: 'normal',
        parameters: {
            length: 58.0,
            diameter: 820,
            wallThickness: 14.0,
            pressure: 58.5,
            temperature: 24.0,
            flowRate: 456.2,
            velocity: 5.2,
            material: 'X60',
        }
    },
    {
        id: 'pipe_gisdombar_mednog',
        name: 'Line 25',
        from: 'gis_dombarovka',
        to: 'cs_mednogorsk',
        status: 'normal',
        parameters: {
            length: 48.0,
            diameter: 720,
            wallThickness: 12.0,
            pressure: 38.0,
            temperature: 24.5,
            flowRate: 0.0,
            velocity: 4.0,
            material: 'X52',
        }
    },
    // Bottom connections
    {
        id: 'pipe_staleks_alekseev1',
        name: 'Line 26',
        from: 'gis_staleksandr',
        to: 'gis_alekseevka1',
        status: 'normal',
        parameters: {
            length: 55.0,
            diameter: 1020,
            wallThickness: 16.0,
            pressure: 45.5,
            temperature: 25.0,
            flowRate: 1294.8,
            velocity: 6.5,
            material: 'X65',
        }
    },
    {
        id: 'pipe_alekseev1_alekseev2',
        name: 'Line 27',
        from: 'gis_alekseevka1',
        to: 'gis_alekseevka2',
        status: 'normal',
        parameters: {
            length: 32.0,
            diameter: 820,
            wallThickness: 14.0,
            pressure: 36.0,
            temperature: 25.5,
            flowRate: 0.0,
            velocity: 3.5,
            material: 'X60',
        }
    },
    {
        id: 'pipe_alekseev2_csaleks',
        name: 'Line 28',
        from: 'gis_alekseevka2',
        to: 'cs_alekseevka',
        status: 'normal',
        parameters: {
            length: 42.0,
            diameter: 720,
            wallThickness: 12.0,
            pressure: 35.5,
            temperature: 26.0,
            flowRate: 0.0,
            velocity: 3.0,
            material: 'X52',
        }
    },
    // Terminal connections
    {
        id: 'pipe_terensay_ufa',
        name: 'Line 29',
        from: 'cs_terensay',
        to: 'pptt_ufa',
        status: 'normal',
        parameters: {
            length: 92.0,
            diameter: 1420,
            wallThickness: 21.8,
            pressure: 58.0,
            temperature: 26.5,
            flowRate: 6685.6,
            velocity: 10.2,
            material: 'X70',
        }
    },
];

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
    totalLength: 2156.5,
    totalFlowRate: 6685.6,
    totalPower: 178.4,
    stationsCount: 30,
    pipelinesCount: 29,
    avgPressure: 52.8,
    avgTemperature: 19.5,
    deliveryToConsumers: 6685.6,
    gasFromPKG: 910.0,
    injectionToPKG: 0.0,
    gasStorageChange: -1405.0,
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
