'use strict';

const Controller = require('egg').Controller;
const formidable = require('koa-formidable');
class HomeController extends Controller {
  async index(ctx) {
    await ctx.render('index.html');
  }
  async list(ctx) {
    const res = await ctx.service.home.fetchPage({page:1,size:100}); 
    if(res){
      await ctx.render('list.html',{res:res});
    }else{
      ctx.redirect('/')
    }
  }
  async vod(ctx) {
    const {id} = ctx.params;
    const res = await this.service.home.fetchVod(id);
    if(res){
      await ctx.render('vod.html',{data:res});
    }else{
      ctx.redirect('/')
    }
  }
  async add(ctx) {
    await ctx.render('add.html');
  }
  async admin(ctx) {
    await ctx.render('admin.html');
  }

  // 添加产品
  async addPage(ctx) {
    const page = ctx.request.body;
    const res = await this.service.home.addPage(page);
    ctx.body = res;
    ctx.status = 201;
  }
  // 上传图片
  async updateImg(ctx) {
    const form = formidable.parse(ctx.request);
    const res = await ctx.service.home.uploadImage(form);
    ctx.body = 1;
    ctx.status = 201;
  }
  //删除内容
  async delVod(ctx){
    const {id} = ctx.body;
    const res = await this.ctx.service.home.delVod(id);
    ctx.body = {msg:"删除成功"}
    ctx.status = 201;
  }
  // 请求列表
  async fetchPage(ctx) {
    const {
      page = 1, size = 10, type
    } = ctx.query;
    const res = await this.service.home.fetchPage({
      page: Number(page),
      size: Number(size),
      type
    });
    ctx.body = res;
    ctx.status = 200;
  }
}

module.exports = HomeController;