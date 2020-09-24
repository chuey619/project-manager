const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usersController = {};

usersController.create = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.user.password, salt);
    let user = new User({
      username: req.body.user.username,
      name: req.body.user.name,
      password_digest: hash,
    });
    user = await user.save();
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json({
        message: 'User created',
        auth: true,
        data: {
          user,
        },
      });
    });
  } catch {
    next();
  }
};

module.exports = usersController;
