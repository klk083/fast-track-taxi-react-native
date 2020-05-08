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

// all
//done
/*
router.use(function(req, res) {
  // start 404 page
  res
    .status(404)
    .send(
      'We think you are lost, the cov-19 virus is everywhere, you should not wonder around without purpose.',
    );
}); // end 404 page
*/
router.post('/token', function(req, res) {
  const secretGotten = req.body.secretGotten;
  res.send(tools.getToken(secretGotten));
});

//inprogress
/*
router.post('/register', function(req, res) {
  const token = req.body.token;
  if (tools.verify(token) == true) {
    const uniqId = req.body.uniqId;
    const pnum = req.body.pnum;
    const name = req.body.name;
    if (name === !null) {
      const taxiNum = req.body.taxiNum;
      const company = req.body.company;
      const orgNum = req.body.orgNum;
      const billingAddr = req.body.billingAddr;
      con.query(
        'INSERT INTO `users`(`uniqId`, `phoneNum`, `name`, `taxiNum`, `company`, `orgNum`, `billingAddr`) VALUES (?,?,?,?,?,?,?)',
        [uniqId, pnum, name, taxiNum, company, orgNum, billingAddr],
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
        'INSERT INTO `users`(`uniqId`, `phoneNum`) VALUES (?,?)',
        [uniqId, pnum],
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
  } else {
    res.send(false);
  }
}); // adds a user (driver,customer)
*/
/* should users
router.post('/registerCustomer', function(req, res) {
  const token = req.body.token;
  if (tools.verify(token) == true) {
    const phoneNumber = req.body.phoneNumber;
    const deviceId = req.body.deviceId;
    let userId = '';
    con.query(
        'INSERT INTO `users` (`phoneNumber`,deviceId) VALUES (?,?)',
        [phoneNumber, deviceId],
        function(error, rows) {
          if (error) {
            console.log(error);
          } else {
            console.log(rows.insertId);
            userId = rows.insertId;
          }
        },
    );
    con.query(
        'INSERT INTO `customers` (userId) VALUES (?)',
        [userId],
        function(error, rows) {
          if (error) {
            console.log(error);
          } else {
            console.log(rows.insertId);
            userId = rows.insertId;
          }
        },
    );

  } else {
    res.send(false);
  }
}); // make a order
*/

/*driver
//inprogress
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
*/
//start customer
//inprogress
router.post('/makeorder', function(req, res) {
  const deviceId = req.body.deviceId;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const token = req.body.token;
  if (tools.verify(token) == true) {
    con.query(
      'INSERT INTO `orders` ( `customerId`, `latitude`, `longitude`) SELECT `customerId`,?,? FROM `userCustomer` WHERE `deviceId` = ?;',
      [latitude, longitude, deviceId],
      function(error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          if (rows.insertId > 0) {
            console.log('Order created:' + rows.insertId);
            res.send(rows.insertId.toString());
          } else {
            res.send(false);
          }
        }
      },
    );
  } else {
    res.send(false);
  }
}); // make a order

router.put('/makeprio', function(req, res) {
  // set priority to true, start
  const token = req.body.token;
  const deviceId = req.body.deviceId;
  if (tools.verify(token) == true) {
    con.query(
      //'UPDATE `orders` SET `priority`=`true` WHERE `orderId`=`users.userId`',
      'UPDATE `orders` SET `orders.priority` = `true` FROM  `orders` INNER JOIN `users` ON `orders.customerId` = `users.userId` WHERE `users.deviceId` = ?',
      [deviceId],
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
router.get('/getdriverdetail', function(req, res) {
  //when a driver has taken te order
  const token = req.body.token;
  if (tools.verify(token) == true) {
    con.query(
      'SELECT `taxiNum` FROM `orders` INNER JOIN `users` USING (userId) WHERE orderId=?',
      [req.body.orderId],
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
}); // get driver detail
router.put('/rateDriver', function(req, res) {
  const token = req.body.token;
  const userId = req.body.userId;
  const rating = req.body.rating;
  if (tools.verify(token) == true) {
    con.query(
      'INSERT INTO `vurdering`( `userId`, `rating`) VALUES (?, ?)',
      [userId, rating],
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
}); // rateDriver
router.post('/cancelOrder', function(req, res) {
  // cancels order
  const token = req.body.token;
  const reason = 'Customer canceled order before driver took order';
  const orderId = req.body.orderId;
  let isSucsessfull = false;
  if (tools.verify(token) == true) {
    con.query(
      'UPDATE `orders` SET `archived` = 0 WHERE `orderId` =?',
      [orderId],
      function(error, rows) {
        if (error) {
          console.log(error);
        } else {
          console.log(rows);
          if (rows.affectedRows > 0) {
            isSucsessfull = true;
          }
        }
      },
    );
    con.query(
      'INSERT INTO `cancelations` (`orderId`, `reasonForCancelation`) VALUES (?, ?)',
      [orderId, reason],
      function(error, rows) {
        if (error) {
          console.log(error);
        } else {
          console.log(rows);
          if (rows.insertId > 0 && isSucsessfull) {
            res.send(isSucsessfull.toString());
          } else {
            res.send(isSucsessfull.toString());
          }
        }
      },
    );
  } else {
    res.send('Not valid token');
  }
}); // removes a user
//done
//end customer

//start admin
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
