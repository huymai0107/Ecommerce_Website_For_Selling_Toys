const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv')
const user = require('./routes/user')
const auth = require('./routes/auth')

dotenv.config();

const app = express();
app.use(express.json());
app.use('/user', user)
app.use('/auth', auth)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.error('Unconnected to DB', err))

