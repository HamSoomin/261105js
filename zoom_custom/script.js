$(function() {
  $(window).mousemove(function(e) {
    let $thumb = $("#thumb");
    let thumbOffset = $thumb.offset();
    let thumbWidth = $thumb.width();
    let thumbHeight = $thumb.height();

    if (
      e.pageX > thumbOffset.left
      &&
      e.pageX <= thumbOffset.left + thumbWidth
      &&
      e.pageY >= thumbOffset.top
      &&
      e.pageY <= thumbOffset.top + thumbHeight
    ) {

      let posX = e.pageX;
      let posY = e.pageY;

      // 100px 렌즈 기준 하미다시(범위 초과) 방지
      if (e.pageX <= thumbOffset.left + 50) {
        posX = thumbOffset.left;
      } else if (e.pageX >= thumbOffset.left + thumbWidth - 50) {
        posX = thumbOffset.left + thumbWidth - 100;
      } else {
        posX -= 50;
      }

      if (e.pageY <= thumbOffset.top + 50) {
        posY = thumbOffset.top;
      } else if (e.pageY >= thumbOffset.top + thumbHeight - 50) {
        posY = thumbOffset.top + thumbHeight - 100;
      } else {
        posY -= 50;
      }

      let relativeX = posX - thumbOffset.left;
      let relativeY = posY - thumbOffset.top;

      // 렌즈 위치 설정
      $("span").css({ "top": relativeY, "left": relativeX }).show();

      // 🌟 [핵심] 썸네일과 줌 이미지의 가로/세로 비율 자동 계산
      let zoomImg = $("#zoom img");
      let scaleX = zoomImg[0].naturalWidth / thumbWidth;   // 가로 확대 배율
      let scaleY = zoomImg[0].naturalHeight / thumbHeight; // 세로 확대 배율

      // 줌 이미지 위치 이동 (비율 왜곡 방지)
      zoomImg.css({
        "top": -relativeY * scaleY + "px",
        "left": -relativeX * scaleX + "px"
      });

    } else {
      $("span").hide();
    }
  });
});
