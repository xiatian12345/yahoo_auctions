// 引入 moment.js
const moment = require('moment');

// 待检查的日期字符串
const dateString = '2024-21-18';

// 指定日期格式
const format = 'YYYY-MM-DD';

// 使用 moment 检查格式和有效性
const isValidFormat = moment(dateString, format, true).isValid();
const isValidDate = moment(dateString).isValid();

console.log(`格式是否正确: ${isValidFormat}`); // 检查格式是否符合 YYYY-MM-DD
console.log(`日期是否有效: ${isValidDate}`);   // 检查日期是否是一个有效的日期