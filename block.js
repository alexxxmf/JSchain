const { GENESIS_DATA } = require('./config');

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
}

module.exports = Block;