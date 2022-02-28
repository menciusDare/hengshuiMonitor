/*
 $(function(){
  // 模态框关闭
  $('.modal-close').on("click",function(){
    $(".mask").removeClass("show");
    $(this).parent().removeClass("is-show");
    $(".mask").fadeOut();
    $(this).parent().fadeOut();
  })
  
  // tab切换
  $('.tab-head>li').on("click",function(){
    var $index=$(this).index();
    $(this).parent().children().removeClass("is-active");
    $(this).addClass("is-active");

    var $siblings=$(this).parent().parent().siblings(".tab-bd");
    $siblings.show();
    $siblings.children().removeClass("is-active");
    $siblings.children().eq($index).addClass("is-active");
  })
})

 $(function(){
   // tab1里小视频横向滚动
   $('.video-auto').niceScroll({
     cursorcolor: "#ccc",  // 滚动条颜色，使用16进制颜色值
     cursorwidth: "6px",  // 滚动条的宽度，单位：像素
     cursorborder: "none",  // CSS 方式定义滚动条边框
     cursorborderradius: "5px",  // 滚动条圆角（像素）
   });
   // tab2里视频滚动
   $('.video-average').niceScroll({
     cursorcolor: "#eaeaea",  // 滚动条颜色，使用16进制颜色值
     cursorwidth: "6px",  // 滚动条的宽度，单位：像素
     cursorborder: "none",  // CSS 方式定义滚动条边框
     cursorborderradius: "5px",  // 滚动条圆角（像素）
   });
   // tab3里视频滚动
   $('.video-ratio').niceScroll({
     cursorcolor: "#eaeaea",  // 滚动条颜色，使用16进制颜色值
     cursorwidth: "6px",  // 滚动条的宽度，单位：像素
     cursorborder: "none",  // CSS 方式定义滚动条边框
     cursorborderradius: "5px",  // 滚动条圆角（像素）
   });
   // 报警信息表格滚动
   $('.small-hei').niceScroll({
     cursorcolor: "#eaeaea",  // 滚动条颜色，使用16进制颜色值
     cursorwidth: "6px",  // 滚动条的宽度，单位：像素
     cursorborder: "none",  // CSS 方式定义滚动条边框
     cursorborderradius: "5px",  // 滚动条圆角（像素）
   });
 })

 // tab切换
 $('.tab-head>li').on("click",function(){
   var $index=$(this).index();
   $(this).parent().children().removeClass("is-active");
   $(this).addClass("is-active");

   var $siblings=$(this).parent().parent().siblings(".tab-bd");
   $siblings.show();
   $siblings.children().removeClass("is-active");
   $siblings.children().eq($index).addClass("is-active");
 })*/


/*       20200701新增   start          */
$(function(){
  // 模态框关闭
  $('.modal-close').on("click",function(){
    $(".mask").removeClass("show");
    $(this).parent().removeClass("is-show");
    $(".mask").fadeOut();
    $(this).parent().fadeOut();
  })

  // tab切换
  $('.tab-head>li').on("click",function(){
    var $index=$(this).index();
    $(this).parent().children().removeClass("is-active");
    $(this).addClass("is-active");

    var $siblings=$(this).parent().parent().siblings(".tab-bd");
    $siblings.show();
    $siblings.children().removeClass("is-active");
    $siblings.children().eq($index).addClass("is-active");
  })
})
/*       20200701新增    end         */