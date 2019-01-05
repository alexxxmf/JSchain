const Block = require('./block.js');
const { hashSHA256 } = require('./utils.js');

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
    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }

        for(let i=1; i < chain.length; i++){
            const block = chain[i];

            const hashFromPrevBlock = chain[i - 1].hash;

            const { timestamp, prevBlockHash, hash, transactions } = block;

            if (prevBlockHash !== hashFromPrevBlock) {
                return false;
            }

            if (hashSHA256(prevBlockHash, transactions, timestamp) !== block.hash) {
                return false;
            }
        }

        return true;
    }
};

module.exports = Blockchain;