const Blockchain = require('../blockchain.js');
const Block = require('../block.js');
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
        it('Should add a new block so that chain length is 2', () => {
            this.blockchain.addBlock({transactions: ['transaction01']});
            expect(this.blockchain.chain.length).toEqual(2);
        });
    });

    describe('isValidChain()', () => {
        it('Should check that genesis block is the first element in the chain', () => {
            expect(Blockchain.isValidChain(this.blockchain.chain)).toBe(true);
        });

        it('Should check that blocks have the right content', () => {
            this.blockchain.addBlock({transactions: ['transaction01xx']});
            this.blockchain.addBlock({transactions: ['transaction02xx']});
            this.blockchain.addBlock({transactions: ['transaction03xx']});
            expect(Blockchain.isValidChain(this.blockchain.chain)).toBe(true);
            this.blockchain.chain[2].transactions = ['malicious transaction 01'];
            expect(Blockchain.isValidChain(this.blockchain.chain)).toBe(false);

        });
    });

});