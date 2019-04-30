var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var bodyParser = require('body-parser')
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var redis = require('redis')
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

client = redis.createClient();


// var items = require('../database-mysql');
// var items = require('../database-mongo');


 //app.use(express.static(__dirname + '/../react-client/dist'));



app.get('/', function (req, res) {

var channel = req.query.channel
var code = req.query.code
res.sendFile(path.join(__dirname + '/frontend/index.html'));

})

app.get('/checkturn', function(req, res) {
  client.get('turn', function(err, turn) {
    console.log(turn)
    res.end(turn)
  })
})

app.get('/code', function (req, res) {
	if (req.query.code !== undefined) {
		client.set("code", req.query.code)
	}
	client.get("code", function (err, code) {
		res.end(code)
	})
})
app.get('/turn', function (req, res) {
  console.log(req.query.player)
	client.set("turn", req.query.player === "1" ? "2" : "1")
})
app.listen(4040, function() {
 console.log('listening on port 4040!');
});
