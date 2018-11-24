import _ from 'lodash';
import BaseController from './baseController';
import { client } from '../../db/elastic';

export default class ElasticController extends BaseController {
	async testing() {
		const response = await client.search({
			q: 'pants'
		});
		return this.res.json({
			data: response.hits.hits
		});
	}
}