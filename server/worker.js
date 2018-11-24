import './db/elastic';
import kue from 'kue';
import _ from 'lodash';
import StripeHelper from './config/payments/StripeHelper';
import SmsHandler from './config/sms/SmsHandler';

const jobs = kue.createQueue({
	redis: process.env.REDISCLOUD_URL || 'redis://redis:6379'
});

jobs.process('stripe charge', async function (job, done) {
	const { price, stripe_customer_id, card, description } = job.data;
	const stripe = new StripeHelper(stripe_customer_id);
	await stripe.createCharge({ amount: price, source: card, description });
	done();
});

jobs.process('sms', function (job, done) {
	const { message, to } = job.data;
	const smsHandler = new SmsHandler();
	smsHandler.send(message).to(to);
	done();
});