var express = require('express');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();
var pg = require('pg');
var port = process.env.PORT || 5000
var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, Content-Type');
  next();
});

app.listen(port);
console.log('Listening at ' + port);

var baseClient;
pg.connect(process.env.DATABASE_URL, function(err, client) {
	baseClient = client;
});

var records = [];

var inputFile='list.csv';

var parser = parse({delimiter: ','}, function (err, data) {
  async.eachSeries(data, function (line, callback) {
    // when processing finishes invoke the callback to move to the next one
  	records.push({
        ucdirectory_uclisting_lblcompanyname: line[1],
      	ucdirectory_uclisting_lblowner: line[115] + " " + line[117],
        ucdirectory_uclisting_lbltitle: line[119],
        ucdirectory_uclisting_lbladdress1: line[35],
        ucdirectory_uclisting_lblcity: line[39],
        ucdirectory_uclisting_lblstateprovince: line[40],
        ucdirectory_uclisting_lblzippostal: line[38],
        ucdirectory_uclisting_lblfax: line[25],
        ucdirectory_uclisting_lblphone1: line[23],
        ucdirectory_uclisting_hlemail: line[121],
        ucdirectory_uclisting_hlwebsite: line[30]
      });
      callback();
    });
  });
fs.createReadStream(inputFile).pipe(parser);
function search(nameKey, myArray, searchType){
	var myNewArray = [];
    for (var i=1; i < myArray.length; i++) {
        if(nameKey.length == 1 && searchType == 'people'){
          if (myArray[i].ucdirectory_uclisting_lblowner.toLowerCase()[0].indexOf(nameKey.toLowerCase()[0]) > -1) {
              myNewArray.push(myArray[i]);
          }  
        } else if(nameKey.length == 1 && searchType == 'business'){
          if (myArray[i].ucdirectory_uclisting_lblcompanyname.toLowerCase()[0].indexOf(nameKey.toLowerCase()[0]) > -1 ) {
              myNewArray.push(myArray[i]);
          }  
        } else if(nameKey.length == 1){
          if (myArray[i].ucdirectory_uclisting_lblcompanyname.toLowerCase()[0].indexOf(nameKey.toLowerCase()[0]) > -1 
            ||
            myArray[i].ucdirectory_uclisting_lblowner.toLowerCase()[0].indexOf(nameKey.toLowerCase()[0]) > -1

            ) {
              myNewArray.push(myArray[i]);
          }  
        } else{
          if (myArray[i].ucdirectory_uclisting_lblcompanyname.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
            myArray[i].ucdirectory_uclisting_lblowner.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lbltitle.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lbladdress1.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lblcity.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lblstateprovince.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lblzippostal.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lblfax.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lblphone1.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_hlemail.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_hlwebsite.toLowerCase().indexOf(nameKey.toLowerCase()) > -1

          	) {
              myNewArray.push(myArray[i]);
          }
        }
    }
    return myNewArray;
}

app.get('/', function (req, res) {
    
    if(req.query.q != undefined){
    	// res.send(req.query.q);	
      console.log("Searching: " + req.query.q)
      if(req.query.searchType != undefined && req.query.q.length == 1){
        console.log('singleSearch')
        res.json(search(req.query.q, records, req.query.searchType));
      }else{
        console.log('comboSearch')
      	res.json(search(req.query.q, records));
      }
    }else {
    	res.send('No Support yet');	
    }
    // res.send('Hello World!');
    
});








