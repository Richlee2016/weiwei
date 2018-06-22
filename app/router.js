'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //page
  router.get('/', controller.home.index);
  router.get('/list', controller.home.list);
  router.get('/vod/:id', controller.home.vod);
  //admin
  router.get('/weiwei/add',controller.home.add);
  router.get('/weiwei/admin',controller.home.admin);
  //api
  router.post('/addPage',controller.home.addPage);
  router.post('/updateImg',controller.home.updateImg);
  router.get('/getPages',controller.home.fetchPage)
};
