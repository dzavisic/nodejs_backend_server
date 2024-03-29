var express = require('express');
var mysql    = require('mysql');
var app         = express();
var http     = require('http');
var md5 = require('MD5');
var cors = require('cors');
var bodyParser  = require('body-parser');
var apiToken        = require('api-token');
var connection = require('./connection');

var funkcije = require('./routes/funkcije.js');

var helmet = require('helmet');

// 365 days till token expire
var apiRoutes = express.Router();
apiToken.setExpirationTime(365);

var port = process.env.PORT || 3014; // used to create, sign, and verify tokens

app.use(helmet())

// 365 days till token expire
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.all('/api/*', function(req, res, next){

    funkcije.log(true, {route:req.url, body:req.body});

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    //if(req.url === '/api/authenticate'){
    //apiToken.addUser(req.body.username);
    console.log(req.body);
    //console.log(req.query);
    //console.log(req.connection.remoteAddress);
    //console.log(req.socket.remoteAddress);
    //console.log(req.url.substring(0,40));
        
    if(req.get('token')){
        token = req.get('token');
    }
    else if (req.query.token){
        token = req.query.token;
    }else if(req.url.substring(0,15) === '/api/prijavaweb'){
        /* token is not needed when posting authentication credentials */
        next();
    //}else if(apiToken.isTokenValid(req.get('token'))){
    }else if(req.url.substring(0,18) === '/api/prijavamob'){
        /* token is not needed when posting authentication credentials */
        console.log('Mobitel pušten');
        next();
    //}else if(apiToken.isTokenValid(req.get('token'))){
    }
    //test
    else if(req.url.substring(0,5) === '/api/'){
        console.log('TESTNI API');
        next();
    }
    else if(apiToken.isTokenValid(token)){
        /* continue if token is valid */
        next();
    }else{
        /* send 401 if not authenticating or token is invalid */
        //res.send(401);
        //res.send("Authenticate");
        res.json({ success: false, message: 'Authentication failed. Invalid token. Login again!' });
    }
});

app.use('/', require('./routes'));

app.use('/api', apiRoutes);

app.get('/', function(req, res){
    res.json({ message: 'API'});
});

connection.init();

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
