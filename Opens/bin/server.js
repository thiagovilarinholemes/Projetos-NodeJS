'use strict' 

/** Imports */
const app = require('../src/app'); 
const debug = require('debug')('nodestr:server');
const http = require('http');

/** Port */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/** Create server */
const server = http.createServer(app);

/** Run server */
server.listen(port);
console.log('API run port: ' + port + ' (OK) (^_^)/');

/** Error */
server.on('error', onError);

/** Function generate port */
function normalizePort(val){
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }
    if(val >= 0){
        return port
    }

    return false;
}

/** Error deals */
function onError(error){
    if(error.syscall !== 'listem'){
        throw error;
    }

    const bind = typeof port === 'String' ?
        'Pipe ' + port :
        'Port ' + port;
    switch(error.code){
        case 'EACESS':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/** Function debug */
server.on('listening', onListening);
function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'Pipe ' + addr
        : 'Port ' + addr.port;

    debug('Listening on ' + bind);    
}

/** Function onListening */
server.on('listening', onListening);
function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'Pipe ' + addr
        : 'Port ' + addr.port;

    debug('Listening on ' + bind);    
}
