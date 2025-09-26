const router = require('express').Router()
const accountModel = require('./accounts-model')
const mw  = require('./accounts-middleware')  

router.get('/',  async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const accounts = await accountModel.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', mw.checkAccountId, (req, res, next) => {
  // KODLAR BURAYA
  try {
    res.json(req.Account);
  } catch (error) {
    next(error);
  }

});

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const newAccount = { name: req.body.name.trim(), budget: req.body.budget };
    const createdAccount = await accountModel.create(newAccount);
    res.status(201).json(createdAccount);
  } catch (error) {
    next(error);
  }
});   

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, mw.checkAccountNameUnique, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let updatedAccount = { name: req.body.name.trim(), budget: req.body.budget };
    const account = await accountModel.updateById(req.params.id, updatedAccount);
    res.json(account);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountModel.deleteById(req.params.id);
    res.json(`${req.account.name} isimli kayıt silindi`);
  } catch (error) {
    next(error);
  }
}); 

router.use((err, req, res, next) => { // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
})

module.exports = router;
