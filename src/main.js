import { sum } from './utils.js';
const a = 5;
console.log(a, 'hello');
const my_sum = sum(4, 8);
console.log(my_sum);

document.write('hello word');
import mdHtml from './README.md'
const content = document.createElement('div')
content.className = 'content'
content.innerHTML = mdHtml
document.body.appendChild(content)
