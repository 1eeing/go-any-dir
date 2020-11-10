const http = require('http');
const path = require('path');
const chalk = require('chalk');
const config = require('./config/default');
const route = require('./helper/route');
const openUrl = require('./helper/openUrl');
const serveHandler = require('serve-handler');

class Server {
    constructor(conf){
        this.conf = Object.assign({}, config, conf);
        this.conf.port = this.conf.port || config.port;
        this.conf.root = this.conf.root || config.root;
    }

    start() {
        const server = http.createServer(async (req, res) => {
            await serveHandler(req, res, {
                public: this.conf.root
            });
        });

        server.listen(this.conf.port, this.conf.domain, () => {
            const url = `http://${this.conf.domain}:${this.conf.port}`;
            openUrl(url);
            console.log(chalk.green(`start a http server listening ${url} ...`));
        });
    }
}

module.exports = Server;

