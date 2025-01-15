const fs = require('fs');
const util = require('util');

// 创建一个写入流，用于将日志写入文件
const logStream = fs.createWriteStream('app.log', { flags: 'a' });

// 重定向 console.log 的输出到文件
console.log = function () {
    // 使用 util.format 格式化所有参数
    const message = util.format.apply(null, arguments);
    logStream.write(message + '\n');
};

// 使用 console.log 输出日志
console.log('Hello', 'this', 'is', 'a', 'log', 'message:', 1, 2, 3);