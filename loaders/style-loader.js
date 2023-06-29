let id = 0
const fs = require('fs')
const path = require('path')
module.exports = function (content) {
    const temp = path.resolve(__dirname,`./${id++}.js`)
    // 将css-loader生成的字符串写入文件
    fs.writeFileSync(temp, content)
    // 读出module.exports
    const res = require(temp)
    fs.unlinkSync(temp)
    // 插入样式
    const insertStyle = `
        const style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(res)};
        document.head.appendChild(style);
    `
    return insertStyle
}