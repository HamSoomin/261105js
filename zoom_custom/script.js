$(function() {
  // マウスを動かす
  $(window).mousemove(function(e) {
    if (
      e.pageX > $("#thumb").offset().left
      &&
      e.pageX <= $("#thumb").offset().left + $("#thumb").width()
      &&
      e.pageY >= $("#thumb").offset().top
      &&
      e.pageY <= $("#thumb").offset().top + $("#thumb").height()
    ) {

      // 座標を取得
      let posX = e.pageX;
      let posY = e.pageY;

      /*** はみ出し防止処理 ***/
      if (e.pageX <= $("#thumb").offset().left + 50) {
        posX = $("#thumb").offset().left;
      } else if (e.pageX >= $("#thumb").offset().left + $("#thumb").width() - 50) {
        posX = $("#thumb").offset().left + $("#thumb").width() - 100;
      } else {
        posX -= 50;
      }

      if (e.pageY <= $("#thumb").offset().top + 50) {
        posY = $("#thumb").offset().top;
      } else if (e.pageY >= $("#thumb").offset().top + $("#thumb").height() - 50) {
        posY = $("#thumb").offset().top + $("#thumb").height() - 100;
      } else {
        posY -= 50;
      }

      let relativeX = posX - $("#thumb").offset().left;
      let relativeY = posY - $("#thumb").offset().top;

      $("span").css({ "top": relativeY, "left": relativeX });

      // 収まっている：span要素を表示
      $("span").show();

      let ratio = 4;
      $("#zoom img").css("top", -relativeY * ratio);
      $("#zoom img").css("left", -relativeX * ratio);
    } else {
      // 収まっていない：span要素を非表示
      $("span").hide();
    }
  });
});
