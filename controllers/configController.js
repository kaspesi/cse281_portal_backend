
const client = require('../database/client');
const postUrl = async (request, response) => {
	
	try{
		const {url} = request.body;
		const urlKey = 'url'
		const oldUrl = await client.query('select * from config where key = $1', [urlKey]);
		if (oldUrl.rows.length == 0) {
			await client.query('insert into config(key, value) values($1, $2)', ['url', url]);
			return response.json({ success: true, message: `Added url: ${url}`});
		} else {
			await client.query(`update config SET value = $1 WHERE key =$2`, [url, 'url']);
			return response.json({ success: true, message: `Updated url to: ${url}`});
		}
	}
	catch (error) {
		console.log(error)
		return response.json({ success: false, errorMessage: error });
	}

	//console.log(oldUrl);

};

module.exports = {
	postUrl
};