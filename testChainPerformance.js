const Blockchain = require('./blockchain');

const newBlockchain = new Blockchain();

newBlockchain.addBlock({transactions: 'initial transaction'});

let prevBlockTimestamp, currentBlock, timeDifference, averageTime;
const times = [];

for (let i=0; i<1000; i++) {
    prevBlockTimestamp = newBlockchain.chain[newBlockchain.chain.length - 1].timestamp;
    newBlockchain.addBlock({transactions: `transaction-${i}`});
    currentBlock = newBlockchain.chain[newBlockchain.chain.length - 1];

    timeDifference = currentBlock.timestamp - prevBlockTimestamp;
    times.push[timeDifference];

    //averageTime = times.reduce((total, num) => (total + num)); 

    console.log(
        `
        Time spent mining block: ${timeDifference}ms.
        Difficulty: ${currentBlock.difficulty}.
        `
    )
}