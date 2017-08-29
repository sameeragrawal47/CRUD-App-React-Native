var express = require('express'); // Web Framework
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var con = mysql.createConnection({
  host: "localhost",
  user: "your@localhostname",
  password: "your mysql db password",
  database: "mysqlNodeDb" // This is my database used for this application
});


var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});


con.connect(function(error){
    if(!!error)console.log('error');
    else console.log('Connected');
})

app.get('/customers', function (req, res) {
    con.query("select * from customers", function(error, rows, fields) {
        if(!!error) console.log('error');
        else{
            console.log(rows)
            res.send(rows);
        }
    });
})

app.get('/customers/:id', function (req, res) {
    console.log(req.params.id);
    con.query("select * from customers where id =?", req.params.id , function(error, rows, fields) {
        if(!!error) console.log('error');
        else{
            console.log(rows)
            res.send(rows);
        }
    });
})

app.post('/customers', function (req, res) {
    // console.log(req.body.name);
    // console.log(req.body.address);
    con.query("insert into customers set ?", req.body, function(error, rows, fields) {
        if(!!error) console.log('error');
        else{
            console.log(rows)
            res.send(JSON.stringify(rows));
        }
    });
})

app.delete('/customers/:id', function (req, res) {
     console.log(req.params.id);
    con.query("delete from customers where id=?", req.params.id, function(error, rows, fields) {
        if(!!error) console.log('error');
        else{
            console.log(rows)
            res.end("Row has been deleted");
        }
    });
})

app.put('/customers', function (req, res) {
  console.log(req.body.id);
   con.query('update customers SET name=?, address=? where id=?', [req.body.name,req.body.address, req.body.id], function (error, rows, fields) {
   if (error) throw error;
   res.end(JSON.stringify(rows));
 });
});

// Below is sample code for into same data used by me into database

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO customers (name, address) VALUES ?";
//   var values = [
//     ['John', 'Highway 71'],
//     ['Peter', 'Lowstreet 4'],
//     ['Amy', 'Apple st 652'],
//     ['Hannah', 'Mountain 21'],
//     ['Michael', 'Valley 345'],
//     ['Sandy', 'Ocean blvd 2'],
//     ['Betty', 'Green Grass 1'],
//     ['Richard', 'Sky st 331'],
//     ['Susan', 'One way 98'],
//     ['Vicky', 'Yellow Garden 2'],
//     ['Ben', 'Park Lane 38'],
//     ['William', 'Central st 954'],
//     ['Chuck', 'Main Road 989'],
//     ['Viola', 'Sideway 1633']
//   ];
// //   con.query(sql, [values], function (err, result) {
// //     if (err) throw err;
// //     console.log("Number of records inserted: " + result.affectedRows);
// //   });

//   con.query("select * from customers", function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// });
