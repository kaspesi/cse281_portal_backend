
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const client = require('../database/client');

const postInvestigatorLogin = async (request, response) => {
	const { email, password } = request.body;

	const feedback = await client.query('select * from investigator where investigator.email = $1', [ email ]);

	if (!feedback.rows.length) {
		return response.json({ success: false, errorMessage: '404: email not found' });
	}
	console.log(password)

	try{
		let pass = Buffer.from(feedback.rows[0].password, 'binary').toString();
		console.log(pass)
		const valid = await bcrypt.compare(password, pass);
		if (!valid) {
			return response.json({ success: false, errorMessage: '400: incorrect password' });
		}
		console.log(valid)
		console.log(feedback.rows[0].password)

		const jwtToken = sign(
			{
				email
			},
			'longer-secret-is-better-abcegfhijjlmnop'
		);
		return response.json({ success: true, jwtToken });

	} catch(error) {
		console.log(error)
		return response.json({ success: false, errorMessage: '400: incorrect password' });
	}

	

	
};

module.exports = {
	postInvestigatorLogin
};