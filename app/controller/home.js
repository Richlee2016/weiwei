"use strict";

const Controller = require("egg").Controller;
const formidable = require("koa-formidable");
const _ = require("lodash");
class HomeController extends Controller {
  async index(ctx) {
    await ctx.render("index.html");
  }
  async list(ctx) {
    const res = await ctx.service.home.fetchPage({ page: 1, size: 100});
    const data = res.filter(o => o.listImg);
    if (res) {
      await ctx.render("list.html", { res: res });
    } else {
      ctx.redirect("/");
    }
  }
  async vod(ctx) {
    const { id } = ctx.params;
    const { data, txt, keyval,next } = await this.service.home.fetchVod(id);
    if (data) {
      await ctx.render("vod.html", {
        data,
        title: _.take(keyval, 2),
        keyval: _.drop(keyval, 2),
        txt,
        next
      });
    } else {
      ctx.redirect("/");
    }
  }
  async power(ctx) {
    await ctx.render("power.html");
  }
  async exp(ctx) {
    await ctx.render("exp.html");
  }

  async admin(ctx) {
    await ctx.render("admin/index.html");
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
  async delVod(ctx) {
    const { id } = ctx.body;
    const res = await this.ctx.service.home.delVod(id);
    ctx.body = { msg: "删除成功" };
    ctx.status = 201;
  }
  // 请求列表
  async fetchPage(ctx) {
    const { page = 1, size = 10, type } = ctx.query;
    const res = await this.service.home.fetchPage({
      page: Number(page),
      size: Number(size),
      type
    });
    ctx.body = res;
    ctx.status = 200;
  }
  //请求图片列表
  async fetchImages(ctx) {
    const { key } = ctx.query;
    console.log(key);
    let send = !!key ? { key } : {};
    const res = await this.service.home.fetchImg(send);
    ctx.body = res;
    ctx.status = 200;
  }
  // 关联产品图片
  async setImages(ctx) {
    const { Id, Type, Images } = ctx.request.body;
    const res = await this.service.home.setImg({ Id, Type, Images });
    ctx.body = "OK";
    ctx.status = 201;
  }
}

module.exports = HomeController;
