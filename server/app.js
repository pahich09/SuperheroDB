const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const mainRoute = require('./routes/mainRouter')

const app = express();

app.use(express.json());
app.use('/api', mainRoute);

const PORT = config.get('port') || 5000;

(async function startApp() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();


