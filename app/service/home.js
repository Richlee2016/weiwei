const Service = require("egg").Service;
const _ = require("lodash")
class HomeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Page = this.ctx.model.Page;
  }
/**
 * 获取首页列表
 * @return {object} 列表数据
 */
  async getIndexList(){
    
  };
  /**
   * 根据表单提交内容 添加产品
   * Cb:
   * @param {Object} 产品信息
   * @return {Object} 已保存的产品信息
   */
  async addPage(page) {
    console.log(page);
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
      const {
        res,
        fields
      } = await this.service.qiniu.addImg(form);
      console.log(res,fields);
      const vod = await this.Page.findOne({
        id: Number(fields.uuid)
      }).exec();
      if(vod){
        console.log(res.key);
        vod.images = vod.images?vod.images:[];
        vod.images.push(res.key)
        await vod.save();
      };
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
  async fetchPage({page=1,size=10,type}){
    let skip = (page - 1) * size;
    let query ={$where:`this.images.length > 0`};
    if(type){
      query ={$where:`this.images.length > 0 && this.type === ${type}`};
    };
    const res =await this.Page.find(query).limit(size).skip(skip).exec();
    console.log(res);
    return res;
  }
  async fetchVod(id){
    const res = await this.Page.find({id}).exec();
    const data = res?res[0] : null;
    // console.log(1,data);
    if(data){
      data.images = _.drop(data.images);
      data.txt = data.content.split("|").map(o => o.split("&"));
    }
    return data?data : null;
  }
  /**
   * @param {Numver} id 删除id
   */
  async delVod(id){
    const res = await this.Page.remove({id});
  }

}

module.exports = HomeService;