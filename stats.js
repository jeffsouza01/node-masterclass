const os = require('os');
const log = require('./logger')

setInterval(() => {
    const { freemem, totalmem } = os

    const total = parseInt(totalmem() / 1024 / 1024);
    const memory = parseInt(freemem() / 1024 / 1024);
    const perc = parseInt((memory / total ) * 100);

    const stats = {
        free: `${memory} MB`,
        total: `${total} MB`,
        usage: `${perc} %`
    }
    
    console.clear();
    console.log('===== PC Stats ======')
    console.table(stats);
    log(`${JSON.stringify(stats)}\n`)

}, 1000);

