const multer = require('multer');

const store = multer({ storage: multer.memoryStorage() });
module.exports = store;
