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
var inputFile='rawlistwithname.csv';
// var inputFile='rawlist.csv';
//ucDirectory_UcListing_lblOwner,
//ucDirectory_UcListing_lblAddress1,
//ucDirectory_UcListing_lblCity,
//ucDirectory_UcListing_lblStateProvince,
//ucDirectory_UcListing_lblZipPostal,
//ucDirectory_UcListing_lblFax,
//ucDirectory_UcListing_lblPhone1,
//ucDirectory_UcListing_hlWebsite
//ucDirectory_UcListing_lblCompanyName

var parser = parse({delimiter: ','}, function (err, data) {
  async.eachSeries(data, function (line, callback) {
    // when processing finishes invoke the callback to move to the next one
  	records.push({
        // ucdirectory_uclisting_lblcompanyname: line[1],
      	ucdirectory_uclisting_lblowner: line[0],
        // ucdirectory_uclisting_lbltitle: line[119],
        ucdirectory_uclisting_lbladdress1: line[1],
        ucdirectory_uclisting_lblcity: line[2],
        ucdirectory_uclisting_lblstateprovince: line[3],
        ucdirectory_uclisting_lblzippostal: line[4],
        ucdirectory_uclisting_lblfax: line[5],
        ucdirectory_uclisting_lblphone1: line[6],
        // ucdirectory_uclisting_hlemail: line[121],
        ucdirectory_uclisting_hlwebsite: line[7],
        ucDirectory_UcListing_lblCompanyName: line[8]
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
          if (myArray[i].ucdirectory_uclisting_lblowner.toLowerCase()[0].indexOf(nameKey.toLowerCase()[0]) > -1 ) {
              myNewArray.push(myArray[i]);
          }  
        } else if(nameKey.length == 1){
          if (myArray[i].ucdirectory_uclisting_lblowner.toLowerCase()[0].indexOf(nameKey.toLowerCase()[0]) > -1 
            ||
            myArray[i].ucdirectory_uclisting_lblowner.toLowerCase()[0].indexOf(nameKey.toLowerCase()[0]) > -1

            ) {
              myNewArray.push(myArray[i]);
          }  
        } else{
          if (myArray[i].ucdirectory_uclisting_lblowner.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	// myArray[i].ucdirectory_uclisting_lbltitle.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lbladdress1.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lblcity.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lblstateprovince.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lblzippostal.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lblfax.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucdirectory_uclisting_lblphone1.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	// myArray[i].ucdirectory_uclisting_hlemail.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
            myArray[i].ucdirectory_uclisting_hlwebsite.toLowerCase().indexOf(nameKey.toLowerCase()) > -1 ||
          	myArray[i].ucDirectory_UcListing_lblCompanyName.toLowerCase().indexOf(nameKey.toLowerCase()) > -1

          	) {
              myNewArray.push(myArray[i]);
          }
        }
    }
    return myNewArray.slice(0,50);
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

app.get('/count', function (req, res) {
  res.json(records.length);
});








