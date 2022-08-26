import express from 'express';
require('dotenv').config();

import { alexaApp } from './routes/alexaRoute';

const app = express();
const port = process.env.PORT || 3333;

app.use('/alexa', alexaApp);




app.listen(port, () => {
    console.log('Server is running')
});


