const client = require('../database/client');

const investigateImage = async (request, response) => {

	request.files.forEach(element => {
		console.log(element)
	});

	return response.json();
	
};

module.exports = {
	investigateImage
};