const { GENESIS_DATA } = require('./config');
const { hashSHA256 } = require('./utils.js');

class Block{
    constructor({prevBlockHash, transactions, timestamp, hash}){
        this.nonce = 0;
        this.prevBlockHash = prevBlockHash;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.hash = hash;
    }

    static genesis() {
        return new this(GENESIS_DATA)
    }

    static mineBlock({lastBlock, transactions}) {
        const timestamp = Date.now();
        const prevBlockHash = lastBlock.hash;
        const hash = hashSHA256(prevBlockHash, transactions, timestamp)

        return new this({
            prevBlockHash,
            transactions,
            timestamp,
            hash
        });
    }
}

module.exports = Block;