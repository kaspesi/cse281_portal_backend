// hotel_id,hotel_name,chain_id,latitude,longitude
const client = require('../database/client');
const csv = require('csv-parser');
const fs = require('fs');

const csvFile = 'public/hotel_info.csv'
const postMap = async (request, response) => {
	
	try{
		// await client.query('insert into investigator(name, email, password) values($1, $2, $3)', [name, email, hashedPassword]);

		fs.createReadStream(csvFile)
			.pipe(csv())
			.on('data', (row) => {
				hotel_id = row.hotel_id
				console.log(hotel_id)
				hotel_name = row.hotel_name
				chain_id = row.chain_id
				latitude = row.latitude
				longitude = row.longitude
				client.query('insert into hotels(hotel_id, hotel_name, chain_id, latitude, longitude) values($1, $2, $3, $4, $5)', [hotel_id, hotel_name, chain_id, latitude, longitude])
			}).on('end', () => {
				console.log('Completed parsing CSV file')
			})

		return response.json({ success: true});
	}
	catch (error) {
		//console.log(error)
		return response.json({ success: false, errorMessage: error });
	}


};

module.exports = {
	postMap
};