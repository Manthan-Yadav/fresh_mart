const express = require('express');
const cors = require('cors');
const app = express();

const categoryRoutes = require('./routers/categories.routes');
const productRoutes = require('./routers/product.routes');
const contactRoutes = require('./routers/contactMessages.routes');

app.use(cors());
app.use(express.json());
app.use('/api', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/contact' , contactRoutes);


module.exports = app;