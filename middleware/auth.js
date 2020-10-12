const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {
    if(request.headers.authorization == undefined) {
        console.log("No or Invalid Token")
        console.log(request.headers)
        return response.json({ success: false, errorMessage: 'NO TOKEN' });
    }
	let givenToken = request.headers.authorization.split(' ')[1];

	console.log(givenToken);
	console.log(typeof givenToken);
	console.log('token is', JSON.stringify(givenToken));

	if (!givenToken) {
		return response.json({ success: false, errorMessage: 'NO TOKEN' });
	}

	let verifiedToken;
	try {
		verifiedToken = jwt.verify(givenToken, 'longer-secret-is-better-abcegfhijjlmnop');
	} catch (error) {
		return response.json({ success: false, errorMessage: 'PROBLEM VERIFYING TOKEN' });
	}

	if (!verifiedToken) {
		return response.json({ success: false, errorMessage: 'BAD TOKEN' });
	}

	console.log(verifiedToken);
	console.log(verifiedToken.email);

	request = verifiedToken;

	next();
};

module.exports = auth;