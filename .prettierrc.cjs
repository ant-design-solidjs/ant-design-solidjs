module.exports = {
    // 超过最大值换行
    printWidth: 120,
    // 缩进字节数
    tabWidth: 4,
    // 缩进不使用tab, 使用空格
    useTabs: false,
    // 使用单引号代替双引号
    singleQuote: true,
    // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    proseWrap: 'preserve',
    //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid: 省略括号
    arrowParens: 'avoid',
};
