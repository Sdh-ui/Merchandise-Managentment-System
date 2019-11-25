(function ($) {

  //手机端最大安全尺寸 640px
  //以iphone6屏为标准 375px 设置100px
  var stadWidth = 375;

  //获取屏幕的宽度
  var screenWidth = screen.width;

  var size = screenWidth / stadWidth * 100;

  var id = 'rem' + new Date().getTime();
  var style = $('<style id="' + id + '">html{font-size: ' + size + 'px;}</style>');

  $('head').append(style);

})(jQuery)