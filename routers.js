var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json({type: 'application/json'}));
router.use(bodyParser.urlencoded({extended: true}));

var tools = require('./tools');

var mysql = require('mysql');
var con = mysql.createPool({
  host: 'mysql-ait.stud.idi.ntnu.no',
  user: 'karoljd',
  password: 'RzrcCKT6',
  database: 'karoljd',
  debug: false,
  multipleStatements: true,
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

// Start driver
/* inprogress
router.put('cancelorder', function(req, res) {
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


*/

//done
router.get('/getorders', function(req, res) {
  // getOrders
  // gets orderId,dateTimeOfOrder,latitude,longitude, priority to show driver
  const token = req.body.token;
  if (tools.verify(token) == true) {
    con.query(
      'SELECT `orderId`,`dateTimeOfOrder`,`latitude`,`longitude`,`priority` FROM `orders` WHERE `isTaken` = 0',
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
}); // getOrders
router.post('/takeorder', function(req, res) {
  const orderId = req.body.orderId;
  const deviceId = req.body.deviceId;
  const token = req.body.token;
  if (tools.verify(token) == true) {
    let isSucsess = false;
    con.query(
      //'START TRANSACTION; SELECT `isTaken` FROM `orders` WHERE `orderId` = ?; UPDATE `orders` SET `isTaken` = 1 WHERE `isTaken` = 0 AND orderId=?; COMMIT;',
      'START TRANSACTION; UPDATE `orders` SET `isTaken` = 1 WHERE `isTaken` = 0 AND orderId=?; COMMIT;',
      [orderId],
      function(error, rows, fields) {
        if (error) {
          console.log(error);
          con.destroy();
        } else {
          if (rows.affectedRows > 0) {
            console.log('Order isTaken changed on:' + orderId);
            isSucsess = true;
          } else {
            console.log('Order isTaken change failed on:' + orderId);
            res.send(false);
          }
        }
      },
    );
    con.query(
      'INSERT INTO `ordersTaken` ( `orderId`, `driverId`) SELECT ?, `driverId` FROM `userDriver` WHERE `deviceId` = ?; SELECT `phoneNumber` FROM `orderPhoneNumber` WHERE `orderId` = ?',
      [orderId, deviceId, orderId],
      function(error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          if (rows.insertId > 0) {
            console.log('ordersTaken insterted orderId:' + orderId);
            res.send(isSucsess);
          } else {
            console.log('ordersTaken failed insterting orderId:' + orderId);
            res.send(false);
          }
        }
      },
    );
  } else {
    res.send(false);
  }
}); // take an order
router.put('/endTrip', function(req, res) {
  // changes archived to true
  const token = req.body.token;
  const orderId = req.body.orderId;
  if (tools.verify(token) == true) {
    con.query(
      'UPDATE `orders` SET `orders.arvhived` = `1` WHERE `orderId` = ?',
      [orderId],
      function(error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          if (rows.affectedRows > 0) {
            console.log(rows);
            res.send(true);
          } else {
            res.send(false);
          }
        }
      },
    );
  } else {
    res.send('Not valid token');
  }
}); // set priority to true, end

// End driver

//start customer
/*inprogress
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
*/

//done
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
  const orderId = req.body.orderId;
  if (tools.verify(token) == true) {
    con.query(
      'UPDATE `orders` SET `orders.priority` = `1` WHERE `orderId` = ?',
      [orderId],
      function(error, rows, fields) {
        if (error) {
          console.log(error);
        } else {
          if (rows.affectedRows > 0) {
            console.log(rows);
            res.send(true);
          } else {
            res.send(false);
          }
        }
      },
    );
  } else {
    res.send('Not valid token');
  }
}); // set priority to true, end
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
}); // change status on order to archived, and instert into cancelation
router.get('/getOrderTaxiNum', function(req, res) {
  //when a driver has taken te order
  const token = req.body.token;
  const orderId = req.body.orderId;
  if (tools.verify(token) == true) {
    con.query(
      'SELECT `taxiNum` FROM `ordersTaxiNum` WHERE `orderId` = ?',
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
}); // get the taxi number for the driver on the order

//end customer

//start admin
/* inprogress
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


 */
//done

module.exports = router;
