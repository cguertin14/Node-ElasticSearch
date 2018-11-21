const mongoose = require('mongoose');
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(process.env.REDISCLOUD_URL || 'redis://redis:6379');
client.select(1, () => {});
client.get = promisify(client.get);
const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (this.useCache) {
        const key = JSON.stringify(
            Object.assign({}, this.getQuery(), {
                collection: this.mongooseCollection.name
            })
        );

        const cacheValue = await client.get(key);
        if (cacheValue) {
            const doc = JSON.parse(cacheValue);

            return Array.isArray(doc)
                ? doc.map(d => new this.model(d))
                : new this.model(doc);
        }

        const result = await exec.apply(this, arguments);
        client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);
        return result;
    }

    return exec.apply(this, arguments);
}

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
};