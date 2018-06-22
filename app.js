module.exports = app => {
    app.messenger.on('video_qiniu', data => {
        const { href ,movie} = data;
        const ctx = app.createAnonymousContext();
        ctx.runInBackground(async () => {
            const video = await ctx.service.crawler.crawlerVideo(href);
            if(video){
                movie.video = video;
                const qiniu = await ctx.service.qiniu.movieQiniuUpdate(movie);
                console.log(`${qiniu.list.title}在七牛上传成功`);
            };
        });
    });
}