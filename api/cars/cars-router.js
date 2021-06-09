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

router.get('/:id', checkCarId, (req, res, next) => {
    res.status(200).json(req.car);
})

router.post(
    '/', 
    checkCarPayload, 
    checkVinNumberValid, 
    checkVinNumberUnique, 
    (req, res, next) => {
        Cars.create(req.body)
            .then(newCar => {
                res.status(201).json(newCar)
            })
            .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      custom: 'something in the app blew up',
      message: err.message,
      stack: err.stack
    });
})


module.exports = router;