const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')
const exec = (command, cb) => {
    childProcess.exec(command, (error, stdout) => {
        cb && cb(error, stdout)
    })
}

/**
 *  1. 将文件内容写入到新文件中，对新文件进行 eslint 检测并 fix
    2. 读取新文件的内容，返回
 */
let id = 0
const schema = {
    type: 'object',
    properties: {
        fix: {
            type: 'boolean'
        }
    }
}
module.exports = function (content) {
    const resourcePath = this.resourcePath
    const callback = this.async()
    const { fix } = this.getOptions(schema) || { fix: false }
    if (fix) {
        const tempName = `./${id++}.js`
        const fullPath = path.resolve(__dirname, tempName)
        // 写入新文件
        fs.writeFileSync(fullPath, content, { encoding: 'utf8' })
        // 带fix检测新文件
        const command = `npx eslint ${fullPath} --fix`
        exec(command, (error, stdout) => {
            if (error) {
                console.log(stdout)
            }
            // 读取新文件
            const newContent = fs.readFileSync(fullPath, { encoding: 'utf8' })
            fs.unlinkSync(fullPath)
            callback(null, newContent)
        })
    } else {
        // 没有选择fix则还是走旧逻辑，没必要读写文件
        const command = `npx eslint ${resourcePath}`
        exec(command, (error, stdout) => {
            if (error) {
                console.log(stdout)
            }
            callback(null, content)
        })
    }
}