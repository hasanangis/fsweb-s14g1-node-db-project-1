const accountsModel = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  try {
    const { name, budget } = req.body;
    if (name === undefined || budget === undefined) {
      res.status(400).json({ message: "name and budget are required" });
    } else {
      req.body.name = req.body.name.trim();
      if (req.body.name.length < 3 || req.body.name.length > 100) {
       res.status(400).json({ message: "name of account must be between 3 and 100" });
      } else if (typeof budget !== 'number') {
       res.status(400).json({ message: "budget of account must be a number" });
      } else if (budget < 0 || budget > 1000000) {
       res.status(400).json({ message: "budget of account is too large or too small" });
      } else {
       next();
    }
  }
} catch (error) {
  res.status(400).json({ message: error.message });
}
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    if(req.body || !req.body.name) {
      req.body.name = req.body.name.trim();
    }
      const isExistName = await accountsModel.getByName(req.body.name);
      if(isExistName) {
        res.status(400).json({ message: "that name is taken" });
      } else {
        next();
      }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    let isExist  = await accountsModel.getById(req.params.id);
    if (!isExist) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.Account = isExist;
      next();
    }
  } catch (error) {
    next(error) ;
  }
}
