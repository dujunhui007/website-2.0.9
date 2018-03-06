$(document).ready(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
      $("nav").css("background", "#fff").css("box-shadow", "0 0 5px #ccc");
      $("nav .navRight .downloadWhitePaper").addClass("downloadWhitePaperTwo").removeClass("downloadWhitePaperOne");
      $("nav .navLeft  .navLogo").addClass("replaceLogoOne").removeClass("replaceLogoTwo");
      $("nav .equalThan ").addClass("moreThan").removeClass("equalThan");
    } else {
      $("nav").css("background", "#fff").css("box-shadow", "0 0 0");
      $("nav .navRight .downloadWhitePaper").addClass("downloadWhitePaperOne").removeClass("downloadWhitePaperTwo");
      $("nav .navLeft  .navLogo").addClass("replaceLogoTwo").removeClass("replaceLogoOne");
      $("nav .moreThan ").addClass("equalThan").removeClass("moreThan");
    }
  });
  $(".getContainer .getMain .mainLeft ul p em").addClass("showLis");
  $(".getContainer .getMain .mainLeft ul li a").addClass("outColor");
  $(".getContainer .getMain .mainLeft .web1").addClass("hoverColor").removeClass("outColor");
  $(".getContainer .getMain .mainLeft ul p").click(function () {
    $(this).next().slideToggle();
    if ($(this).find("em").hasClass("hideLis")) {
      $(this).find("em").addClass("showLis").removeClass("hideLis");
    } else {
      $(this).find("em").addClass("hideLis").removeClass("showLis");
    }
  });
  $(".getContainer .getMain .mainLeft ul li a").click(function () {
    $(".getContainer .getMain .mainLeft ul li a").removeClass("hoverColor").addClass("outColor");
    $(this).addClass("hoverColor").removeClass("outColor")
  });
  $(".getContainer .getMain .mainLeft .web1").click(function () {
    $(".getContainer .getMain .mainRight .webWallet").css({"display": "block"}).siblings().css({"display": "none"})
  });
  $(".getContainer .getMain .mainLeft .web2").click(function () {
    $(".getContainer .getMain .mainRight .pcWallet").css({"display": "block"}).siblings().css({"display": "none"})
  });
  $(".getContainer .getMain .mainLeft .web3").click(function () {
    $(".getContainer .getMain .mainRight .androidWallet").css({"display": "block"}).siblings().css({"display": "none"})
  });
  $(".getContainer .getMain .mainLeft .getDetail").click(function () {
    $(".getContainer .getMain .mainRight .getXAS").css({"display": "block"}).siblings().css({"display": "none"})
  });
  $(".getContainer .getMain .mainLeft .Function").click(function () {
    $(".getContainer .getMain .mainRight .webWalletFunction").css({"display": "block"}).siblings().css({"display": "none"})
  });
  $(".getContainer .getMain .mainLeft .fiduciary").click(function () {
    $(".getContainer .getMain .mainRight .toFiduciary").css({"display": "block"}).siblings().css({"display": "none"})
  });
  $(".getContainer .getMain .mainLeft .collocate").click(function () {
    $(".getContainer .getMain .mainRight .collocateNode").css({"display": "block"}).siblings().css({"display": "none"})
  });
  $(".getContainer .getMain .mainLeft .aschTool").click(function () {
    $(".getContainer .getMain .mainRight .useTool").css({"display": "block"}).siblings().css({"display": "none"})
  });
  $(".getContainer .getMain .mainLeft .develop").click(function () {
    $(".getContainer .getMain .mainRight .developDapp").css({"display": "block"}).siblings().css({"display": "none"})
  });
  $(".getContainer .getMain .mainLeft .joinAsch").click(function () {
    $(".getContainer .getMain .mainRight .joinCommunity").css({"display": "block"}).siblings().css({"display": "none"})
  });
});