const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv')
const user = require('./routes/user')
const auth = require('./routes/auth')
const cart = require('./routes/cart');
const product = require('./routes/product');
const order = require('./routes/order')
const cors = require('cors')

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
app.use('/user', user)
app.use('/auth', auth)
app.use('/cart', cart)
app.use('/product', product);
app.use('/order', order)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.error('Unconnected to DB', err))

