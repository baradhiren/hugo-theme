/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

function getTimeAndSetCSS(){
  var hr = (new Date()).getHours();
  const isDayTime = hr > 6 && hr < 20;
  var csslink = document.createElement("link");
  var switcher = document.getElementsByClassName('js-toggle')[0];
  var path = ""
  csslink.setAttribute("rel", "stylesheet");
  csslink.setAttribute("type", "text/css");
  csslink.setAttribute("id", "theme-css");

  if (!isUserAtHome()) {
    path = "../"
  }

  if (isDayTime) {
    csslink.setAttribute("href", path + "css/style-classic.css");
    localStorage.setItem('darkMode', 'false');
  }else {
    if (localStorage.getItem('darkMode')) {
      csslink.setAttribute("href", path + "css/style-dark.css");
      switcher.classList.add('js-toggle--checked');
    }else{
      csslink.setAttribute("href", path + "css/style-classic.css");
    }
    
  }
  document.getElementsByTagName('head')[0].appendChild(csslink);
}

function isUserAtHome() {
  window.homepagecheck = function() {
      var check = false;
      if(document.location.pathname === "/"){
          check=true;
          }
      return check;
      }
  console.log(window.homepagecheck())
  return window.homepagecheck()
}

$(document).ready(function() {

  /**
   * Sets site theme based on local time.
   */
  getTimeAndSetCSS()
  
  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function() {
      if (menu.css("visibility") === "hidden") {
        menu.css("visibility", "visible");
        menuIcon.addClass("active");
      } else {
        menu.css("visibility", "hidden");
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function() {
        var topDistance = menu.offset().top;

        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 50) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 100) {
          nav.hide();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }
});
