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
  router.get('/power', controller.home.power);
  router.get('/exp', controller.home.exp);
  //admin
  // router.get('/weiwei/add',controller.home.add);
  router.get('/weiwei/admin',controller.home.admin);
  // router.get('/weiwei/imgbox',controller.home.imgbox);
  // router.get('/weiwei/addimg',controller.home.addimg);
  //api
  router.post('/addPage',controller.home.addPage);
  router.post('/updateImg',controller.home.updateImg);
  router.get('/getPages',controller.home.fetchPage);
  router.get('/getImg',controller.home.fetchImages);
  router.post('/setImages',controller.home.setImages);
  router.post('/delVod',controller.home.delVod);
};
