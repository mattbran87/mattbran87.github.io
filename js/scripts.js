// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    // Add click event to mobile menu. if clicked menu will toggle open and close
    $('#mobile-menu').on("click", function(e){
    	var nav = $('.nav-col');
    	if(nav.is(':visible')){
        nav.animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
    	} else {
        nav.animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
      }
    });

    // add click event to links in menu. If in mobile view, toggle close the menu when clicked.
    $('.menu-wrapper a').on("click", function(e){
      var nav = $('.nav-col');
      if(nav.is(':visible')){
        if (window.innerWidth <= 768) {
          nav.animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
        }
    	}
    });

    // add click event to links in menu. highligh the current section that is visible on page in menu.
    $('aside.menu-wrapper a').on('click', function(e) {
      $('.highlighted').removeClass('highlighted');
    	var link = $(this);
      var button = link.find('.menu-button');
      button.addClass('highlighted')
    	var linkHash = link[0].dataset.section;
      linkHash = '#' + linkHash;
      if (!$(linkHash).is(':visible')) {
        var visElm = $('.body-info:visible');
        if (visElm.length > 0) {
          visElm.hide();
        }
        $(linkHash).addClass('animated fadeIn');
        //$(linkHash).show(); // .show() was causing issues with toggle // TODO: fix someday maybe. not a big deal, no performace issues noticed in mobile and desktop views.
        $(linkHash).css("display", "block");
      }
      var date = new Date();
      date = date.getTime();

      var hashData = {
        "hash": linkHash,
        "time": date
      };
      localStorage.setItem('hash', JSON.stringify(hashData));
    });

    // print button on resume
    $('i#print-page').on('click', function(){
		    window.print();
    })

    showDefault();
});

// Show default section of landing page if no other section is stored. Clear storage and return to landing page if user has been away for longer than 15 minutes (900000ms).
function showDefault() {
  var visElm = $('.body-info:visible');
  if (visElm.length == 0) {
    var hashData = JSON.parse(localStorage.getItem('hash'));
    if (hashData != undefined && hashData.hash.length > 0) {
      var date = new Date();
      var dateMs = date.getTime();
      var timeDifference = dateMs - hashData.time;
      if (timeDifference > 900000) {
        var hash = '#landing';
        localStorage.clear();
      } else {
        var hash = hashData.hash;
      }
    } else if(window.location.hash.length > 0) {
      var hash = window.location.hash;
    }
    if (hash != undefined && hash.length > 0) {
      var cleanHash = hash.replace('#','');
      $(hash).show();
      $('.menu-' + cleanHash).addClass('highlighted');
    } else {
      $('#landing').show();
      // $('.menu-about').addClass('highlighted');
    }
  }
}
