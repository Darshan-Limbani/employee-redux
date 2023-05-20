const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


mongoose.connect(DB)
    .then(() =>
    console.log('---------------------- DB Connection Successful! ----------------------'))
    .catch(err => {
    console.log(err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on PORT : ${PORT}`);
});