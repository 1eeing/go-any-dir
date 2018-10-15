const fs = require('fs');
const path = require('path');
const mime = require('./mime');
const ejs = require('ejs');
const list = fs.readFileSync(path.join(__dirname, '../template/list.ejs'), 'utf8');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

module.exports = async (req, res, filePath, conf) => {
    try {
        const stats = await stat(filePath);
        res.statusCode = 200;
        if(stats.isDirectory()){
            const files = await readdir(filePath);
            const dir = path.relative(conf.root, filePath);
            res.setHeader('Content-Type', 'text/html;charset=UTF-8');
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files
            };
            res.write(ejs.render(list, data));
            res.end();
        }else if(stats.isFile()){
            res.setHeader('Content-Type', `${mime(filePath)};charset=UTF-8`);
            fs.createReadStream(filePath).pipe(res);
        }
    } catch (error) {
        console.error(error);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
        res.write(`${filePath} is not a directory or file.`);
        res.end();
    }
};