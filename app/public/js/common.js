$(function() {
  $.navActive();
  $.listNav();
  $.wiDirect();
});

$.extend($, {
  navActive: function() {
    const src = location.pathname.match(/\/([a-zA-Z]+)/);
    const href = src ? src[1] : "";
    const list = ["", "list", "exp", "power","vod"];
    let n = list.indexOf(href);
    $(".navbox li").removeClass("active");
    if(n === 4){
      n=1;
    }
    $(".navbox li")
      .eq(n)
      .addClass("active");
  },
  listNav: function() {
    $("#work-hd a").each(function(i, o) {
      $(o).click(function() {
        $("#work-hd a").removeClass("active");
        $(o).addClass("active");
        const type = $(o).data("classify");
        // console.log(type);
        $("#work-bd>div").hide();
        $("#work-bd>div").each(function(i,o){
            if(type === $(o).data("classify")){
                $(o).show();
            };
        })
        if(type === 0){
            $("#work-bd>div").show();
        };
      });
    });
  },
  wiDirect:function(){
    const src = location.pathname.match(/\/([a-zA-Z]+)/);
    const href = src ? src[1] : "";
    var wi = $(document).width();
    if(wi<780 & href !== 'list'){
      location.href = '/list'
    };
  }
});
