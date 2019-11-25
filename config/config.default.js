'use strict';

module.exports = appInfo => {
  let config = (exports = {});
  config = {
    richCof: {
      qiniu: {
        cname: "http://go.richfly.cn/",
        bucket: "eggapi",
        AK: "OBDA2gN9-FJfAzWExCHGNNG9QW5FqNtUrD57IwIi",
        SK: "lkrOjtgXY4WmN7NcJNSKNXb7aLue13_CPg_0X0NH"
      }
    },
    keys: appInfo.name + "_1522116013667_2328",
    middleware: ["errorHandler"],
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.html': 'nunjucks',
      },
    },
    mongoose: {
      url: "mongodb://120.79.228.82:27017/weiwei",
      options: {}
    },
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true
      },
      domainWhiteList: ['http://localhost:8087', 'http://192.168.2.120:8087', 'http://book.richfly.cn'],
    },
    cors: {
      allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
    },
  };

  return config;
};