const client = require('../database/client');
const request = require('request-promise');
const fs = require('fs')

const investigateImage = async (req, response) => {
	let resArray = {}
	try {
		const feedback = await client.query('select * from config where key = $1', ['url']);
		const awsUrl = feedback.rows[0].value;
		console.log(`Querying Model at: ${feedback.rows[0].value}`)
		console.log(req.files)

		res = []
		req.files.forEach(element => {
			console.log(element)
			resArray['image'] = element.originalname;
			resArray['localName'] = element.filename
			
			fileName = element.filename
			const options = {
				method: "POST",
				url: awsUrl,
				headers: {
					"Content-Type": "multipart/form-data"
				},
				formData : {
					"image" : fs.createReadStream(`./images/${fileName}`)
				}
			};
			
			request(options).then( body =>  {
				body = JSON.parse(body)
				console.log(typeof(body))
				hotel_id = body.predictions[0].predicted_label
				console.log(hotel_id)
				client.query('select * from hotels where hotels.hotel_id = $1', [ hotel_id ]).then(result => {
					console.log(`Querying Model at: ${typeof(result)}`)
					//console.log(result)
					console.log(result.rows[0])
					let res_query = {'hotel_name':result.rows[0].hotel_name, 'latitude':result.rows[0].latitude, 'longitude': result.rows[0].longitude}
					console.log(res_query)
					return response.json({ success: true, results: res_query});
				})
			}).catch( e => {
				console.log(e)
			})
	
			// console.log(res)
			// return response.json({ success: true, results: res });

		});



	} catch(e){
		console.log(e)
		return response.json({ success: false, errorMessage: e });
	}


	// console.log(resArray)
	// return response.json(resArray);
	
};

module.exports = {
	investigateImage
};