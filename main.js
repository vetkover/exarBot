const { Worker } = require('worker_threads');
const { spawn } = require('child_process');
const path = require('path');

const friendWorker = new Worker('./workers/friend.js');
const messagesWorker = new Worker('./workers/messages.js');
const transactionsWorker = new Worker('./workers/transactions.js');
const arbitrationNotify = new Worker('./workers/arbitrationNotify.js');
const subscriptions = new Worker('./workers/subscriptions.js');


