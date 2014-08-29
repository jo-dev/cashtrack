var express = require('express');
var encodedecode = require('../public/javascripts/encodedecode');

var router = express.Router();
var paramFunc = function(req, res, next, id)
{
    req.id = id;
    next();
};

var getFunc = function(req, res, next)
{
   var id = encodedecode.base62ToSerial(req.id);
   res.redirect('./updatelocation?serial=' + id);
};

router.param('id', paramFunc);

router.get('/:id', getFunc);

module.exports = router;
