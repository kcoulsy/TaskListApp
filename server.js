const express = require('express');
const bodyParser = require('body-parser');

const { mongooose } = require('./db/mongoose');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use(require('./Routes/routes'));

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Console running on port ${PORT}`);
  /* eslint-enable no-console */
});


module.exports = { app };
