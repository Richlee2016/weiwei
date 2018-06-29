module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;
  const ImgSchema = new mongoose.Schema({
    keyword:String,
    src:String,
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

  ImgSchema.pre("save", function(next) {
    if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
      this.meta.updateAt = Date.now();
    }
    next();
  });

  ImgSchema.statics = {
    
  };

  const Img = mongoose.model("t_wei_img", ImgSchema);
  return Img;
};
