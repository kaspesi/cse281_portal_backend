var express = require('express');
var app = express();
const cors = require('cors');
const client = require('./database/client');
const auth = require("./middleware/auth");
//const tf = require('@tensorflow/tfjs-node');
const registerRouter = require('./routers/registerRouter');
const loginRouter = require('./routers/loginRouter');
const investigateRouter = require('./routers/investigateRouter');
const configRouter = require('./routers/configRouter');
const fs = require('fs')
const https = require('https')
const http = require('http')

//SSL Parameters
var privateKey  = fs.readFileSync('enc/private.key', 'utf8');
var certificate = fs.readFileSync('enc/domain.crt', 'utf8');

const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', registerRouter)
app.use('/login', loginRouter);
app.use('/investigate', investigateRouter);
app.use('/config', configRouter); //Uploads model https://www.tensorflow.org/js/guide/save_load

// app.listen(PORT, () => {
// 	console.log('Server running on port ' + PORT);
// });

const credentials = {key: privateKey, cert: certificate};
// http.createServer(app).listen(80)
https.createServer(credentials, app).listen(process.env.PORT)

app.get('/', auth, function(req, res, next) {
	res.render('index', { title: 'Front Page' });
});

//Connect DB
client.connect();





