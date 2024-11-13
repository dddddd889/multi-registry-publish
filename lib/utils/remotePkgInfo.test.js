const remotePkgInfo = require('./remotePkgInfo');

async function test() {
	try {
		await remotePkgInfo('http://registry1.yhding.com:4873', 'lib2')
		// no such package available true
	} catch (error) {
		console.log(error)	
	}

	res = await remotePkgInfo('http://registry1.yhding.com:4873', 'lib1')
	console.log(Object.keys(res?.versions || {}))
	// [ '1.0.0' ]
}
test();
