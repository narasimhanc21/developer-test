var express    = require('express');        
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var snmp = require ("net-snmp");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var port = process.env.PORT || 3000;
var router = express.Router(); 

function makeRemoteCall(oid, callback)
{
    var options = {
        port: 161,
        retries: 1,
        timeout: 5000,
        transport: "udp4",
        trapPort: 162,
        version: snmp.Version2c   // or snmp.Version1
    };

    //var session = snmp.createSession ("127.0.0.1", "public", options);
    var session = snmp.createSession ("34.250.33.200", "8vJyHQG57tKKu", options);
    var resMsg;
    
    session.get (oid, function (error, varbinds) {
        if (error) {
            console.error (error.toString ());
            callback(error.toString());
        } else {
            // for version 1
            console.log (varbinds[0].oid + "|" + varbinds[0].value);
            resMsg = varbinds[0].oid + "|" + varbinds[0].value;

            // for version 2c
            if (snmp.isVarbindError (varbinds[0])) {
                console.error (snmp.varbindError (varbinds[0]));
                resMsg = snmp.varbindError (varbinds[0]);
            } else {
                console.log (varbinds[0].oid + "|" + varbinds[0].value);
                resMsg = varbinds[0].oid + "|" + varbinds[0].value;
            }
            callback(resMsg);
        }
    });
}

router.post('/space', function(req, res) {
    var oids = ["1.3.6.1.2.1.25.2.3.1.6.1"]; //for disk space
    res.header("Access-Control-Allow-Origin", "*");
    makeRemoteCall(oids, function(result) {
        res.send({ message: result });    
    });
});

router.post('/packets', function(req, res) {
    var oids = ["1.3.6.1.2.1.2.2.1.10.1"]; //for network interface recieved packets
    res.header("Access-Control-Allow-Origin", "*");
    makeRemoteCall(oids, function(result) {
        res.send({ message: result });    
    });
});

app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);
