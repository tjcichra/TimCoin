const { Blockchain, Transaction } = require('./blockchain')

let timCoin = new Blockchain();

timCoin.createTransaction(new Transaction('address1', 'address2', 100));
timCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner.');
timCoin.minePendingTransactions('tims-address');

console.log();
console.log('Balance of tim is', timCoin.getBalanceOfAddress('tims-address'));

console.log('Starting the miner again.');
timCoin.minePendingTransactions('tims-address');

console.log();
console.log('Balance of tim is', timCoin.getBalanceOfAddress('tims-address'));