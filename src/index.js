// Paralax JQUERY
jQuery(window).trigger('resize').trigger('scroll');
$('.parallax-window-1').parallax({
  naturalWidth: 1024,
  naturalHeight: 300
});

$('.parallax-window-2').parallax({
  naturalWidth: 1024,
  naturalHeight: 300
});

// STICKY MENU
window.onscroll = function () { myFunction() };

const header = document.getElementById("myHeader");
const sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// MENU burger for mobile

(function () {

  const hamburger = {
    navHeader: document.getElementById('myHeader'),
    navToggle: document.querySelector('.menu-button'),
    nav: document.querySelector('.nav-bar'),

    doToggle: function (e) {
      e.preventDefault();
      this.navHeader.classList.toggle('expanded');
      this.navToggle.classList.toggle('expanded');
      this.nav.classList.toggle('expanded');
    }
  };

  hamburger.navToggle.addEventListener('click', function (e) { hamburger.doToggle(e); });

}());
