const crypto = require('crypto');
const hexToBinary = require('hex-to-binary');

const hashSHA256 = (...inputs) => {
    const hash = crypto.createHash('sha256');

    hash.update(inputs.sort().join(' '));

    return hash.digest('hex');
}

// Instead of installing a library opted for using this small snippet of code
// https://stackoverflow.com/questions/45053624/convert-hex-to-binary-in-javascript?noredirect=1&lq=1
const hex2bin = (hex) => {
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

//Test this thing and seems the implemention is reallllllly slow
//to the point sometimes blocks are not even mined depending the initial difficulty
// possibly is taking to much time so block time is severely

module.exports = { hashSHA256 };