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

//test
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
//end of test

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

// all
//inprogress
//done
router.post('/register', function(req, res) {
  if (req.body.name === !null) {
    con.query(
      'INSERT INTO `users`(`imei`, `phoneNum`, `name`, `taxiNum`, `company`, `orgNum`, `billingAddr`) VALUES (:imei,:pnum,:name,:taxiNum,:company,:orgNum,:billingAddr)',
      {
        imei: req.body.imei,
        pnum: req.body.pnum,
        name: req.body.name,
        taxiNum: req.body.taxiNum,
        company: req.body.company,
        orgNum: req.body.orgNum,
        billingAddr: req.body.billingAddr,
      },
      function(error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          console.log(rows);
          res.send(rows);
        }
      },
    );
  } else {
    con.query(
      'INSERT INTO `users`(`imei`, `phoneNum`) VALUES (:imei,:pnum)',
      {
        imei: req.body.imei,
        pnum: req.body.pnum,
      },
      function(error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          console.log(rows);
          res.send(rows);
        }
      },
    );
  }
}); // adds a user (driver,customer)

//driver
//inprogress
//done
router.get('/getorders', function(req, res) {
  // gets orderId,dateTime,latitude,longitude to show driver
  con.query(
    'SELECT `orderId`,`dateTime`,`latitude`,`longitude`,`priority` FROM `orders`',
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
}); // gets orderId,dateTime,latitude,longitude to show driver
router.put('cancel order', function(req, res) {
  con.query(
    'UPDATE `orders` SET `canceled`=`true` WHERE `orderId`=:orderId;',
    {
      orderId: req.body.orderId,
    },
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
}); // cancels a order
router.get('/takeorder', function(req, res) {
  con.query(
    'SELECT `phoneNum` FROM `orders` WHERE `orderId`=orderId; UPDATE `orders` SET `driver_id`=:driverId WHERE `orderId` = :orderId;',
    {
      orderId: req.body.orderId,
      driver_id: req.body.driver_id,
    },
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
}); // takes order

//customer
//inprogress
//done
router.post('/make order', function(req, res) {
  con.query(
    'INSERT INTO `orders`(`phoneNum`, `latitude`, `logitude`) VALUES (:pnum, :latitude, :longitude)',
    {
      pnum: req.body.pnum,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
}); // make a order
router.put('/make prio', function(req, res) {
  con.query(
    'UPDATE `orders` SET `priority`=`true` WHERE `orderId`=:orderId;',
    {
      orderId: req.body.orderId,
    },
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
}); // set priority to true
router.get('/get driver detail', function(req, res) {
  con.query(
    'SELECT `taxiNum` FROM `orders` INNER JOIN `users` USING (userId) WHERE orderId=:orderID',
    {orderId: req.body.orderId},
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
}); // get driver detail
router.post('/rateDriver', function(req, res) {
  con.query(
    'INSERT INTO `vurdering`( `user_id1`, `rating`) VALUES (:userId, :rating)',
    {
      userId: req.body.userId,
      rating: req.body.rating,
    },
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
}); // rateDriver
router.delete('delete order', function(req, res) {
  //removes order
  con.query(
    'DELETE FROM `orders` WHERE `orderId` = :orderId',
    {
      orderId: req.body.orderId,
    },
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(JSON.stringify(true));
      }
    },
  );
}); // removes a user

//admin
//inprogress
//done
router.post('/newDriver', function(req, res) {
  con.query(
    'INSERT INTO `users`(`imei`, `phoneNum`, `name`, `taxiNum`, `company`, `orgNum`, `billingAddr`) VALUES (:imei,:pnum,:name,:taxiNum,:company,:orgNum,:billingAddr)',
    {
      imei: req.body.imei,
      pnum: req.body.pnum,
      name: req.body.name,
      taxiNum: req.body.taxiNum,
      company: req.body.company,
      orgNum: req.body.orgNum,
      billingAddr: req.body.billingAddr,
    },
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
}); //adds a driver
router.delete('/deleteuser', function(req, res) {
  //removes a user
  con.query(
    'DELETE FROM `users` WHERE `userId` = :userId',
    {
      userId: req.body.userId,
    },
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(JSON.stringify(true));
      }
    },
  );
}); // removes a user
router.put(function(req, res) {
  con.query(
    'UPDATE `users` SET `phoneNum`=:pnum,`name`=:name,`taxiNum`=:taxiNum,`company`=:company,`orgNum`=:orgNum,`billingAddr`=:billingAddr',
    {
      pnum: req.body.pnum,
      name: req.body.name,
      taxiNum: req.body.taxiNum,
      company: req.body.company,
      orgNum: req.body.orgNum,
      billingAddr: req.body.billingAddr,
    },
    function(error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log(rows);
        res.send(rows);
      }
    },
  );
}); //update a driver

module.exports = router;
