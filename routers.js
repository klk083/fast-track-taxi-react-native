var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var secret = '4ecf096c08b97a3b3ba79deae1d3bd865623da9e09b549f50da3eb7f93ac5c15';

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

// all
//done

router.post('/token', function(req, res) {
  const secretGotten = req.body.secretGotten;
  res.send(tools.getToken(secretGotten));
});

//inprogress

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
//done
router.post('/makeorder', function(req, res) {
  const pnum = req.body.pnum;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const token = req.body.token;
  if (tools.verify(token) == true) {
    con.query(
      'INSERT INTO `orders`(`phoneNum`, `latitude`, `longitude`) VALUES (?, ?, ?)',
      [pnum, latitude, longitude],
      function(error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          console.log(rows);
          res.send(true);
        }
      },
    );
  } else {
    res.send('Not valid token');
  }
}); // make a order

router.put('/makeprio', function(req, res) {
  // set priority to true, start
  const token = req.body.token;
  const orderId = req.body.orderId;
  if (tools.verify(token) == true) {
    con.query(
      'UPDATE `orders` SET `priority`=`true` WHERE `orderId`=?;',
      [orderId],
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
    res.send('Not valid token');
  }
}); // set priority to true, end

//inprogess
router.get('/getdriverdetail', function(req, res) {
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
//done

module.exports = router;
