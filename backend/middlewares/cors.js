const corsList = ['http://example1.com',
  'https://example.com',
  'http://localhost:3000',
  'https://localhost:3000'];

const corsOptions = {
  origin(origin, callback) {
    if (corsList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = corsOptions;
