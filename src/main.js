const { Blockchain, Transaction } = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('1ce2bfcac550901793186ad8199721594f2441d8ebd669933987bbd8f9683ac4');
const myWalletAddress = myKey.getPublic('hex');

let timCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'justin', 10);
tx1.signTransaction(myKey);
timCoin.addTransaction(tx1);


console.log('Starting the miner.');
timCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log('Balance of tim is', timCoin.getBalanceOfAddress(myWalletAddress));

console.log('Starting the miner again.');
timCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log('Balance of tim is', timCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid?', timCoin.isChainValid());
console.log();

console.log('');
timCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', timCoin.isChainValid());