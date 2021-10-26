const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash)
    }
}

class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2021', 'Genesis block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let timCoin = new Blockchain();

console.log("Mining block 1...");
timCoin.addBlock(new Block(1, '02/24/2021', { amount: 4}));

console.log("Mining block 2...");
timCoin.addBlock(new Block(2, '03/13/2021', { amount: 10}));

console.log('Is blockchain valid? ' + timCoin.isChainValid());

//Tamper with the blockchain
// timCoin.chain[1].data = { amount: 100 };
//Try to be clever and recalculate the hash ahead of time
// timCoin.chain[1].hash = timCoin.chain[1].calculateHash();

//Still not valid! The previous hash of the next block is now incorrect
console.log('Is blockchain valid? ' + timCoin.isChainValid());

console.log(JSON.stringify(timCoin, null, 4));