const Block = require('../block.js');
const { hashSHA256 } = require('../utils.js');

const { GENESIS_DATA } = require('../config.js');

describe('Block', () => {
    beforeEach(() => {})

    it('Should match the parameters is passed at instantiation', () => {
        const timestamp = Date.now();
        const prevBlockHash = 'x0123';
        const transactions = ['transaction01', 'transaction02'];
        const hash = 'x0abc';
        const nonce = 1;
        const difficulty = 1;

        const block = new Block({
            prevBlockHash,
            transactions,
            timestamp,
            hash,
            nonce,
            difficulty
        });

        expect(block.prevBlockHash).toEqual(prevBlockHash);
        expect(block.transactions).toEqual(transactions);
        expect(block.timestamp).toEqual(timestamp);
        expect(block.hash).toEqual(hash);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);

    });

    it('Should create a genesis block', () => {
        const genesisBlock = Block.genesis();

        expect(genesisBlock instanceof Block).toBe(true);
        
        expect(genesisBlock).toEqual(GENESIS_DATA)
    });

    it('Should mine a block given a last block and some transactions', () => {
        const lastBlock = Block.genesis();
        const transactions = ['transaction01']
 
        const minedBlock = Block.mineBlock({lastBlock, transactions});

        expect(minedBlock instanceof Block).toBe(true);

        expect(minedBlock.transactions).toEqual(transactions);

        expect(minedBlock.timestamp).not.toEqual(undefined);
        
        expect(minedBlock.hash).toEqual(hashSHA256({

        }))
    });
});

/*
    TODO:

    Adding more tests to check that the difference between continuous blocks in
    terms of difficulty is 1.

*/