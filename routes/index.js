var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res)
{
    res.render('create');
});

router.post('/createCode', function(req, res)
{

});

router.get('/bills', function(req, res) {
    var BillModel = req.BillModel;
    BillModel.find(function(err, bills)
    {
        if(err)
        {
            //no idea
            return;
        }
        res.render('listofbills', {"billindb" : bills});
    });
});

router.get('/updatelocation', function(req, res) {
    res.render('updatelocation', {title: 'Add or Update Bill Location'});
});

router.get('/billlocations', function(req, res)
{
    var BillModel = req.BillModel;
    var myUrl = req.originalUrl;
    var parts = myUrl.split('serial=');
    var serialIn = parts[1];

    BillModel.find({serial: '' + serialIn}, {},function(err, bills)
    {
        res.send(bills);
    });
});

router.post('/doupdatelocation', function(req, res)
{
    var BillModel = req.BillModel;

    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var serial = req.body.serial;
    var timestamp = new Date().getTime();

    var data = new BillModel(
        {
            serial : serial,
            timestamp : timestamp,
            latitude : latitude,
            longitude : longitude
        }
    );
    data.save(function(err, doc)
    {
        if(err)
        {
            res.send("There was a technical problem while trying to add your data to our database");
        }
        else
        {
            res.location("bills");
            res.redirect("bills");
        }
    });
});

module.exports = router;
