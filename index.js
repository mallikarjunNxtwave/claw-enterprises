const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRouts');
const todoRoutes = require('./routes/todoRouts');
const bodyParser = require('body-parser');

const PORT = 5001;

const app = express();

app.use(express.json())

app.use(cors());

dotEnv.config();

const db = mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDb connected Successfully'))
.catch((error) => console.log(error));

app.use(bodyParser.json());

app.use('/', userRoutes);

app.use('/', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});

module.exports = db;