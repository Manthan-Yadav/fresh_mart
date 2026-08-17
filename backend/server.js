const app = require('./src/app');
const connectDB = require('./src/db/db');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


