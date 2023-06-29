const schema = {
  type: 'object', //options是一个对象
  properties: {
      //author是一个字符串
      author: {
        type: 'string'
      },
      //email是一个字符串
      email: {
        type: 'string'
      }
  }
};
module.exports = function (content) {
  const options = this.getOptions(schema) || {};
  const { author = 'null', email = 'null' } = options;
  const newContent = `
    /**
     * @Author: "${author}"
     * @Email: "${email}"
     * */
  
    ${content}
  `;
  return newContent;
}