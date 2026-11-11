$(function() {
  // マウスを動かす
  $(window).mousemove(function(e) {
    let thumbOffset = $("#thumb").offset();
    let thumbWidth = $("#thumb").width();
    let thumbHeight = $("#thumb").height();

    // 마우스가 #thumb 영역 안에 있는지 확인
    if (
      e.pageX > thumbOffset.left
      &&
      e.pageX <= thumbOffset.left + thumbWidth
      &&
      e.pageY >= thumbOffset.top
      &&
      e.pageY <= thumbOffset.top + thumbHeight
    ) {

      // #thumb 내부에서의 마우스 상대 좌표 계산
      let offsetX = e.pageX - thumbOffset.left;
      let offsetY = e.pageY - thumbOffset.top;

      let lensSize = 100;          // 렌즈(span) 크기
      let halfLens = lensSize / 2; // 50px (마우스가 렌즈 정중앙에 오도록)

      // 렌즈의 좌상단 기준 좌표 계산
      let posX = offsetX - halfLens;
      let posY = offsetY - halfLens;

      // #thumb 밖으로 튀어나가지 않도록 범위 제한
      if (posX < 0) posX = 0;
      if (posY < 0) posY = 0;
      if (posX > thumbWidth - lensSize) posX = thumbWidth - lensSize;
      if (posY > thumbHeight - lensSize) posY = thumbHeight - lensSize;

      // 1. span(렌즈) 위치 설정 (#thumb 기준 상대 좌표)
      $("span").css({ 
        "top": posY + "px", 
        "left": posX + "px" 
      }).show();

      // 2. zoom 이미지 위치 조정 (10배 확대)
      $("#zoom img").css({
        "top": -posY * 10 + "px",
        "left": -posX * 10 + "px"
      });

    } else {
      // 영역을 벗어났을 때: span 숨기기
      $("span").hide();
    }
  });
});
