const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  try {
    const token = req.header('x-auth-token');

    if (!token) {
      throw new Error(' No Token Found');
    }

    const decoded = jwt.verify(token, config.get('secretKey'), (error, data) => {
      if (error) throw error;

      req.user = data.user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }
};
