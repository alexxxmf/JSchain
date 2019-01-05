const { hashSHA256 } = require('../utils.js');

describe('hashSHA256()', () => {
    it('Should produce a hash out of a given set of inputs no matter the order', () => {
        expect(hashSHA256('1', '2', '3')).toEqual(hashSHA256('3', '2', '1'));
    });
});