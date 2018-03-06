$(document).ready(function () {
  var userAgent = navigator.userAgent;
  var isEdge = userAgent.indexOf("Edge");
  var isIE = userAgent.indexOf("MSIE");
  var isQQBrowser, is360;
  var isAndroid;

  isQQBrowser = window.navigator.userAgent.indexOf("QQBrowser") !== -1;
  is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
  isAndroid = window.navigator.userAgent.indexOf('Android');

  function _mime(option, value) {
    var mimeTypes = navigator.mimeTypes;
    for (var mt in mimeTypes) {
      if (mimeTypes[mt][option] == value) {
        return true;
      }
    }
    return false;
  }

  $("#introduction .aschVideo").click(function () {
    // $("#introduction .introductionContainer .aschVideo").click(function () {
    if (isEdge > -1) {
      $("#introduction .videoContainer").css("display", "none");
      window.open("aschVideo.html");
    } else if (!!window.ActiveXObject || "ActiveXObject" in window) {
      $("#introduction .videoContainer").css("display", "none");
      window.open("aschVideo.html");
    } else if (isAndroid > -1) {
      $("#introduction .videoContainer").css("display", "none");
    } else {
      $("#introduction .videoContainer").css("display", "block");
      setTimeout(function () {
        $(".m .closedVideo").css("display", "block")
      }, 1000);

      setTimeout(function () {
        $(document).bind('mousewheel', function (event, delta) {
          return false;
        });
        $(".m").show();
        $(".m").removeClass("mClosedVideo").addClass("mOpenVideo");
        $(".vjs-has-started .vjs-control-bar").css("display", "none");
        $(".videoBackground").css("display", "block")
        // $(".videoBackground").css("display", "block").removeClass("videoBackgroundAnimate2").addClass("videoBackgroundAnimate1");
      }, 0);

      setTimeout(function () {
        var myPlayer = videojs('my-video');
        videojs("my-video").ready(function () {
          var myPlayer = this;
          myPlayer.play();
          $("#asch-video").css("display", "none");
          $("#my-video").css("display", "block")
        });
      }, 100);

      setTimeout(function () {
        $(".vjs-has-started .vjs-control-bar").css("display", "flex");
      }, 1000);
    }
    // });


    // setTimeout(function () {
    //   var myPlayer = videojs('asch-video');
    //   videojs("asch-video").ready(function () {
    //     var myPlayer = this;
    //     myPlayer.play();
    //     $("#asch-video").css("display", "block");
    //     $("#my-video").css("display", "none")
    //   });
    // }, 19000);
  });
  $(".m .closedVideo").click(function () {
    setTimeout(function () {
      $(".vjs-has-started .vjs-control-bar").css("display", "none");
      $(".m").addClass("mClosedVideo").removeClass("mOpenVideo");
      $(".m .closedVideo").css("display", "none");
      $(".videoBackground").css("display", "none")
      // $(".videoBackground").removeClass("videoBackgroundAnimate1").addClass("videoBackgroundAnimate2");
    }, 0);
    // setTimeout(function () {
    //   // $(".videoBackground").css("display", "none");
    // },500);
    setTimeout(function () {
      $(".vjs-has-started .vjs-control-bar").css("display", "flex");
      // $(".m").css("display","none");
      $(".m").hide();
      $(document).unbind('mousewheel');
    }, 1000);
  })
});


