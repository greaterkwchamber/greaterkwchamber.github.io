var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, Content-Type');
  next();
});

app.listen(4001);
console.log('Listening at 4001');

function extractURLsFromURL(currentID){
  var url = 'http://memberservices.membee.com/feeds/directory/directory.aspx?ref=1&action=Listing&cid=325&did=1&value=' + currentID;
	request(url, function(err, resp, body){
		if (!err && resp.statusCode == 200) {
		  	$ = cheerio.load(body);
		  	links = $('span'); //jquery get all hyperlinks
        var value = '';
        var ucDirectory_UcListing_lblOwner = '';
        var ucDirectory_UcListing_lblTitle = '';
        var ucDirectory_UcListing_lblAddress1 = '';
        var ucDirectory_UcListing_lblCity = '';
        var ucDirectory_UcListing_lblStateProvince = '';
        var ucDirectory_UcListing_lblZipPostal = '';
        var ucDirectory_UcListing_lblFax = '';

        var ucDirectory_UcListing_lblPhone1 = '';
        var ucDirectory_UcListing_hlEmail = '';
        var ucDirectory_UcListing_hlWebsite = '';

		  	$(links).each(function(i, link){
            if(link.attribs.id == 'ucDirectory_UcListing_lblOwner'){
                //name
                if(link.children.length > 0){
                  ucDirectory_UcListing_lblOwner = link.children[0].data
                  value += link.children[0].data + '','';
                }else{
                  value += '','';
                }
            }
            
            if(link.attribs.id == 'ucDirectory_UcListing_lblTitle'){
                //post
                if(link.children.length > 0){
                  ucDirectory_UcListing_lblTitle = link.children[0].data
                  value += link.children[0].data + '','';
                }else{
                  value += '','';
                }
            }

            if(link.attribs.id == 'ucDirectory_UcListing_lblAddress1'){
                //post
                if(link.children.length > 0){
                  ucDirectory_UcListing_lblAddress1 = link.children[0].data
                  value += link.children[0].data + '','';
                }else{
                  value += '','';
                }
            }


            if(link.attribs.id == 'ucDirectory_UcListing_lblCity'){
                //city
                if(link.children.length > 0){
                  ucDirectory_UcListing_lblCity = link.children[0].data
                  value += link.children[0].data + '','';
                }else{
                  value += '','';
                }
            }
            if(link.attribs.id == 'ucDirectory_UcListing_lblStateProvince'){
                //state
                if(link.children.length > 0){
                  ucDirectory_UcListing_lblStateProvince = link.children[0].data
                  value += link.children[0].data + '','';
                }else{
                  value += '','';
                }
            }

            if(link.attribs.id == 'ucDirectory_UcListing_lblZipPostal'){
                //zip
                if(link.children.length > 0){
                  ucDirectory_UcListing_lblZipPostal = link.children[0].data
                  value += link.children[0].data + '','';
                }else{
                  value += '','';
                }
            }

            if(link.attribs.id == 'ucDirectory_UcListing_lblFax'){
                //zip
                if(link.children.length > 0){
                  ucDirectory_UcListing_lblFax = link.children[0].data
                  value += link.children[0].data + '','';
                }else{
                  value += '','';
                }
            }

//
//
          
          


        });

        links = $('a'); //jquery get all hyperlinks
        $(links).each(function(i, link){

          if(link.attribs.id == 'ucDirectory_UcListing_lblPhone1'){
              if(link.children.length > 0){
                  ucDirectory_UcListing_lblPhone1 = link.children[0].data
                  value += link.children[0].data + '','';
                }else{
                  value += '','';
                }
          }
          if(link.attribs.id == 'ucDirectory_UcListing_hlEmail'){
              if(link.children.length > 0){
                ucDirectory_UcListing_hlEmail = link.children[0].data
                  value += link.children[0].data + '','';
                }else{
                  value += '','';
                }
          }
          if(link.attribs.id == 'ucDirectory_UcListing_hlWebsite'){
            if(link.children.length > 0){
              ucDirectory_UcListing_hlWebsite = link.children[0].data
              value += link.children[0].data
            }
          }

        }
        );
      
        if(value.length){
          // console.log(value);


        console.log(ucDirectory_UcListing_lblOwner +'','' +
        ucDirectory_UcListing_lblTitle +'','' +
        ucDirectory_UcListing_lblAddress1 +'','' +
        ucDirectory_UcListing_lblCity +'','' +
        ucDirectory_UcListing_lblStateProvince +'','' +
        ucDirectory_UcListing_lblZipPostal +'','' +
        ucDirectory_UcListing_lblFax +'','' +

        ucDirectory_UcListing_lblPhone1 +'','' +
        ucDirectory_UcListing_hlEmail +'','' +
        ucDirectory_UcListing_hlWebsite );

        }


      }
      extractURLsFromURL(currentID + 1);
    });
}

extractURLsFromURL(1);
