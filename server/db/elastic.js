import elastic from 'elasticsearch';

export const client = new elastic.Client({
  host: process.env.ELASTICSEARCH_URI
});

if (process.env.NODE_ENV !== 'production') {
  client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is... down!');
    } else {
      console.log('elasticsearch cluster is... up!');
    }
  });
}
