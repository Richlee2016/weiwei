module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;
  const Mixed = Schema.Types.Mixed;
  const PageSchema = new mongoose.Schema({
    id:Number,
    title:String,
    author:String,
    content:String,
    listImg:String,
    introImg:String,
    images:[String],
    type:Number, //1.品牌 2.UI 3.网页 4.H5 5.平面
    keywords:String,
    link:String,
    meta: {
      createAt: {
        type: Date,
        default: Date.now()
      },
      updateAt: {
        type: Date,
        default: Date.now()
      }
    }
  });

  PageSchema.pre("save", function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  PageSchema.statics = {
    async addPage(page){
      // console.log(page);
      try {
        page.id = Date.now();
        const _page = new Page(page);
        const res = await _page.save();
        return res;
      } catch (error) {
        console.log(error);        
      }
    }
  };

  const Page = mongoose.model("t_wei_page", PageSchema);
  return Page;
};
