var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json({type: 'application/json'}));
router.use(bodyParser.urlencoded({extended: true}));

var tools = require('./tools');

var mysql = require('mysql');
var con = mysql.createPool({
  connectionLimit: 2,
  host: 'mysql-ait.stud.idi.ntnu.no',
  user: 'karoljd',
  password: 'RzrcCKT6',
  database: 'karoljd',
  debug: false,
});

//deprecated
router.route('/test').get(function(req, res) {
  con.query('select * from cats', function(error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});
//deprecated
router.get('/cats', function(req, res) {
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

//deprecated
router.get('/delete', function(req, res) {
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

//deprecated
router.post('/new', function(req, res) {
  var catName = req.body.catName;
  var owner = req.body.owner;
  var pnum = req.body.pnum;

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
  //res.end('yes');
});

//deprecated
router
  .route('/location')
  .get()
  .put()
  .post(function(req, res) {
    var userId = req.body.userId;
    var lat = req.body.lat;
    var long = req.body.long;

    const sentence =
      'INSERT INTO `location`(`userId`, `latitude`,`longitude`) VALUES ("' +
      userId +
      '", "' +
      lat +
      '", ' +
      long +
      ')';
    con.query(sentence, function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    });
  })
  .delete();

//adds user, get user, update user, delete user
router
  .route('/user') //concern all users
  .get(function(req, res) {
    var userId = req.body.userId;

    const sentence = 'INSERT INTO `users`(`userId`) VALUES (' + userId + ')';
    con.query(sentence, function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    });
  }) //gets a user
  .post(function(req, res) {
    //adds a new user
    let sentence = null;
    var imei = req.body.imei;
    var pnum = req.body.pnum;
    if (req.body.name === !null) {
      var name = req.body.name;
      var taxiNum = req.body.taxiNum;
      var company = req.body.company;
      var orgNum = req.body.orgNum;
      var billingAddr = req.body.billingAddr;
      sentence =
        'INSERT INTO `users`(`imei`, `phoneNum`, `name`, `taxiNum`, `company`, `orgNum`, `billingAddr`) VALUES (' +
        imei +
        ',' +
        pnum +
        ',' +
        name +
        ',' +
        taxiNum +
        ',' +
        company +
        ',' +
        orgNum +
        ',' +
        billingAddr +
        ')';
    } else {
      sentence =
        'INSERT INTO `users`(`imei`, `phoneNum`) VALUES (' +
        imei +
        ',' +
        pnum +
        ')';
    }

    con.query(sentence, function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    });
  }) //adds a new user
  .put(function(req, res) {
    //  not done
    var imei = req.body.imei;
    var pnum = req.body.pnum;
    var name = req.body.name;
    var taxiNum = req.body.taxiNum;
    var company = req.body.company;
    var orgNum = req.body.orgNum;
    var billingAddr = req.body.billingAddr;

    const sentence =
      'INSERT INTO `users`(`imei`, `phoneNum`, `name`, `taxiNum`, `company`, `orgNum`, `billingAddr`) VALUES (' +
      imei +
      ',' +
      pnum +
      ',' +
      name +
      ',' +
      taxiNum +
      ',' +
      company +
      ',' +
      orgNum +
      ',' +
      billingAddr +
      ')';
    con.query(sentence, function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    });
  }) //updates a user
  .delete(function(req, res) {
    var userId = req.body.userId;

    const sentence = 'DELETE FROM `users` WHERE `userId` = ' + userId;
    con.query(sentence, function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    });
  }); //deletes a user

//deprecated
router.post('/loc', function(req, res) {
  var lat = req.body.lat;
  var long = req.body.long;
  const geo = JSON.stringify(tools.distance(lat, long, 1, -1));
  res.send(geo);
  /*
  lat = lat.toFixed(3);
  long = long.toFixed(3);

  let lat1 = lat + 0.02;
  let lat2 = lat - 0.02;
  let long1 = long + 0.02;
  let long2 = long + 0.02;



  SELECT * FROM locaton
  WHERE latitude LIKE lat1+'%'

  or

  SELECT * FROM locaton
  WHERE latitude LIKE lat2+'%'

*/
}); //test

module.exports = router;
