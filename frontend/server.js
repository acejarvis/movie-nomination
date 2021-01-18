var express = require('express');
var cors = require('cors');
var request = require('request');
var app = express();
var path = require('path');


var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(cors());

const apiKey = '90581e87';

app.get('/movie', function (req, res) {
    req.query.apikey = apiKey;
    request({
        uri: 'http://www.omdbapi.com/',
        qs: req.query
    }).pipe(res);
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});



app.listen(process.env.PORT || 3000, function () {
    console.log('proxy server listening on port 3000')
});