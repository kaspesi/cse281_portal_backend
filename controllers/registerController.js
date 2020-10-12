const bcrypt = require('bcryptjs');
const client = require('../database/client');

const postRegister = async (request, response) => {
	const { email, password, name} = request.body;
	console.log('request body', name, email, password);
	try {

		const feedback = await client.query('select * from investigator where investigator.email = $1', [ email ]);
		console.log(feedback.rows);

		if (feedback.rows.length) {
			return response.json({ success: false, errorMessage: 'EMAIL ALREADY EXISTS' });
		}
	} catch (error) {
		console.log(error)
		return response.json({ success: false, errorMessage: 'FAILED TO QUERY FIND DATABASE' });
	}

	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		await client.query('insert into investigator(email, password, name) values($1, $2, $3)', [ email, hashedPassword, name]);
	} catch (error) {
		return response.json({ success: false, errorMessage: 'FAILED TO QUERY INSERT DATABASE' });
	}

	console.log('PASSED REGISTER VALIDATION');
	response.json({ success: true });
};

const getRegister = (request, response) => {
	response.json({ message: 'REGISTER GET' });
};

module.exports = {
	postRegister,
	getRegister
};