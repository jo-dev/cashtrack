/**
 * Created by haebor on 29.08.2014.
 */

const BASE_62_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE_36_ALPHABET = "0123456789ABZDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE_26_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// encode

function base10toBase62(decimal)
{
    var base = BASE_62_ALPHABET.length;
    var result = '';
    if(decimal == 0)
    {
        return '0';
    }
    while(decimal >= 1)
    {
        var mod = decimal % base;
        var div = decimal / base;
        result = BASE_62_ALPHABET.charAt(mod) + result;
        decimal = div;
    }
    return result;
}

function parseBase36(char)
{
    var result = parseInt(char);
    if(isNaN(result))
    {
        return 10 + parseBase26(char);
    }
    return result;
}

function parseBase26(char)
{
    var result = BASE_26_ALPHABET.indexOf(char);
    if(result == -1)
    {
        return NaN;
    }
    else
    {
        return result;
    }
}

// decode

function base62ToSerial(base62Num)
{
    var decimalVal = 0;
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
    return BASE_36_ALPHABET.charAt(val);
}
function toBase26(val)
{
    return BASE_26_ALPHABET.charAt(val);
}

function parseBase62(char)
{
    return BASE_62_ALPHABET.indexOf(char);
}

module.exports.base62ToSerial = base62ToSerial;