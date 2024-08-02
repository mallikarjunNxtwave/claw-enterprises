const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRouts');
const bodyParser = require('body-parser');

const PORT = 5001;

const app = express();

app.use(cors());

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDb connected Successfully'))
.catch((error) => console.log(error));

app.use(bodyParser.json());
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});

