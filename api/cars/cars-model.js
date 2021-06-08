const db = require('../../data/db-config');


const getAll = () => {
  return db('cars');
}

const getById = (id) => {
  return db('cars').where('id', id)
}

const create = () => {
  
}

module.exports = {
  getAll,
  getById,
  create
};