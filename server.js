'use strict';
/* global process */
/* global __dirname */
var express = require('express');
var app = express();
var fs = require("fs");

// Import blockchain-js
//var Ibc1 = require('ibm-blockchain-js');
//var ibc = new Ibc1(/*logger*/);             //you can pass a logger such as winston here - optional
var chaincode = {};
var fileName = '';
//var chainCodeCall = require('./utils/chaincode_call.js');


app.post('/registeration/insurance', function (req, res) {
   fs.readFile( __dirname + "/json/" + "insuranceRegisteration.json", 'utf8', function (err, data) {

       console.log( data );
	   //chainCodeCall.process_msg(data, "insuranceRegisteration");	   
       res.end( data );
	   
   });
})

app.post('/registeration/vendor', function (req, res) {
   fs.readFile( __dirname + "/json/" + "vendorRegisteration.json", 'utf8', function (err, data) {
	   if(err){
		   console.log(err);
	   }
	   else{
	   console.log( data );
	   //chainCodeCall.process_msg(data, "vendorRegisteration");	   
       res.end( data );	            
	   }
   });
})

app.post('/addNewRequest', function (req, res) {
   fs.readFile( __dirname + "/json/" + "newRequest.json", 'utf8', function (err, data) {
	   if(err){
		   console.log(err);
	   }
	   else{
       console.log( data );
	   //chainCodeCall.process_msg(data, "addNewRequest");	   
       res.end( "success" );
	   }
   });
})

app.post('/updateRequest', function (req, res) {
   fs.readFile( __dirname + "/json/" + "newRequest.json", 'utf8', function (err, data) {
	   if(err){
		   console.log(err);
	   }
	   else{
       console.log( data );
	   //chainCodeCall.process_msg(data, "updateRequest");	   
       res.end("Success");
	   }
   });
})

app.get('/vendorDashboard/count/:id', function (req, res) {  
	console.log('vendor dashboard call'); 
		var obj = 	{
						reqId: req.params.id,						
					};
	fs.readFile( __dirname + "/json/" + "vendorCount.json", 'utf8', function (err, data) {
		console.log( data );
	   //chainCodeCall.process_msg(JSON.stringify(obj) , "vendorDashboardCount");	   
       res.end( data );   
	});       
})

app.get('/vendorDashboard/Details/:id/:reqStatus', function (req, res) {   
		var obj = 	{
						reqId: req.params.id,						
						reqStatus: req.params.reqStatus
					};
		if( req.params.reqStatus == 'inProgress'){
			fileName = 'inProgressVendor.json';
			}
	else{
		fileName ='completedVendor.json';
	}	
	fs.readFile( __dirname + "/json/" + fileName, 'utf8', function (err, data) {
	if(err) console.log(err);
       console.log( data);       
	   //chainCodeCall.process_msg(JSON.stringify(obj) , "vendorRequestDetails");	   
       res.end( data );
	});
})

app.get('/insuranceDashboard/count/:id', function (req, res) {   
		var obj = 	{
						reqId: req.params.id,												
					};
      fs.readFile( __dirname + "/json/" + "count.json", 'utf8', function (err, data) {
		  if(err) console.log(err);
		console.log( data );
	   //chainCodeCall.process_msg(JSON.stringify(obj) , "vendorDashboardCount");	   
       res.end( data );   
	});
})

app.get('/insuranceDashboard/Details/:id/:reqStatus', function (req, res) {   
		var obj = 	{
						reqId: req.params.id,						
						reqStatus: req.params.reqStatus
					};
		
	if( req.params.reqStatus == 'inProgress'){
			fileName = 'inProgressIns.json';
	}
	else{
		fileName ='completedIns.json';
	}	
	fs.readFile( __dirname + "/json/" + fileName, 'utf8', function (err, data) {
	if(err) console.log(err);			
       console.log( data );       
	   //chainCodeCall.process_msg(JSON.stringify(obj) , "insurancerequestDetails");	   
       res.end( data );
	});
})

app.get('/aggregatedDashboard/count/:id', function (req, res) {   
		var obj = 	{
						reqId: req.params.id,												
					};
       fs.readFile( __dirname + "/json/" + 'count.json', 'utf8', function (err, data) {
	if(err) console.log(err);
       console.log( data);       
	   //chainCodeCall.process_msg(JSON.stringify(obj) , "vendorRequestDetails");	   
       res.end( data );
	});
})

app.get('/aggregatedDashboard/Details/:id/:reqStatus', function (req, res) {   
		var obj = 	{
						reqId: req.params.id,						
						reqStatus: req.params.reqStatus
					};
     if( req.params.reqStatus == 'inProgress'){
			fileName = 'inProgress.json';
			}
	else{
		fileName ='completed.json';
	}	
	fs.readFile( __dirname + "/json/" + fileName, 'utf8', function (err, data) {
	if(err) console.log(err);
       console.log( data);       
	   //chainCodeCall.process_msg(JSON.stringify(obj) , "vendorRequestDetails");	   
       res.end( data );
	});
})

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})


  var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
 // ws.send("something");

})