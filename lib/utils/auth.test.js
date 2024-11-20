const whoami2 = require('./whoami');
const logger = require('./logger');

async function test() {
	logger.info('Starting up');
	await whoami2('http://localhost:4877')
	await whoami2('http://localhost:4878')
	logger.info('Starting end');
}

test()