/**
 * Aircraft Model API Router
 * Provides endpoints for retrieving and filtering aircraft model data
 * @module modelAircraft
 */

/**
 * GET /
 * Retrieves all aircraft models from the database
 * @route GET /
 * @returns {Object[]} Array of all aircraft models
 */

/**
 * GET /:id
 * Retrieves aircraft models by IATA code
 * @route GET /:id
 * @param {string} id - IATA code of the aircraft
 * @returns {Object[]} Array of aircraft models matching the IATA code
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
 * @returns {Object[]} Array of filtered aircraft models
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
const data = require('./db/AircraftModels.json')

//Raiz
router.get('/', (req, res) => { 
    res.json(data);
});

router.get('/:id', (req,res)=>{
    const { id } = req.params;
    res.json(data.filter(val=>{return val.IATA_Code==id;}));
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
    
    let filtered = data;
    
    if (operator && value !== undefined) {
        switch(operator) {
            case 'gt':
                filtered = data.filter(aircraft => aircraft.Service_Ceiling_ft > value);
                break;
            case 'lt':
                filtered = data.filter(aircraft => aircraft.Service_Ceiling_ft < value);
                break;
            case 'gte':
                filtered = data.filter(aircraft => aircraft.Service_Ceiling_ft >= value);
                break;
            case 'lte':
                filtered = data.filter(aircraft => aircraft.Service_Ceiling_ft <= value);
                break;
            case 'eq':
                filtered = data.filter(aircraft => aircraft.Service_Ceiling_ft == value);
                break;
            default:
                return res.status(400).json({ error: 'Invalid operator. Use: gt, lt, gte, lte, eq' });
        }
    } else if (min !== undefined && max !== undefined) {
        filtered = data.filter(aircraft => 
            aircraft.Service_Ceiling_ft >= min && aircraft.Service_Ceiling_ft <= max
        );
    } else {
        return res.status(400).json({ error: 'Provide either (operator and value) or (min and max)' });
    }
    
    res.json(filtered);
});

module.exports = router;