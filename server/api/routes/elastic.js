import ElasticController from '../controllers/elasticController';
import express from 'express';
import { catchAsyncErrors } from '../exceptions/routeErrorHandler';
const router = express.Router();

router.get('/testing', catchAsyncErrors(async (req, res) => {
	await new ElasticController(req, res).testing();
}));

export default router;