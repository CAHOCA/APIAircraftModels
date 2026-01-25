const fs = require('fs');
const path = require('path');

// Leer el archivo de aeronaves
const aircraftPath = path.join(__dirname, 'AircraftModels.json');
const aircraft = JSON.parse(fs.readFileSync(aircraftPath, 'utf8'));

// Filtrar aeronaves sin Engine_ID
const withoutEngine = aircraft.filter(plane => !plane.Engine_ID);
const withEngine = aircraft.filter(plane => plane.Engine_ID);

console.log(`\n========================================`);
console.log(`📊 REPORTE DE MOTORES`);
console.log(`========================================\n`);

console.log(`✅ Aeronaves CON motor asignado: ${withEngine.length}`);
console.log(`❌ Aeronaves SIN motor asignado: ${withoutEngine.length}`);
console.log(`📈 Total de aeronaves: ${aircraft.length}\n`);

if (withoutEngine.length > 0) {
    console.log(`\n========================================`);
    console.log(`❌ AERONAVES SIN MOTOR (${withoutEngine.length}):`);
    console.log(`========================================\n`);
    
    withoutEngine.forEach((plane, index) => {
        console.log(`${index + 1}. ${plane.Model} (${plane.Manufacturer}) - ICAO: ${plane.ICAO_Code}`);
    });
    
    console.log(`\n========================================`);
    console.log(`📝 LISTA PARA SCRIPT DE MAPEO:`);
    console.log(`========================================\n`);
    
    withoutEngine.forEach((plane) => {
        console.log(`    '${plane.Model}': 'ENG???', // ${plane.Manufacturer} - ${plane.Engine_Type}`);
    });
}

console.log(`\n========================================\n`);
