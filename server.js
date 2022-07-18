const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/untitled16'));
// app.use(express.static(__dirname + '/dist/untitled16'));

app.get('/*', function(req,res){
  res.sendFile(
    path.join(__dirname+'/dist/untitled16/index.html'));
});

app.listen(process.env.PORT || 8085);
