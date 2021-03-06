//浏览器允许脚本异步加载，下面就是两种异步加载的语法。

/* 
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
 */

/**
 * defer与async的区别是：defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；
 * async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。
 * 另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。
*/

//浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。

//<script type="module" src="./foo.js"></script>

/**
 * 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，
 * 即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。
*/

/**
 * 如果网页有多个<script type="module">，它们会按照在页面出现的顺序依次执行。
 * <script>标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。
 * 一旦使用了async属性，<script type="module">就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。
*/

//<script type="module" src="./foo.js" async></script>

//=======================================
//ES6 模块与 CommonJS 模块的差异

/**
 * CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
 * CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
 * CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
*/

//第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。