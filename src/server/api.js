import { Router } from 'express';

const api = new Router();

// TODO: implement API endpoints here
api.get('/test', (req, res) => res.status(200).send('Succesfull test!').end());

export default api;
