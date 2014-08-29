var express = require('express');
var router = express.Router();
var paramFunc = function(req, res, next, id)
{
    req.id = id;
    next();
};

var getFunc = function(req, res, next)
{
   var id = base62ToSerial(req.id);
   res.redirect('./updatelocation?serial=' + id);
};

function base62ToSerial(base62Num)
{
    var decimalVal = 0;
    var result = '';
    for(idx = 0; idx < base62Num.length; idx++)
    {
        var a = parseBase62(base62Num.charAt(base62Num.length - idx - 1));
        var b = Math.pow(62, idx);
        var ab = a * b;
        decimalVal = decimalVal + ab;
    }
    var decimalPart = decimalVal % Math.pow(10, 10);
    var div = ((decimalVal - decimalPart) / Math.pow(10, 10));
    var decimalBase36Part =  div % 36;
    var base36Part = toBase36(decimalBase36Part);
    div = div / 36;
    var decimalBase26Part = div % 26; //this should be superfluous...
    var base26Part = toBase26(decimalBase26Part);
    var paddedDecimal = padTo10(decimalPart);
    return '' + base26Part + base36Part + paddedDecimal;
}
function padTo10(val)
{
    return pad(val, 10, 0);
}
function pad(n, width, z)
{
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function toBase36(val)
{
    return "0123456789ABZDEFGHIJKLMNOPQRSTUVWXYZ".charAt(val);
}
function toBase26(val)
{
    return "ABZDEFGHIJKLMNOPQRSTUVWXYZ".charAt(val);
}

function parseBase62(char)
{
    return "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char);
}

router.param('id', paramFunc);

router.get('/:id', getFunc);

module.exports = router;
