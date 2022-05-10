import express from 'express';

import { alexaApp } from './routes/alexaRoute';

const app = express();
const port = 3333;

app.use('/alexa', alexaApp);




app.listen(port, () => {
    console.log('Server is running')
});


