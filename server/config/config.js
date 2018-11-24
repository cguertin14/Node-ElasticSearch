const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
	process.env.URL = 'https://<NAME_OF_APP_HERE>.herokuapp.com';
} else if (env === 'development') {
	process.env.URL = 'http://localhost:3000';
}