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

      /*** はみ出し防止処理 (100px 렌즈 크기에 맞춰 20/40 -> 50/100으로 변경) ***/
      if (e.pageX <= $("#thumb").offset().left + 50) {
        posX = $("#thumb").offset().left;
      } else if (e.pageX >= $("#thumb").offset().left + $("#thumb").width() - 50) {
        posX = $("#thumb").offset().left + $("#thumb").width() - 100;
      } else {
        // カーソル中央に来るように調整
        posX -= 50;
      }

      if (e.pageY <= $("#thumb").offset().top + 50) {
        posY = $("#thumb").offset().top;
      } else if (e.pageY >= $("#thumb").offset().top + $("#thumb").height() - 50) {
        posY = $("#thumb").offset().top + $("#thumb").height() - 100;
      } else {
        // カーソル中央に来るように調整
        posY -= 50;
      }

      // 🌟 [핵심 추가] span은 #thumb 안에서 움직여야 하므로 절대 좌표를 상대 좌표로 변환
      let relativeX = posX - $("#thumb").offset().left;
      let relativeY = posY - $("#thumb").offset().top;

      // span要素の位置を#thumb 내의 상대 좌표에 맞춤
      $("span").css({ "top": relativeY, "left": relativeX });

      // 収まっている：span要素を表示
      $("span").show();

      // 🌟 [수정] zoom.jpgの表示位置を상대 좌표 기준으로 10배 조정
      $("#zoom img").css("top", -relativeY * 4);
      $("#zoom img").css("left", -relativeX * 4);
    } else {
      // 収まっていない：span要素を非表示
      $("span").hide();
    }
  });
});
