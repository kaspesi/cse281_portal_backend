const bcrypt = require('bcryptjs');
const client = require('../database/client');

const postInvestigatorRegister = async (request, response) => {
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
	console.log(hashedPassword+ " " + name);

	try {
		await client.query('insert into investigator(name, email, password) values($1, $2, $3)', [name, email, hashedPassword]);
	} catch (error) {
		return response.json({ success: false, errorMessage: error});
	}

	console.log('PASSED REGISTER VALIDATION');
	response.json({ success: true });
};

const getInvestigatorRegister = (request, response) => {
	response.json({ message: 'REGISTER GET' });
};

module.exports = {
	postInvestigatorRegister,
	getInvestigatorRegister
};