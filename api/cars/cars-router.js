const router = require('express').Router();
const Cars = require('./cars-model');
const { 
    checkCarId, 
    checkCarPayload, 
    checkVinNumberUnique, 
    checkVinNumberValid 
} = require('./cars-middleware');


router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(next)
})


module.exports = router;