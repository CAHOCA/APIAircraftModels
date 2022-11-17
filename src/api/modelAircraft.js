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

router.post('/',(req,res)=>{
    const {IATA_Code, Model, usr, pass} = req.body;
    if(IATA_Code && Model && usr && pass){
        if(usr=="Cahoca08"&&pass=="25e$bhy77HGN!25/*-"){
            const id = data.length + 1;
            delete req.body.usr;
            delete req.body.pass;
            const newAircraft = {...req.body};
            data.push(newAircraft);
            res.json({newAircraft,id});
        }
        else{
            res.status(403).json({ "error": "Incorrect username | password."});
        }
    }
    else{
        res.status(400).json({ "error": "There was an error. Incomplete request data" });
    }
})

module.exports = router;