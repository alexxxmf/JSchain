const Blockchain = require('../blockchain.js');
const { GENESIS_DATA } = require('../config');

describe('Blockchain', () => {
    beforeEach(() => {
        this.blockchain = new Blockchain();
    })

    it('Should contain a chain(array) of length 1', () => {
        expect(this.blockchain.chain.length).toEqual(1);
    });

    it('First block of the chain should be genesis block', () => {
        const genesisBlock = this.blockchain.chain[0];
        expect(genesisBlock.prevBlockHash).toEqual(GENESIS_DATA.prevBlockHash);
    });

    describe('addBlock()', () => {
        it('Should add a new blockso that chain length is 2', () => {
            this.blockchain.addBlock({transactions: ['transaction01']});
            expect(this.blockchain.chain.length).toEqual(2);
        })
    })

});