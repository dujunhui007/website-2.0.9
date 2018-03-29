$(document).ready(function () {
  var urlZh = "data/timeLine-zh.json", urlEn = "data/timeLine-en.json", pageNumber = 1;

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

  var languageFlag, getCookieKey;
  languageFlag = "languageFlag";
  getCookieKey = getCookie(languageFlag);
  if (getCookieKey) {
    // console.log(getCookieKey);
    window.flag = getCookieKey;
    // console.log(window.flag);
    if (getCookieKey == 0) {
      getInfo(urlEn);
      changeEn();
      loadProperties("strings_en");
      window.flag = 0;
    } else {
      getInfo(urlZh);
      changeZh();
      loadProperties("strings_zh-CN");
      window.flag = 1;
    }
  } else {
    // alert(1);
    if (currentLang == "zh-CN") {
      getInfo(urlZh);
      changeZh();
      loadProperties("strings_zh-CN");
      window.flag = 0;
    } else {
      getInfo(urlEn);
      changeEn();
      loadProperties("strings_en");
      window.flag = 1;
    }
  }


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

  $(".switchLanguageBtn .btnContainer .btn2").click(function () {
    // alert(1);
    if (flag == 1) {
      getInfo(urlEn);
      changeEn();
      loadProperties("strings_en");
      getLeftLineHeight();
      window.flag = 0;
      setCookie(languageFlag, flag);
      setInfo();
    } else {
      getInfo(urlZh);
      changeZh();
      loadProperties("strings_zh-CN");
      getLeftLineHeight();
      window.flag = 1;
      setCookie(languageFlag, flag);
      setInfo();
    }
  });

  function getInfo(languageUrl) {
    $.ajax({
      url: languageUrl,
      type: "GET",
      dataType: "json",
      async: false,
      success: function (data) {
        var currentPageArr;
        data.reverse();
        // console.log(data);
        $(".timeLineContainer .timeContent #timeContentContainer").empty();
        // currentPageArr = data.slice((pageNumber - 1), (pageNumber + 4));
        currentPageArr = data;

        // console.log(currentPageArr);
        // var result = currentPageArr;
        var ulStr = "";

        $.each(currentPageArr, function (i, result) {
          var particularData = result.particular;
          var particularStr = "";

          // console.log(particularData);
          // $(".timeLineContainer .timeContent .timeContentRight .timeContentIncident ul.particulars").empty();
          $.each(particularData, function (j, particularResult) {
            // console.log(particularResult);
            particularStr += "<li><p>" + particularResult + "</p></li>";

            // $(".timeLineContainer .timeContent .timeContentRight .timeContentIncident ul.particulars").append(particularStr)
          });


          ulStr += "        <li class=\"incidentContainer\">\n" +
            "                <div class=\"timeContentLeft\">\n" +
            "                    <h3>" + result.year + "</h3>\n" +
            "                    <p>" + result.monthDay + "</p>\n" +
            "                    <i class=\"hideIncident\"></i>\n" +
            "                    <span class=\"leftLine\"></span>\n" +
            "                </div>\n" +
            "                <div class=\"timeContentRight\">\n" +
            "                    <div class=\"timeRightTitle\">\n" +
            "                        <h4 title='" + result.title + "'>" + result.title + "</h4>\n" +
            "                    </div>\n" +
            "                    <div class=\"timeContentIncident\">\n" +
            "                        <ul class=\"particulars\">" + particularStr + "</ul>" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </li>";

        });
        // console.log(ulStr);

        $("#timeContentContainer").append(ulStr);
      },
      error: function () {
        alert("数据请求失败，请重新打开")
      }
    });
  }

  function getLeftLineHeight() {

    $(".timeLineContainer .timeContent .timeContentLeft .leftLine").each(function () {

      $(this).css("height", ($(this).parent().parent().find(".timeContentIncident").height() + 50));
    });
    $(".timeLineContainer .incidentContainer:last").find(".leftLine").css("height", "0")
  }

  getLeftLineHeight();

  function setInfo() {
    $(".timeLineContainer .timeContent ul li.incidentContainer .timeContentLeft .hideIncident").click(function () {
      $(this).parent().parent().find(".timeContentIncident").slideToggle();
      $(this).parent().find(".leftLine").slideToggle();
    })
  }

  setInfo();

  function changeEn() {
    $(".switchLanguageBtn .btnContainer .btn1 .btnFlag1 img").attr("src", "images/uk.png");
    $(".switchLanguageBtn .btnContainer .btn2 .btnFlag2 img").attr("src", "images/china.png");
    $(".switchLanguageBtn .btnContainer .btn1  .btnText1").html("English");
    $(".switchLanguageBtn .btnContainer .btn2  .btnText2").html("中文简体");
  }

  function changeZh() {
    $(".switchLanguageBtn .btnContainer .btn1 .btnFlag1 img").attr("src", "images/china.png");
    $(".switchLanguageBtn .btnContainer .btn2 .btnFlag2 img").attr("src", "images/uk.png");
    $(".switchLanguageBtn .btnContainer .btn1  .btnText1").html("中文简体");
    $(".switchLanguageBtn .btnContainer .btn2  .btnText2").html("English");
  }

  function loadProperties(str) {
    jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
      name: str, //资源文件名称
      path: 'resources/i18n/', //资源文件路径
      mode: 'map', //用Map的方式使用资源文件中的值
      callback: function () {//加载成功后设置显示内容
        $('#dappNav1').html($.i18n.prop('string_dappNav1'));
        $('#dappNav2').html($.i18n.prop('string_dappNav2'));
        $('#dappNav3').html($.i18n.prop('string_dappNav3'));
        $('#dappNav4').html($.i18n.prop('string_dappNav4'));
        $('#dappNav5').html($.i18n.prop('string_dappNav5'));
        $('#dappNav6').html($.i18n.prop('string_dappNav6'));
        $('#dappNav7').html($.i18n.prop('string_dappNav7'));
        $('#dappNav8').html($.i18n.prop('string_dappNav8'));
        $('#dappNav9').html($.i18n.prop('string_dappNav9'));
        $('#dappNav10').html($.i18n.prop('string_dappNav10'));

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
        $('#nav_tutorial').html($.i18n.prop('string_navtutorial'));

        $('#qqLink1').html($.i18n.prop('string_qqLink1'));
        $('#qqLink2').html($.i18n.prop('string_qqLink2'));
        $('#qqLink3').html($.i18n.prop('string_qqLink3'));
        $('#qqLink4').html($.i18n.prop('string_qqLink4'));
        $('#qqLink5').html($.i18n.prop('string_qqLink5'));
        $('#qqLink6').html($.i18n.prop('string_qqLink6'));

        $('#footerLink1').html($.i18n.prop('string_footerLink1'));
        $('#footerLink2').html($.i18n.prop('string_footerLink2'));
        $('#footerLink3').html($.i18n.prop('string_footerLink3'));

        $('#footerEmail2').html($.i18n.prop('string_footerEmail2'));
        $('#footerEmail3').html($.i18n.prop('string_footerEmail3'));
        $('#footerEmail4').html($.i18n.prop('string_footerEmail4'));

        $('#footerLink4').html($.i18n.prop('string_footerLink4'));
      }
    });
  }
});
