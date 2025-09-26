const db = require('../../data/db-config');
const { get } = require('./accounts-router');



const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where('id', id).first();
}

const getByName = name => {
  return db('accounts').where('name', name).first();
} 

const create = account => {
  const inserted = db('accounts')
  .insert(account)
  .then (ids => {
    return getById(ids[0]);
  });
  return inserted;
};

const updateById = (id, account) => {
  return db('accounts').where('id', id).update(account).then ((id) => {
    return getById(id);
  });
}

const deleteById = id => {
  return db('accounts').where('id', id).del();
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
