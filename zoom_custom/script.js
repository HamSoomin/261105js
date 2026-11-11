$(function() {
  $(window).mousemove(function(e) {
    let $thumb = $("#thumb");
    let thumbOffset = $thumb.offset();
    let thumbWidth = $thumb.width();
    let thumbHeight = $thumb.height(); // 🌟 가변 높이 자동 감지

    if (
      e.pageX > thumbOffset.left
      &&
      e.pageX <= thumbOffset.left + thumbWidth
      &&
      e.pageY >= thumbOffset.top
      &&
      e.pageY <= thumbOffset.top + thumbHeight
    ) {

      // 座標を取得
      let posX = e.pageX;
      let posY = e.pageY;

      /*** はみ出し防止処理 ***/
      if (e.pageX <= thumbOffset.left + 20) {
        posX = thumbOffset.left;
      } else if (e.pageX >= thumbOffset.left + thumbWidth - 20) {
        posX = thumbOffset.left + thumbWidth - 40;
      } else {
        posX -= 20;
      }

      if (e.pageY <= thumbOffset.top + 20) {
        posY = thumbOffset.top;
      } else if (e.pageY >= thumbOffset.top + thumbHeight - 20) {
        posY = thumbOffset.top + thumbHeight - 40;
      } else {
        posY -= 20;
      }

      // 🌟 핵심: 절대 좌표를 #thumb 내부 기준의 상대 좌표로 변환
      let relativeX = posX - thumbOffset.left;
      let relativeY = posY - thumbOffset.top;

      // span要素の位置を#thumb内での相対座標に合わせる
      $("span").css({ "top": relativeY, "left": relativeX });

      // 収まっている：span要素を表示
      $("span").show();

      // 🌟 직사각형 비율에 맞춘 줌 이미지 스케일 계산 (가로/세로 배율 자동 산출)
      let zoomImg = $("#zoom img");
      // 이미지가 로드된 상태에서 실제 비율 계산
      let scaleX = zoomImg[0].naturalWidth / thumbWidth;
      let scaleY = zoomImg[0].naturalHeight / thumbHeight;

      // zoom.jpgの表示位置を비율에 맞게 조정
      zoomImg.css({
        "top": -relativeY * scaleY + "px",
        "left": -relativeX * scaleX + "px"
      });

    } else {
      // 収まっていない：span要素を非表示
      $("span").hide();
    }
  });
});
