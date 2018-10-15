const { exec } = require('child_process');
const config = require('../config/default');

module.exports = url => {
    switch (config.platform) {
        case 'darwin':
            exec(`open ${url}`);
            break;
        case 'win32':
            exec(`start ${url}`);
            break;
        default:
            console.error(`赞不支持${config.platform}系统！`);
            break;
    }
};