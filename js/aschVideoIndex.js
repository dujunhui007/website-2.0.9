$(document).ready(function () {
  $(".aschTwo").hide();
  // $("#aschVideo").click(function () {
  //     window.location.href = "index.html";
  // });
  setTimeout(function () {
    $(".aschOne").hide();
    $(".aschTwo").show().currentTime = 0;
  }, 19000);
});