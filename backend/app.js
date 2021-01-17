var express = require('express');
var cors = require('cors');
var request = require('request');
var app = express();

const apiKey = '90581e87';
app.use(cors());

app.get('/movie', function (req, res) {
    req.query.apikey = apiKey;
    request({
        uri: 'http://www.omdbapi.com/',
        qs: req.query
    }).pipe(res);
})

app.listen(3000, function () {
    console.log('proxy server listening on port 3000')
})