var express = require('express');
var cors = require('cors');
var request = require('request');
var app = express();
const http = require('http');
const path = require('path');

const apiKey = '90581e87';
app.use(cors());
app.use(express.static(__dirname + '/dist/movie-nomination'));

app.get('/movie', function (req, res) {
    req.query.apikey = apiKey;
    request({
        uri: 'http://www.omdbapi.com/',
        qs: req.query
    }).pipe(res);
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/movie-nomination/index.html'));
});



const server = http.createServer(app);
app.listen(3000, function () {
    console.log('proxy server listening on port 3000')
});