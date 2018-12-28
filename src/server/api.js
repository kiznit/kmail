import { Router } from 'express';

const router = new Router();

// TODO: implement API endpoints here
router.get('/test', (req, res) => res.status(200).send('Succesfull test!').end());

export default router;
