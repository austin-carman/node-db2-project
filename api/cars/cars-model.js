const db = require('../../data/db-config');


const getAll = () => {
  return db('cars');
}

const getById = (id) => {
  return db('cars').where('id', )
}

const create = () => {
  
}

module.exports = {
  getAll,
  getById,
  create
};