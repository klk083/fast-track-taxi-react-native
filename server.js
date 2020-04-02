var express = require('express');
var app = express();
const https = require('https');

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createPool({
  connectionLimit: 2,
  host: 'mysql-ait.stud.idi.ntnu.no',
  user: 'karoljd',
  password: 'RzrcCKT6',
  database: 'karoljd',
  debug: false,
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('started');
});

//works
app.get('/user', function(req, res) {
  con.query('select * from cats', function(error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.get('/cats', function(req, res) {
  con.query(
    'INSERT INTO `cats`(`catName`, `owner`,`phoneNum`) VALUES ("ole","eier",123)',
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
});

app.get('/delete', function(req, res) {
  con.query('DELETE FROM `cats` WHERE catName = "ole"', function(
    error,
    rows,
    fields,
  ) {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.get('/add/:catName-:owner-:pnum', function(req, res) {
  const catName = req.params.catName;
  const owner = req.params.owner;
  const pnum = req.params.pnum;
  const sentence =
    'INSERT INTO `cats`(`catName`, `owner`,`phoneNum`) VALUES ("' +
    catName +
    '", "' +
    owner +
    '", ' +
    pnum +
    ')';
  con.query(sentence, function(error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});
