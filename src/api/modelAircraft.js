/**
 * Aircraft Model API Router
 * Provides endpoints for retrieving and filtering aircraft model data
 * @module modelAircraft
 */

/**
 * GET /
 * Retrieves all aircraft models from the database with engine details
 * @route GET /
 * @returns {Object[]} Array of all aircraft models with complete engine information
 */

/**
 * GET /:id
 * Retrieves aircraft models by IATA code with engine details
 * @route GET /:id
 * @param {string} id - IATA code of the aircraft
 * @returns {Object[]} Array of aircraft models matching the IATA code with engine information
 */

/**
 * POST /filter/ceiling
 * Filters aircraft models based on service ceiling criteria
 * @route POST /filter/ceiling
 * @param {Object} req.body - Filter parameters
 * @param {string} req.body.operator - Comparison operator ('gt', 'lt', 'gte', 'lte', 'eq')
 * @param {number} req.body.value - Value to compare against (used with operator)
 * @param {number} req.body.min - Minimum service ceiling value (used for range filtering)
 * @param {number} req.body.max - Maximum service ceiling value (used for range filtering)
 * @returns {Object[]} Array of filtered aircraft models with engine information
 * @description Supports two filtering modes:
 * 1. Operator-based: Uses operator and value parameters
 *    - 'gt': Greater than - Returns aircraft with ceiling above the specified value
 *    - 'lt': Less than - Returns aircraft with ceiling below the specified value
 *    - 'gte': Greater than or equal - Returns aircraft with ceiling at or above the specified value
 *    - 'lte': Less than or equal - Returns aircraft with ceiling at or below the specified value
 *    - 'eq': Equal - Returns aircraft with ceiling exactly matching the specified value
 * 2. Range-based: Uses min and max parameters to filter aircraft within a ceiling range (inclusive)
 */
const { Router } = require('express');
const router = Router();
const aircraftData = require('./db/AircraftModels.json');
const enginesData = require('./db/Engines.json');

/**
 * Helper function to join aircraft with engine data
 * @param {Object} aircraft - Aircraft object
 * @returns {Object} Aircraft object with complete engine information
 */
function joinWithEngine(aircraft) {
    if (!aircraft.Engine_ID) {
        return aircraft;
    }
    
    const engine = enginesData.find(eng => eng.Engine_ID === aircraft.Engine_ID);
    
    if (engine) {
        const { Engine_ID, ...restAircraft } = aircraft;
        return {
            ...restAircraft,
            Engine: {
                ID: engine.Engine_ID,
                Name: engine.Name,
                Type: engine.Type,
                Manufacturer: engine.Manufacturer,
                Takeoff_Thrust_lbf: engine.Takeoff_Thrust_lbf,
                Max_Power_HP: engine.Max_Power_HP,
                Weight_lb: engine.Weight_lb,
                Dimensions: {
                    Length_in: engine.Length_in,
                    Diameter_in: engine.Diameter_in
                },
                Max_RPM: engine.Max_RPM,
                Bypass_Ratio: engine.Bypass_Ratio,
                Variants: engine.Variants
            }
        };
    }
    
    return aircraft;
}

//Raiz
router.get('/', (req, res) => { 
    const result = aircraftData.map(aircraft => joinWithEngine(aircraft));
    res.json(result);
});

router.get('/:id', (req,res)=>{
    const { id } = req.params;
    const filtered = aircraftData.filter(val => val.IATA_Code == id);
    const result = filtered.map(aircraft => joinWithEngine(aircraft));
    res.json(result);
})

router.post('/filter/ceiling', (req, res) => {
    const { operator, value, min, max } = req.body;
    
    // Validación de tipos de datos
    if (operator && value !== undefined) {
        if (typeof value !== 'number' || isNaN(value)) {
            return res.status(400).json({ error: 'Value must be a valid number' });
        }
    }
    
    if (min !== undefined || max !== undefined) {
        if ((min !== undefined && (typeof min !== 'number' || isNaN(min))) ||
            (max !== undefined && (typeof max !== 'number' || isNaN(max)))) {
            return res.status(400).json({ error: 'Min and max must be valid numbers' });
        }
    }
    
    let filtered = aircraftData;
    
    if (operator && value !== undefined) {
        switch(operator) {
            case 'gt':
                filtered = aircraftData.filter(aircraft => aircraft.Service_Ceiling_ft > value);
                break;
            case 'lt':
                filtered = aircraftData.filter(aircraft => aircraft.Service_Ceiling_ft < value);
                break;
            case 'gte':
                filtered = aircraftData.filter(aircraft => aircraft.Service_Ceiling_ft >= value);
                break;
            case 'lte':
                filtered = aircraftData.filter(aircraft => aircraft.Service_Ceiling_ft <= value);
                break;
            case 'eq':
                filtered = aircraftData.filter(aircraft => aircraft.Service_Ceiling_ft == value);
                break;
            default:
                return res.status(400).json({ error: 'Invalid operator. Use: gt, lt, gte, lte, eq' });
        }
    } else if (min !== undefined && max !== undefined) {
        filtered = aircraftData.filter(aircraft => 
            aircraft.Service_Ceiling_ft >= min && aircraft.Service_Ceiling_ft <= max
        );
    } else {
        return res.status(400).json({ error: 'Provide either (operator and value) or (min and max)' });
    }
    
    const result = filtered.map(aircraft => joinWithEngine(aircraft));
    res.json(result);
});

module.exports = router;