const program = require('commander');
const pkg = require('../package.json');
const Server = require('./app');
const tipTxt = '没有该命令，请直接通过 goany s 启动或者通过 -h 查看帮助';

program
    .version(pkg.version, '-v, --version')
    .command('start')
    .description('启动程序')
    .alias('s')
    .option('-p, --port [port]', 'start at this port')
    .option('-d, --dir [dir]', 'start at this directory')
    .action(option => {
        const conf = {
            port: option.port,
            root: option.dir
        };
        const server = new Server(conf);
        server.start();
    });

program
    .command('*')
    .description('不支持的命令')
    .action(() => console.log(tipTxt));

program
    .parse(process.argv);

if(process.argv.length < 3){
    console.log(tipTxt);
}