const co = require('co');
const prompt = require('co-prompt');

module.exports = () => {
    co(function *() {
        const tplName = yield prompt('请输入模板名称');
        const engine = yield prompt('请输入模板引擎');

        console.log(tplName, engine);
    });
};
