const Cars = require('./cars-model');
const vinValidator = require('vin-validator');



const checkCarId = async (req, res, next) => {
  Cars.getById(req.params.id)
    .then(car => {
      if (!car) {
        next({
          status: 404,
          message: `car with id ${req.params.id} is not found`
        })
      } else {
        req.car = car;
        next()
      }
    })
    .catch(next)
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  const error = { status: 400 }
  if(vin == undefined) {
    error.message = 'vin is missing'
    next(error)
  } else if (make == undefined) {
    error.message = 'make is missing'
    next(error)
  } else if (model == undefined) {
    error.message = 'model is missing'
    next(error)
  } else if (mileage == undefined ) {
    error.message = 'mileage is missing'
    next(error)
  }
  if(error.message) {
    next(error)
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);
  if (!isValidVin) {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  Cars.getByVin(req.body.vin)
    .then(car => {
      if (car) {
        next({
          status: 400, 
          message: `vin ${req.body.vin} already exists`
        });
      } else {
        next()
      }
    })
    .catch(next);
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
};
