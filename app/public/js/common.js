$(function() {
  $.navActive();
  $.listNav();
});

$.extend($, {
  navActive: function() {
    const src = location.pathname.match(/\/([a-zA-Z]+)/);
    const href = src ? src[1] : "";
    const list = ["", "list", "exp", "power"];
    const n = list.indexOf(href);
    $(".navbox li").removeClass("active");
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

  }
});
