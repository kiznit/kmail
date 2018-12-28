import { Router } from 'express';

const app = new Router();

// TODO: implement API endpoints here
app.get('/test', (req, res) => res.status(200).send('Succesfull test!').end());

export default app;
