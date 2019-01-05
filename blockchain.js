const Block = require('./block.js');

class Blockchain{
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({transactions}) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            transactions
        })
        this.chain.push(newBlock);
    }
};

module.exports = Blockchain;