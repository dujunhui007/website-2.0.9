$(function () {
  //检测浏览器语言
  currentLang = navigator.language;   //判断除IE外其他浏览器使用语言
  if (!currentLang) {//判断IE浏览器使用语言
    currentLang = navigator.browserLanguage;
  }

  // alert(currentLang);

  //判断访问终端
  var browser = {
    versions: function () {
      var u = navigator.userAgent, app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };

  //browser.versions.trident返回真假，真则是IE内核，以此类推browser.versions.webKit是否为谷歌内核
  if (browser.versions.trident) {
    // alert("is IE");
  }
  if (browser.versions.webKit) {
    // alert("is webKit");
  }

  var languageFlag, getCookieKey, urlZh = "data/timeLine-zh.json", urlEn = "data/timeLine-en.json", dappUrlEn = "data/dapps-en.json", dappUrlZh = "data/dapps-zh.json",dappSwiper;

  languageFlag = "languageFlag";

  loadProperties("strings_en");
  getCookieKey = getCookie(languageFlag);
  if (getCookieKey) {
    if (getCookieKey == 0) {
      loadProperties("strings_en");
      switchEn();
      getInfo(urlEn);
      dappGetInfo(dappUrlEn);
      window.flag = 1;
    } else {
      loadProperties("strings_zh-CN");
      switchZh();
      getInfo(urlZh);
      dappGetInfo(dappUrlZh);
      window.flag = 0;
    }
    window.flag = getCookieKey;
  } else {
    if (currentLang == "zh-CN") {
      loadProperties("strings_zh-CN");
      switchZh();
      getInfo(urlZh);
      dappGetInfo(dappUrlZh);
      window.flag = 1;
    } else {
      loadProperties("strings_en");
      switchEn();
      getInfo(urlEn);
      dappGetInfo(dappUrlEn);
      window.flag = 0;
    }
  }

  swiperInfo();

  function setCookie(key, value) {
    document.cookie = key + "=" + escape(value);
  }

  function getCookie(flag) {
    var arr, reg = new RegExp("(^| )" + flag + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return (arr[2]);
    } else {
      return null;
    }
  }

  function switchEn() {

    $("#timeLine .toTimeLine").css({"line-height":"33px","font-size":"22px"});

    $("nav .navContainer .navRight ul li a").css("letter-spacing", "0px");


    $("#home .aschHomeLinks a:nth-child(2)").attr("href", "http://asch-public.oss-cn-beijing.aliyuncs.com/asch.io/Asch-Whitepaper-en.pdf");

    $(".switchLanguageBtn .btnContainer .btn1 .btnFlag1 img").attr("src", "images/uk.png");
    $(".switchLanguageBtn .btnContainer .btn2 .btnFlag2 img").attr("src", "images/china.png");
    $(".switchLanguageBtn .btnContainer .btn1  .btnText1").html("English");
    $(".switchLanguageBtn .btnContainer .btn2  .btnText2").html("中文简体");

    $("#downloads .downloadsContainer .downloadsContainerLeft .dlsit-list li .dlistBtns a:nth-child(1)").attr("data-text", "Download");
    $("#downloads .downloadsContainer .downloadsContainerLeft .dlsit-list li .dlistBtns a:nth-child(2)").attr("data-text", "More");


    $("#downloads .downloadsContainer .downloadsContainerLeft .dlist li").css("font-size", "16px");

    $("#introduction .introductionContainer .aschVideo .videoText").attr("src", "images/aschVideoText.png");


    $(".homeLinksContainer ul.homeLinks li p").css("font-size", "16px");
    $(".homeLinksContainer ul.homeLinks li p:nth-child(2)").css("font-size", "20px");
    $(".homeLinksContainer ul.homeLinks li a .homeLinkGitHub").css("font-size", "20px");

    $(".section .sectionTop span").css("font-size", "36px");

    $("#features .featuresTopContainer .featuresTop h4").css({"font-weight": "300", "font-size": "48px"});
    $("#featuresTwo .featuresBottomContainer .featuresBottom h4").css({"font-weight": "300", "font-size": "48px"});

    $("#home .aschHomeLinks a:nth-child(1) img:nth-child(2)").css({
      "top": "12px",
      "width": "120px",
      "left": "39px"
    });
    $("#home .aschHomeLinks a:nth-child(1) img:nth-child(1)").css({
      "top": "15px",
      "width": "120px",
      "left": "-125px"
    });

    $("#home .homeContainer .homeContainerContent .aschHomeImg1 img").attr("src", "images/aschHomeUKImg.png");
    $("#home .homeContainer .homeContainerContent .aschHomeLinks .toGetStarted .toGetStarted1").attr("src", "images/comeSoon.png");
    $("#home .homeContainer .homeContainerContent .aschHomeLinks .toGetStarted .toGetStarted2").attr("src", "images/Getstarted.png");

    $("#home .homeContainer .homeContainerContent .aschHomeLinks .toWhitePaper .toWhitePaper1").attr("src", "images/white1.png");
    $("#home .homeContainer .homeContainerContent .aschHomeLinks .toWhitePaper .toWhitePaper2").attr("src", "images/WhitePaper.png");
    $("#scenarios .scenariosBackground").css({"width": "82%", "left": "9%"});
    $("#downloads .downloadsContainer .downloadsContainerLeft .dlist li:nth-child(3)").css({"padding-top": "5px"});

    if (screen.width > 1910) {
      $("#downloads .downloadsContainer .downloadsContainerLeft .dlist li:nth-child(3)").css({"padding-top": "0px"});
    } else if ((1596 < screen.width) && (screen.width < 1910)) {
      $("#downloads .downloadsContainer .downloadsContainerLeft .dlist li:nth-child(3)").css({
        "line-height": "50px",
        "padding-top": "5px"
      });
    } else {
      $("#downloads .downloadsContainer .downloadsContainerLeft .dlist li:nth-child(3)").css({
        "line-height": "25px",
        "padding-top": "5px"
      });
    }
  }

  function switchZh() {
    $("#timeLine .toTimeLine").css({"line-height":"38px","font-size":"18px"});

    $("nav .navContainer .navRight ul li a").css("letter-spacing", "2px");

    $("#home .aschHomeLinks a:nth-child(2)").attr("href", "http://asch-public.oss-cn-beijing.aliyuncs.com/asch.io/Asch-whitepaper-zh.pdf");

    $(".switchLanguageBtn .btnContainer .btn1 .btnFlag1 img").attr("src", "images/china.png");
    $(".switchLanguageBtn .btnContainer .btn2 .btnFlag2 img").attr("src", "images/uk.png");
    $(".switchLanguageBtn .btnContainer .btn1  .btnText1").html("中文简体");
    $(".switchLanguageBtn .btnContainer .btn2  .btnText2").html("English");

    $("#downloads .downloadsContainer .downloadsContainerLeft .dlsit-list li .dlistBtns a:nth-child(1)").attr("data-text", "下载");
    $("#downloads .downloadsContainer .downloadsContainerLeft .dlsit-list li .dlistBtns a:nth-child(2)").attr("data-text", "更多");

    $("#downloads .downloadsContainer .downloadsContainerLeft .dlist li").css("font-size", "20px");

    $("#introduction .introductionContainer .aschVideo .videoText").attr("src", "images/aschVideoText1.png");

    $("#features .featuresTopContainer .featuresTop h4").css({"font-weight": "400", "font-size": "40px"});

    $("#featuresTwo .featuresBottomContainer .featuresBottom h4").css({"font-weight": "400", "font-size": "40px"});

    $(".section .sectionTop span").css("font-size", "32px");

    $(".homeLinksContainer ul.homeLinks li p").css("font-size", "14px");
    $(".homeLinksContainer ul.homeLinks li p:nth-child(2)").css("font-size", "18px");
    $(".homeLinksContainer ul.homeLinks li a .homeLinkGitHub").css("font-size", "20px");


    $("#home .aschHomeLinks a:nth-child(1) img:nth-child(2)").css({
      "top": "12px",
      "width": "100px",
      "left": "50px"
    });
    $("#home .aschHomeLinks a:nth-child(1) img:nth-child(1)").css({
      "top": "13px",
      "width": "100px",
      "left": "-115px"
    });


    $("#home .homeContainer .homeContainerContent .aschHomeImg1 img").attr("src", "images/aschHomeChinaImg.png");
    $("#home .homeContainer .homeContainerContent .aschHomeLinks .toGetStarted .toGetStarted1").attr("src", "images/comeSoon1.png");
    $("#home .homeContainer .homeContainerContent .aschHomeLinks .toGetStarted .toGetStarted2").attr("src", "images/getstarted1.png");

    $("#home .homeContainer .homeContainerContent .aschHomeLinks .toWhitePaper .toWhitePaper1").attr("src", "images/whitePaper2.png");
    $("#home .homeContainer .homeContainerContent .aschHomeLinks .toWhitePaper .toWhitePaper2").attr("src", "images/whitePaper1.png");
    $("#scenarios .scenariosBackground").css({"width": "76%", "left": "12%"});


    $("#downloads .downloadsContainer .downloadsContainerLeft .dlist li:nth-child(3)").css({"padding-top": "17px"});

    if (screen.width > 1910) {
      $("#downloads .downloadsContainer .downloadsContainerLeft .dlist li:nth-child(3)").css({"padding-top": "0px"});
    } else if ((1596 < screen.width) && (screen.width < 1910)) {
      $("#downloads .downloadsContainer .downloadsContainerLeft .dlist li:nth-child(3)").css({
        "line-height": "50px",
        "padding-top": "5px"
      });
    } else {
      $("#downloads .downloadsContainer .downloadsContainerLeft .dlist li:nth-child(3)").css({
        "line-height": "50px",
        "padding-top": "5px"
      });
    }
  }

  function dappGetInfo(dataUrl) {
    $.ajax({
      url: dataUrl,
      type: "GET",
      dataType: "json",
      async: false,
      success: function (data) {
        var currentPageArr;
        var dappStr = "";
        // console.log(data);

        $("#application .swiper-container .swiper-wrapper").empty();

        currentPageArr = data;

        $.each(currentPageArr, function (i, result) {
          var dapp = " dapp" + (i + 1);
          dappStr += "   <div class='swiper-slide " + dapp + "'>\n" +
            "                <div class=\"hotTopImg\">\n" +
            "                    <img class=\"hotTopImgUrl\" src='" + result.dappImgUrl + "' alt=\"hotTopImg\">\n" +
            "                    <span>Hot</span>\n" +
            "                    <i>\n" +
            "                        <img src='" + result.dappWatermarkUrl + "' alt=\"cctimeWatermark.png\">\n" +
            "                    </i>\n" +
            "                </div>\n" +
            "                <div class=\"applicationDetail\">\n" +
            "                    <p class=\"applicationDetailTitle\">" + result.dappName + "</p>\n" +
            "                    <span class=\"applicationDetailLine\"></span>\n" +
            "                    <p class=\"applicationDetailDescribe\">" + result.description + "</p>\n" +
            "                    <a class=\"applicationDetailMore\" href=\"javascript:;\">" + result.link + "</a>\n" +
            "                </div>\n" +
            "\n" +
            "            </div>"

        });

        $("#application .swiper-container .swiper-wrapper").append(dappStr);

      },
      error: function () {
        alert("数据请求失败，请重新打开")
      }
    });
  }
  
  function swiperInfo() {
    if(!!dappSwiper){
      dappSwiper.destroy()
    }

    dappSwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      autoplay: 4000,
      loop: true,
      // loop: false,
      // observer: true,
      // observeParents: true,
      // initialSlide:4,
      slidesPerGroup: 4,
      slidesPerView: 4,
      spaceBetween: 20
    });
    // dappSwiper.reLoop();

    // dappSwiper.slideTo(0);
    $(".swiper-container").mouseenter(function () {//滑过悬停
      dappSwiper.stopAutoplay();//mySwiper 为上面你swiper实例化的名称
    }).mouseleave(function () {//离开开启
      dappSwiper.startAutoplay();
    });


    $("#application .dapp1").click(function () {
      window.open("dapp1.html");
    }),

      $("#applicationDetailMore1").click(function () {
        event.stopPropagation();
        window.open("dapp1.html");
      }),

      $("#application .dapp2").click(function () {
        window.open("dapp2.html");
      }),

      $("#applicationDetailMore2").click(function () {
        event.stopPropagation();
        window.open("dapp2.html");
      }),

      $("#application .dapp3").click(function () {
        window.open("dapp3.html");
      }),

      $("#applicationDetailMore3").click(function () {
        event.stopPropagation();
        window.open("dapp3.html");
      }),

      $("#application .dapp4").click(function () {
        window.open("dapp4.html");
      }),

      $("#applicationDetailMore4").click(function () {
        event.stopPropagation();
        window.open("dapp4.html");
      }),

      $("#application .dapp5").click(function () {
        window.open("dapp5.html");
      }),

      $("#applicationDetailMore5").click(function () {
        event.stopPropagation();
        window.open("dapp5.html");
      }),

      $("#application .dapp6").click(function () {
        window.open("dapp6.html");
      }),

      $("#applicationDetailMore6").click(function () {
        event.stopPropagation();
        window.open("dapp6.html");
      }),

      $("#application .dapp7").click(function () {
        window.open("dapp7.html");
      }),

      $("#applicationDetailMore7").click(function () {
        event.stopPropagation();
        window.open("dapp7.html");
      }),

      $("#application .dapp8").click(function () {
        window.open("dapp1.html");
      }),

      $("#applicationDetailMore8").click(function () {
        event.stopPropagation();
        window.open("dapp1.html");
      })
  }

  function getInfo(languageUrl) {
    $.ajax({
      url: languageUrl,
      type: "GET",
      dataType: "json",
      async: false,
      success: function (data) {
        var currentPageArr;
        var ulStr = "";
        data.reverse();
        // console.log(data);
        $("#timeLine .rodemapContainer").empty();
        currentPageArr = data;
        $.each(currentPageArr, function (i, result) {

          var particularData = result.particular;
          var particularStr = "";

          $.each(particularData, function (j, particularResult) {
            particularStr += "<li><p>" + particularResult + "</p></li>";
          });

          ulStr += "     <li>\n" +
            "                <div class=\"rodemapContainerLeft\">\n" +
            "                    <h3>" + result.year + "</h3>\n" +
            "                    <p>" + result.monthDay + "</p>\n" +
            "                </div>\n" +
            "\n" +
            "                <div class=\"point\"><b></b></div>\n" +
            "\n" +
            "                <div class=\"rodemapContainerRight\">\n" +
            "\n" +
            "                    <div class=\"rodemapContainerRightTitle\">\n" +
            "                        <p title='" + result.title + "'>" + result.title + "</p>\n" +
            "                    </div>\n" +
            "                    <ul class=\"rodemapContainerRightContent\">" + particularStr + "</ul>" +
            "                </div>\n" +
            "            </li>";

        });

        $(".rodemapContainer").append(ulStr);

      },
      error: function () {
        alert("数据请求失败，请重新打开")
      }
    });
  }

  // function addAnimate() {
  //   var rHeight = $(".rodemapContainer").offset().top;
  //   var lis = $("#timeLine .timeLineContainer .rodemapContainer li");
  //
  //   console.log(rHeight);
  //
  //   console.log(lis);
  //   $.each(lis, function (k, result) {
  //     if ($(this).offset().top <= rHeight) {
  //       console.log($(this).offset().top);
  //     }
  //   })
  //
  //   // lis.each(function () {
  //   //   if (($(this).offset().top - rHeight)>0) {
  //   //     $(this).addClass("hideLi")
  //   //   }
  //   //
  //   // })
  //
  //
  //   // $.each(lis, function (k, lisResult) {
  //   //   if (($(this).offset().top - $(".rodemapContainer").scrollTop())<=0) {
  //   //     // console.log(2);
  //   //   }
  //   // })
  // }

  // addAnimate();

  // $(".rodemapContainer").scroll(function () {
  //   var rHeight = $(".rodemapContainer").offset().top;
  //   var lis = $("#timeLine .timeLineContainer .rodemapContainer li");
  //
  //   console.log(rHeight);
  //
  //   // console.log(lis);
  //   $.each(lis, function (k, result) {
  //     if ($(this).offset().top <= (rHeight+20)) {
  //       // console.log($(this).offset().top);
  //       // $(this).find(".rodemapContainerLeft").addClass("hideLiLeft").removeClass("showLiLeft");
  //       // $(this).find(".point").addClass("hideLiPoint").removeClass("showLiPoint");
  //       // $(this).find(".rodemapContainerRight").addClass("hideLiRight").removeClass("showLiRight");
  //
  //       $(this).find(".rodemapContainerLeft").css("opacity","0");
  //       $(this).find(".point").css("opacity","0");
  //       $(this).find(".rodemapContainerRight").css("opacity","0");
  //
  //     }else {
  //       // $(this).find(".rodemapContainerLeft").addClass("showLiLeft").removeClass("hideLiLeft");
  //       // $(this).find(".point").addClass("showLiPoint").removeClass("hideLiPoint");
  //       // $(this).find(".rodemapContainerRight").addClass("showLiRight").removeClass("hideLiRight");
  //
  //       $(this).find(".rodemapContainerLeft").css("opacity","1");
  //       $(this).find(".point").css("opacity","1");
  //       $(this).find(".rodemapContainerRight").css("opacity","1");
  //     }
  //   })
  //
  //
  //
  //
  // });

  // $(".rodemapContainer").scroll(function () {
  //   // setTimeout(function () {
  //   //   var lis=$("#timeLine .rodemapContainer li");
  //   //   console.log(lis);
  //   //   $.each(lis,function (k,lisResult) {
  //   //     // console.log(lisResult.scrollTop);
  //   //     console.log(lisResult.offset().top);;
  //   //   })
  //   // }, 300)
  //   var rHeight = $(".rodemapContainer").offset().top;
  //   // var lis = $("#timeLine .timeLineContainer .rodemapContainer li");
  //
  //   console.log(rHeight);
  //
  //   // console.log(lis);
  //   // $.each(lis, function (k, lisResult) {
  //   //   if ($(this).offset().top - $(".rodemapContainer").scrollTop()) {
  //   //     console.log(2);
  //   //   }
  //
  //
  //     // console.log($(this).offset().top);
  //     // console.log(lisResult);
  //   // })
  //
  //
  //   // $.each(lis, function (k, lisResult) {
  //   //
  //   //   console.log(lisResult.position().top);
  //   //       // console.log(lisResult.scrollTop);
  //   //       console.log(lisResult.offset().top);
  //   //       console.log(lisResult);
  //   //     })
  //   // });
  //
  //   // if ($(".rodemapContainer").scrollTop() >= 0) {
  //   //   console.log(($(".rodemapContainer").scrollTop()))
  //   // }
  //
  // });

  $(".switchLanguageBtn .btnContainer .btn2").click(function () {
    if (flag == 1) {
      loadProperties("strings_en");
      getInfo(urlEn);
      dappGetInfo(dappUrlEn);
      swiperInfo();
      switchEn();
      window.flag = 0;
      setCookie(languageFlag, flag);
    } else {
      loadProperties("strings_zh-CN");
      getInfo(urlZh);
      dappGetInfo(dappUrlZh);
      swiperInfo();
      switchZh();
      window.flag = 1;
      setCookie(languageFlag, flag);
    }
  });
});

function loadProperties(str) {
  jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
    name: str, //资源文件名称
    path: 'resources/i18n/', //资源文件路径
    mode: 'map', //用Map的方式使用资源文件中的值
    callback: function () {//加载成功后设置显示内容
      $('#nav_home').html($.i18n.prop('string_navhome'));
      $('#dappNavHome').html($.i18n.prop('string_dappNavHome'));
      $('#nav_introduction').html($.i18n.prop('string_navintroduction'));
      $('#nav_dapps').html($.i18n.prop('string_navdapps'));
      $('#nav_features').html($.i18n.prop('string_navfeatures'));
      $('#nav_advantages').html($.i18n.prop('string_navadvantages'));
      $('#nav_scenarios').html($.i18n.prop('string_navscenarios'));
      $('#nav_downloads').html($.i18n.prop('string_navdownloads'));
      $('#nav_timeLine').html($.i18n.prop('string_navtimeLine'));
      $('#nav_partners').html($.i18n.prop('string_navpartners'));
      $('#nav_links').html($.i18n.prop('string_navlinks'));

      $('#homeLinksAschCode').html($.i18n.prop('string_homeLinksAschCode'));
      $('#homeLinksAschExplorer').html($.i18n.prop('string_homeLinksAschExplorer'));
      $('#homeLinksAschExplorerContent').html($.i18n.prop('string_homeLinksAschExplorerContent'));
      $('#homeLinksAschWallet').html($.i18n.prop('string_homeLinksAschWallet'));
      $('#homeLinksAschWalletContent').html($.i18n.prop('string_homeLinksAschWalletContent'));
      $('#homeLinksAschForum').html($.i18n.prop('string_homeLinksAschForum'));
      $('#homeLinksAschForumContent').html($.i18n.prop('string_homeLinksAschForumContent'));

      $('#introductionTopTitle').html($.i18n.prop('string_introductionTopTitle'));
      $('#introductionTopContent').html($.i18n.prop('string_introductionTopContent'));
      $('#introductionContentTitleOne').html($.i18n.prop('string_introductionContentTitleOne'));
      $('#introductionContentOne').html($.i18n.prop('string_introductionContentOne'));
      $('#introductionContentTitleTwo').html($.i18n.prop('string_introductionContentTitleTwo'));
      $('#introductionContentTwo').html($.i18n.prop('string_introductionContentTwo'));

      $('#dappsTitle').html($.i18n.prop('string_dappsTitle'));
      $('#toDapps').html($.i18n.prop('string_toDapps'));
      $('#dappsTopContent').html($.i18n.prop('string_dappsTopContent'));
      $('#applicationDetailContent1').html($.i18n.prop('string_applicationDetailContent1'));
      $('#applicationDetailMore1').html($.i18n.prop('string_applicationDetailMore1'));
      $('#applicationDetailMore2').html($.i18n.prop('string_applicationDetailMore1'));
      $('#applicationDetailMore3').html($.i18n.prop('string_applicationDetailMore1'));
      $('#applicationDetailMore4').html($.i18n.prop('string_applicationDetailMore1'));

      $('#applicationDetailTitle2').html($.i18n.prop('string_applicationDetailTitle2'));
      $('#applicationDetailDescribe2').html($.i18n.prop('string_applicationDetailDescribe2'));
      $('#applicationDetailTitle3').html($.i18n.prop('string_applicationDetailTitle3'));
      $('#applicationDetailDescribe3').html($.i18n.prop('string_applicationDetailDescribe3'));
      $('#applicationDetailDescribe4').html($.i18n.prop('string_applicationDetailDescribe4'));

      $('#feature1').html($.i18n.prop('string_feature1'));
      $('#feature2').html($.i18n.prop('string_feature2'));
      $('#commonText1').html($.i18n.prop('string_commonText1'));
      $('#commonText2').html($.i18n.prop('string_commonText1'));
      $('#commonText3').html($.i18n.prop('string_commonText1'));
      $('#commonText4').html($.i18n.prop('string_commonText1'));
      $('#commonText5').html($.i18n.prop('string_commonText1'));
      $('#commonText6').html($.i18n.prop('string_commonText1'));
      $('#commonText7').html($.i18n.prop('string_commonText1'));
      $('#featuresTopTitle').html($.i18n.prop('string_featuresTopTitle'));
      $('#featuresTopTitleContent').html($.i18n.prop('string_featuresTopTitleContent'));

      $('#featuresTopTitle2').html($.i18n.prop('string_featuresTopTitle2'));
      $('#featuresTopTitleContent2').html($.i18n.prop('string_featuresTopTitleContent2'));
      $('#featuresTopTitle3').html($.i18n.prop('string_featuresTopTitle3'));
      $('#featuresTopTitleContent3').html($.i18n.prop('string_featuresTopTitleContent3'));
      $('#featuresTopTitle4').html($.i18n.prop('string_featuresTopTitle4'));
      $('#featuresTopTitleContent4').html($.i18n.prop('string_featuresTopTitleContent4'));
      $('#featuresTopTitle5').html($.i18n.prop('string_featuresTopTitle5'));
      $('#featuresTopTitleContent5').html($.i18n.prop('string_featuresTopTitleContent5'));
      $('#featuresTopTitle6').html($.i18n.prop('string_featuresTopTitle6'));
      $('#featuresTopTitleContent6').html($.i18n.prop('string_featuresTopTitleContent6'));

      $('#featuresTopTitle7').html($.i18n.prop('string_featuresTopTitle7'));
      $('#featuresTopTitleContent7').html($.i18n.prop('string_featuresTopTitleContent7'));
      $('#featuresTopTitle8').html($.i18n.prop('string_featuresTopTitle8'));
      $('#featuresTopTitleContent8').html($.i18n.prop('string_featuresTopTitleContent8'));
      $('#featuresTopTitle9').html($.i18n.prop('string_featuresTopTitle9'));
      $('#featuresTopTitleContent9').html($.i18n.prop('string_featuresTopTitleContent9'));
      $('#featuresTopTitle10').html($.i18n.prop('string_featuresTopTitle10'));
      $('#featuresTopTitleContent10').html($.i18n.prop('string_featuresTopTitleContent10'));
      $('#featuresTopTitle11').html($.i18n.prop('string_featuresTopTitle11'));
      $('#featuresTopTitleContent11').html($.i18n.prop('string_featuresTopTitleContent11'));
      $('#featuresTopTitle12').html($.i18n.prop('string_featuresTopTitle12'));
      $('#featuresTopTitleContent12').html($.i18n.prop('string_featuresTopTitleContent12'));
      $('#featuresTopTitle13').html($.i18n.prop('string_featuresTopTitle13'));
      $('#featuresTopTitleContent13').html($.i18n.prop('string_featuresTopTitleContent13'));
      $('#featuresTopTitle14').html($.i18n.prop('string_featuresTopTitle14'));
      $('#featuresTopTitleContent14').html($.i18n.prop('string_featuresTopTitleContent14'));
      $('#featuresTopTitle15').html($.i18n.prop('string_featuresTopTitle15'));
      $('#featuresTopTitleContent15').html($.i18n.prop('string_featuresTopTitleContent15'));

      $('#AdvantagesTitle').html($.i18n.prop('string_AdvantagesTitle'));

      $('#advantages1').html($.i18n.prop('string_advantages1'));
      $('#advantagesContent1').html($.i18n.prop('string_advantagesContent1'));
      $('#advantages2').html($.i18n.prop('string_advantages2'));
      $('#advantagesContent2').html($.i18n.prop('string_advantagesContent2'));
      $('#advantages3').html($.i18n.prop('string_advantages3'));
      $('#advantagesContent3').html($.i18n.prop('string_advantagesContent3'));
      $('#advantages4').html($.i18n.prop('string_advantages4'));
      $('#advantagesContent4').html($.i18n.prop('string_advantagesContent4'));
      $('#advantages5').html($.i18n.prop('string_advantages5'));
      $('#advantagesContent5').html($.i18n.prop('string_advantagesContent5'));
      $('#advantages6').html($.i18n.prop('string_advantages6'));
      $('#advantagesContent6').html($.i18n.prop('string_advantagesContent6'));

      $('#scenariosTitle').html($.i18n.prop('string_scenariosTitle'));
      $('#scenariosTitle1').html($.i18n.prop('string_scenariosTitle1'));

      $('#scenariosTitle2').html($.i18n.prop('string_scenariosTitle2'));
      $('#scenariosDescribe2').html($.i18n.prop('string_scenariosDescribe2'));
      $('#scenariosContent2').html($.i18n.prop('string_scenariosContent2'));
      $('#scenariosTitle3').html($.i18n.prop('string_scenariosTitle3'));
      $('#scenariosDescribe3').html($.i18n.prop('string_scenariosDescribe3'));
      $('#scenariosContent3').html($.i18n.prop('string_scenariosContent3'));
      $('#scenariosTitle4').html($.i18n.prop('string_scenariosTitle4'));
      $('#scenariosDescribe4').html($.i18n.prop('string_scenariosDescribe4'));
      $('#scenariosContent4').html($.i18n.prop('string_scenariosContent4'));
      $('#scenariosTitle5').html($.i18n.prop('string_scenariosTitle5'));
      $('#scenariosDescribe5').html($.i18n.prop('string_scenariosDescribe5'));
      $('#scenariosContent5').html($.i18n.prop('string_scenariosContent5'));
      $('#scenariosTitle6').html($.i18n.prop('string_scenariosTitle6'));
      $('#scenariosDescribe6').html($.i18n.prop('string_scenariosDescribe6'));
      $('#scenariosContent6').html($.i18n.prop('string_scenariosContent6'));
      $('#scenariosTitle7').html($.i18n.prop('string_scenariosTitle7'));
      $('#scenariosDescribe7').html($.i18n.prop('string_scenariosDescribe7'));
      $('#scenariosContent7').html($.i18n.prop('string_scenariosContent7'));

      $('#downloadsTitle').html($.i18n.prop('string_downloadsTitle'));
      $('#downloadsTitle1').html($.i18n.prop('string_downloadsTitle1'));
      $('#downloadsTitle11').html($.i18n.prop('string_downloadsTitle1'));
      $('#downloadsTitle2').html($.i18n.prop('string_downloadsTitle2'));
      $('#downloadsTitle22').html($.i18n.prop('string_downloadsTitle2'));
      $('#downloadsTitle3').html($.i18n.prop('string_downloadsTitle3'));
      $('#downloadsTitle33').html($.i18n.prop('string_downloadsTitle3'));
      $('#downloadsTitle4').html($.i18n.prop('string_downloadsTitle4'));
      $('#downloadsTitle44').html($.i18n.prop('string_downloadsTitle4'));

      $('#downloadContent1').html($.i18n.prop('string_downloadContent1'));
      $('#downloadContent2').html($.i18n.prop('string_downloadContent2'));
      $('#downloadContent3').html($.i18n.prop('string_downloadContent3'));
      $('#downloadContent4').html($.i18n.prop('string_downloadContent4'));

      $('#downloadLink1').html($.i18n.prop('string_downloadLink1'));
      $('#downloadLink2').html($.i18n.prop('string_downloadLink1'));
      $('#downloadLink3').html($.i18n.prop('string_downloadLink1'));
      $('#downloadLink4').html($.i18n.prop('string_downloadLink1'));
      $('#downloadLink11').html($.i18n.prop('string_downloadLink11'));
      $('#downloadLink22').html($.i18n.prop('string_downloadLink11'));
      $('#downloadLink33').html($.i18n.prop('string_downloadLink11'));
      $('#downloadLink44').html($.i18n.prop('string_downloadLink11'));

      $('#timeLineTitle').html($.i18n.prop('string_timeLineTitle'));


      $('#partnersTitle').html($.i18n.prop('string_partnersTitle'));
      $('#linkTitle1').html($.i18n.prop('string_linkTitle1'));
      $('#linkTitle2').html($.i18n.prop('string_linkTitle2'));
      $('#linkTitle3').html($.i18n.prop('string_linkTitle3'));
      $('#linkTitle4').html($.i18n.prop('string_linkTitle4'));

      $('#footerLink1').html($.i18n.prop('string_footerLink1'));
      $('#footerLink2').html($.i18n.prop('string_footerLink2'));
      $('#footerLink3').html($.i18n.prop('string_footerLink3'));


      $('#qqLink1').html($.i18n.prop('string_qqLink1'));
      $('#qqLink2').html($.i18n.prop('string_qqLink2'));
      $('#qqLink3').html($.i18n.prop('string_qqLink3'));
      $('#qqLink4').html($.i18n.prop('string_qqLink4'));
      $('#qqLink5').html($.i18n.prop('string_qqLink5'));
      $('#qqLink6').html($.i18n.prop('string_qqLink6'));

      $('#footerEmail2').html($.i18n.prop('string_footerEmail2'));
      $('#footerEmail3').html($.i18n.prop('string_footerEmail3'));
      $('#footerEmail4').html($.i18n.prop('string_footerEmail4'));

      $('#timeLineLink').html($.i18n.prop('string_timeLineLink'));
      
      $('#dappsStatement1').html($.i18n.prop('string_dappsStatement1'));
    }
  });
}

