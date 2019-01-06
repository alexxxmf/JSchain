const DIFFICULTY = 3;

const GENESIS_DATA = {
    nonce: 0,
    difficulty: DIFFICULTY,
    prevBlockHash: '----origin----',
    transactions: [],
    timestamp: Date.now(),
    hash: '0x01'
}

const MINING_RATE = 1000; //miliseconds


module.exports = { GENESIS_DATA, MINING_RATE, DIFFICULTY };