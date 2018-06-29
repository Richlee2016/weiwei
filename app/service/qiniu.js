const Service = require("egg").Service;
const qiniu = require("qiniu");
const nanoid = require("nanoid");
class QiniuService extends Service {
    constructor(ctx) {
        super(ctx);
        this.config = ctx.app.config.richCof;
        this.isOld = null;
        this.Token = null;
        this.loader = this.getLoadConf();
    }
    _sleep(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        })
    }

    // getToken
    getToken() {
        console.log(this.config.qiniu.AK, this.config.qiniu.SK);
        const mac = new qiniu.auth.digest.Mac(this.config.qiniu.AK, this.config.qiniu.SK);
        const bucket = this.config.qiniu.bucket;
        const options = {
            scope: bucket,
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        return putPolicy.uploadToken(mac);
    }
    // token 的时间设置
    tokenTimeOut() {
        const ctx = this.ctx;
        const nowTime = Date.now();
        const isDisTime = this.isOld && (nowTime - this.isOld > 3000000)  ? true : false;
        if (!this.isOld || isDisTime) {
            this.isOld = nowTime;
            this.Token = this.getToken();
            ctx.logger.info(`七牛token${isDisTime?"已经过期" :"没有过期"},token为${this.Token}`);
        };
    }
    // get Token
    getLoadConf() {
        let config = new qiniu.conf.Config()
        config.zone = qiniu.zone.Zone_z2;
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        return {
            formUploader,
            putExtra
        }
    }
    // 上传封装
    uploadToQiniu(url, key) {
        this.tokenTimeOut();
        const {
            formUploader,
            putExtra
        } = this.loader;
        return new Promise((resolve, reject) => {
            formUploader.putFile(this.Token, `weiwei_${nanoid()}`, url, putExtra, function (respErr,
                respBody, respInfo) {
                if (respErr) {
                    reject(respErr);
                    throw respErr;
                }
                if (respInfo.statusCode == 200) {
                    resolve(respBody);
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                    reject(respInfo);
                }
            });
        })
    }

    addImg(form) {
        return new Promise((resolve,reject) => {
            form(async (opt, obj) => {
                const fields = obj.fields;
                const file = obj.files.file;
                const res = await this.uploadToQiniu(file.path, file.name);
                if(res.key){
                    resolve({
                        res,
                        fields
                    })
                }else{
                    reject("七牛上传失败")
                };
            })
        })
    }
}

module.exports = QiniuService;