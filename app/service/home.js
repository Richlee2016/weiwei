const Service = require("egg").Service;
const _ = require("lodash");
class HomeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Page = this.ctx.model.Page;
    this.Img = this.ctx.model.Img;
    this.proType = ["品牌","UI","网页","H5","平板"]
  }
  /**
   * 获取首页列表
   * @return {object} 列表数据
   */
  async getIndexList() {}
  /**
   * 根据表单提交内容 添加产品
   * Cb:
   * @param {Object} 产品信息
   * @return {Object} 已保存的产品信息
   */
  async addPage(page) {
    // console.log(page);
    try {
      const res = await this.Page.addPage(page);
      return res;
    } catch (error) {
      console.log(errors);
    }
  }
  /**
   * 根据表单提交 的图片 上传七牛云并保存
   * Cb:
   * @param {Object} 表单信息
   */
  async uploadImage(form) {
    try {
      const { res, fields } = await this.service.qiniu.addImg(form);
      const _img = new this.Img({
        src: res.key,
        keyword: fields.keyword
      });
      await _img.save();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * 根据条件查询详情
   * @param {Number} page 页数
   * @param {Number} size 数量
   * @param {Number} type 类型
   * @return {Object} 详情
   */
  async fetchPage({ page = 1, size = 10, type }) {
    let skip = (page - 1) * size;
    let query = {};
    if (type) {
      // query ={$where:`this.images.length > 0 && this.type === ${type}`};
      query = { $where: `this.type === ${type}` };
    }
    const res = await this.Page.find(query)
      .limit(size)
      .skip(skip)
      .exec();
    // console.log(res);
    return res;
  }
  async fetchVod(id) {
    const res = await this.Page.find({ id:{$gte:id} }).limit(2).exec();
    const data = res ? res[0] : null;
    const next = res? res[1]:null;
    // console.log(1,data);
    let txt = [],keyval = [];
    if (data) {
      txt = data.content.split("#").map(o => o.split("&"));
      keyval = data.keywords ? data.keywords.split("#") : [];
    }
    let nextOne = {}
    if(next){
      nextOne = {
        id:next.id,
        keyval:next.keywords ? next.keywords.split("#").join("&") : [],
        type:this.proType[next.type],
        title:next.title,
        img:next.introImg || next.listImg || next.images[0]
      }
    };
    return {
      data:data,
      next:nextOne,
      txt,
      keyval
    };
  }
  /**
   * @param {Numver} id 删除id
   */
  async delVod(id) {
    const res = await this.Page.remove({ id });
  }
  /**
   * @param {key} 根据key 获取图片
   */
  async fetchImg({ key }) {
    try {
      let query = {};
      if (key) {
        query = { keyword: key };
      }
      const res = await this.Img.find(query).exec();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @param {Id} 添加的项目
   * @param {Type} 根据type 添加图片
   * @param {Images} 图片地址
   */
  async setImg({ Id, Type, Images }) {
    const type = Number(Type);
    try {
      const _page = await this.Page.findOne({ id: Id }).exec();
    switch (type) {
      case 1:
        _page.listImg = Images[0];
        break;

      case 2:
        _page.introImg = Images[0];
        break;

      case 0:
        _page.images = Images;
        break;
    }
    await _page.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = HomeService;
