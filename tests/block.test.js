const Block = require('../block.js');

const { GENESIS_DATA } = require('../config.js');

describe('Block', () => {
    beforeEach(() => {})

    it('Should match the parameters is passed at instantiation', () => {
        const timestamp = Date.now();
        const prevBlockHash = 'x0123';
        const transactions = ['transaction01', 'transaction02'];
        const hash = 'x0abc';

        const block = new Block({prevBlockHash, transactions, timestamp, hash});

        expect(block.prevBlockHash).toEqual(prevBlockHash);
        expect(block.transactions).toEqual(transactions);
        expect(block.timestamp).toEqual(timestamp);
        expect(block.hash).toEqual(hash);
    });

    it('Should create a genesis block', () => {
        const genesisBlock = Block.genesis();

        expect(genesisBlock instanceof Block).toBe(true);
        
        expect(genesisBlock).toEqual(GENESIS_DATA)
    })
});