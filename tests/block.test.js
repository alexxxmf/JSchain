const Block = require('../block.js');
const { hashSHA256 } = require('../utils.js');

const { GENESIS_DATA, MINING_RATE } = require('../config.js');

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

        expect(minedBlock.hash).toEqual(hashSHA256(
            minedBlock.prevBlockHash,
            minedBlock.transactions,
            minedBlock.timestamp,
            minedBlock.nonce,
            minedBlock.difficulty,
        ))
    });

    describe('mineBlock()', () => {
        it('', () => {

        });
    });

    describe('adjustDifficulty()', () => {
        it('Should lower by one difficulty if difference between previous block timestamp and current one is more than mining rate', () => {
            const block = Block.genesis();
            const timestamp = block.timestamp + MINING_RATE + 500
            const difficultyBefore = block.difficulty;
            const difficultyAfter = Block.adjustDifficulty({ originalBlock: block, timestamp});
            expect(difficultyBefore - difficultyAfter).toEqual(1);
        });

        it('Should increase by one difficulty if difference between prev. block timestamp and current one is less than mining rate', () => {
            const block = Block.genesis();
            const timestamp = block.timestamp + MINING_RATE - 500
            const difficultyBefore = block.difficulty;
            const difficultyAfter = Block.adjustDifficulty({ originalBlock: block, timestamp});
            expect(difficultyAfter - difficultyBefore).toEqual(1);
        });

        it('Should check that difficulty is always equal or bigger than 1', () => {
            const block = Block.genesis();
            block.difficulty = -10;
            const timestamp = block.timestamp + 800
            const difficulty = Block.adjustDifficulty({ originalBlock: block, timestamp});
            expect(difficulty).toEqual(1);
        });
    });

});

/*

    static adjustDifficulty({ originalBlock, timestamp}) {
        let { difficulty } = originalBlock;
        if (difficulty < 1) {
            difficulty = 1;
        }
        const difference = timestamp - originalBlock.timestamp;
        if (difference > MINING_RATE) {
            return difficulty - 1;
        }

        return difficulty + 1;
    }

*/

/*
    TODO:

    Adding more tests to check that the increment between continuous blocks in
    terms of difficulty is [-1,]

*/