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

module.exports = router;