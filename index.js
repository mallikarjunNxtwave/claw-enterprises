const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 5001;

const app = express();

app.use(cors());

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDb connected Successfully'))
.catch((error) => console.log(error));

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});

