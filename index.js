var express = require('express');
var app = express();
const cors = require('cors');
const client = require('./database/client');
const auth = require("./middleware/auth");
//const tf = require('@tensorflow/tfjs-node');
const registerRouter = require('./routers/registerRouter');
const loginRouter = require('./routers/loginRouter');
const investigateRouter = require('./routers/investigateRouter');
const uploadRouter = require('./routers/uploadRouter');

//locate.test("YOOOO", "MANNNN");

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
app.use('/upload', uploadRouter); //Uploads model https://www.tensorflow.org/js/guide/save_load

app.listen(PORT, () => {
	console.log('Server running on port ' + PORT);
});

app.get('/', auth, function(req, res, next) {
	res.render('index', { title: 'Front Page' });
});

client.connect();





