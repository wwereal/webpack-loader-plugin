const glob = require('glob');
const path = require('path');
const fs = require('fs')

class ResourceAnalyzerPlugin {
  constructor(outputPath) {
    this.outputPath = outputPath;
  }
  apply (compiler) {
    // 在完成构建后触发的事件钩子
    compiler.hooks.done.tap('ResourceAnalyzerPlugin', (stats) => {
      // 收集资源信息的对象
      const resourceMap = {};

      // 使用 glob 匹配项目内的所有静态资源文件
      const files = glob.sync('./src/**/*.{jpg,png,gif,svg,eot,ttf,woff,woff2}', {
        cwd: compiler.context, // 需要设置项目根目录
        nodir: true, // 排除文件夹
      });

      // 遍历匹配到的文件，收集资源信息
      files.forEach((file) => {
        // 获取文件的绝对路径
        const absolutePath = path.resolve(compiler.context, file);

        // 获取文件相对于项目根目录的路径
        const relativePath = path.relative(compiler.options.context, absolutePath);

        // 获取文件引用该资源的模块和组件路径
        const modules = stats.compilation.modules.filter((module) => {
          if (module.resource) {
            const modulePath = path.relative(compiler.options.context, module.resource);
            return modulePath.indexOf(file) !== -1;
          }
          return false;
        });

        // 将资源信息添加到 resourceMap 对象中
        resourceMap[file] = {
          path: relativePath,
          components: modules.map((module) => {
            const componentPath = path.relative(compiler.options.context, module.resource);
            return componentPath;
          }),
        };
      });

      // 将 resourceMap 输出为 JSON 文件
      fs.writeFileSync(this.outputPath, JSON.stringify(resourceMap, null, 2));

      console.log('Resource analysis completed.');
    });
  }

}

module.exports = ResourceAnalyzerPlugin