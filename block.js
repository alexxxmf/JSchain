const { GENESIS_DATA, MINING_RATE } = require('./config');
const { hashSHA256 } = require('./utils.js');
const hexToBinary = require('hex-to-binary');

class Block{
    constructor({prevBlockHash, transactions, timestamp, hash, difficulty, nonce}){
        this.prevBlockHash = prevBlockHash;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.hash = hash;
        this.difficulty = difficulty;
        this.nonce = nonce;
    }

    static genesis() {
        return new this(GENESIS_DATA)
    }

    static mineBlock({lastBlock, transactions}) {
        const prevBlockHash = lastBlock.hash;
        let nonce = 0;
        let hash, timestamp, binaryHash;
        let { difficulty } = lastBlock;

        do {
            timestamp = Date.now();
            nonce += 1;
            difficulty = Block.adjustDifficulty({
                originalBlock: lastBlock,
                timestamp
            });
            hash = hashSHA256(
                prevBlockHash,
                transactions,
                timestamp,
                nonce,
                difficulty
            );
        } while(hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            prevBlockHash,
            transactions,
            timestamp,
            hash,
            difficulty,
            nonce
        });
    }

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
}

module.exports = Block;