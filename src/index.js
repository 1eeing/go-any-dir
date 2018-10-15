const program = require('commander');
const pkg = require('../package.json');
const Server = require('./app');

program
    .version(pkg.version, '-v, --version')
    .option('-p, --port [port]', 'start at this port')
    .option('-d, --dir [dir]', 'start at this directory')
    .parse(process.argv);

const conf = {
    port: program.port,
    root: program.dir
};
const server = new Server(conf);
server.start();