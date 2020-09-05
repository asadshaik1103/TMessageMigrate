const express = require('express');
const fs = require('fs');
const net = require('net');
var sleep = require('system-sleep');

const csv = require('csv-parser');

const router = express.Router();

router.post("",(req, res, next) =>{
  var reqData = req.body;
  var messages = [];
  var client = new net.Socket();
  var host = req.body.hostUrl;
  var sourceToken = req.body.sourceToken;
  var targetToken = req.body.targetToken;
  var TIME_WAIT = req.body.waitTIme;
  var csvData = req.body.csvFile;
  for (let index = 0; index < csvData.length; index++) {
    if(index !=0){
      const element = csvData[index];
      var msg = element.replace(/["]+/g, '');
      var receivedData = msg.replace(sourceToken, targetToken);
      messages.push(receivedData);
    }

  }
  var datalogs = [];
  datalogs.push('CSV file successfully processed');
  // console.log('CSV file successfully processed');

  client.connect(4011, host, function() {
    datalogs.push('Connected to ' + host);
      // console.log('Connected to %s', host);
      var j = 1;
      for (let index = 0; index < messages.length; index++) {
          var msg = messages[index];
          datalogs.push(j + '|' + msg);
          console.log(j + '|' + msg);
          // if(j > 103){
          client.write(msg);

          sleep(TIME_WAIT);
          // }
          j++;
      }
      res.status(201).json({
        datalogs
      });
  });

});
module.exports = router;
