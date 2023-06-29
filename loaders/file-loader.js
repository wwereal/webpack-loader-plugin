/**
 * file-loader 是一个 raw loader ，也就是它接受的内容应该是二进制的图片数据，它要做的有两件事：
将图片输出到打包结果中
将打包结果的图片路径替换代码的路径
 */
const loaderUtils = require('loader-utils')
module.exports = function (content, map = null, meta = {}) {
    // 是否被url-loader处理过，处理过的话返回base74，url-loader在下面小结具体实现
    const { url,base64 } = meta
    if (url) {
        return `module.exports = "${base64}"`
    } else {
        // 根据当前的上下文，生成一个文件路径，基于dist打包目录，这里生成的文件地址就是：dist/assets/img.jpg
        const interpolateName = loaderUtils.interpolateName(
            this,
            'assets/[name].[contenthash].[ext][query]',
            { content }
        )
        // webpack特有方法，生成一个文件
        this.emitFile(interpolateName, content);
        return `module.exports = "${interpolateName}"`
    }
}
// 添加标记，表示这是一个raw loader
module.exports.raw = true