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

      /*** はみ出し防止処理 (100px 렌즈 기준) ***/
      // span要素が#thumb内に収まるよう調整（横位置）
      if (e.pageX <= $("#thumb").offset().left + 50) {
        posX = $("#thumb").offset().left;
      } else if (e.pageX >= $("#thumb").offset().left + $("#thumb").width() - 50) {
        posX = $("#thumb").offset().left + $("#thumb").width() - 100;
      } else {
        // カーソル中央に来るように調整
        posX -= 50;
      }

      // span要素が#thumb内に収まるよう調整（縦位置）
      if (e.pageY <= $("#thumb").offset().top + 50) {
        posY = $("#thumb").offset().top;
      } else if (e.pageY >= $("#thumb").offset().top + $("#thumb").height() - 50) {
        posY = $("#thumb").offset().top + $("#thumb").height() - 100;
      } else {
        // カーソル中央に来るように調整
        posY -= 50;
      }

      // #thumb 내부 기준의 상대 좌표로 변환
      let relativeX = posX - $("#thumb").offset().left;
      let relativeY = posY - $("#thumb").offset().top;

      // span要素の位置を#thumb 내의 상대 좌표로 설정
      $("span").css({ "top": relativeY, "left": relativeX });

      // 収まっている：span要素を表示
      $("span").show();

      // zoom.jpgの表示位置を調整 (10배 확대)
      $("#zoom img").css("top", -relativeY * 10);
      $("#zoom img").css("left", -relativeX * 10);
    } else {
      // 収まっていない：span要素を非表示
      $("span").hide();
    }
  });
});
