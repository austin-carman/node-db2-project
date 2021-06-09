const db = require('../../data/db-config');


const getAll = () => {
  return db('cars');
}

const getById = async (id) => {
  const result = await db('cars').where('id', id).first();
  return result;
}

const create = async (car) => {
  const [id] = await db('cars').insert(car);
  return getById(id); // see GP. Why don't you have to await here?
}

const getByVin = async (vin) => {
  const car = await db('cars').where('vin', vin).first();
  
  return car;
}

module.exports = {
  getAll,
  getById,
  create, 
  getByVin
};