const { Worker } = require('worker_threads');
const path = require('path');

const friendWorker = new Worker('./workers/friend.js');
const messagesWorker = new Worker('./workers/messages.js');
const transactionsWorker = new Worker('./workers/transactions.js');


