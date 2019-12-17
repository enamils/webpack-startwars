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
window.onscroll = () => { stickyMenu() };

const header = document.querySelector('.nav-header');
const sticky = header.offsetTop;

stickyMenu = () => {
  window.pageYOffset > sticky
  ? header.classList.add("sticky")
  : header.classList.remove("sticky")
}

// MENU RESPONSIVE
menuResponsive = () => {
  const hamburger = {
    navHeader: document.querySelector('.nav-header'),
    navToggle: document.querySelector('.menu-button'),
    nav: document.querySelector('.nav-bar'),

    doToggle:  (e) => {
      e.preventDefault();
      hamburger.navHeader.classList.toggle('expanded');
      hamburger.navToggle.classList.toggle('expanded');
      hamburger.nav.classList.toggle('expanded');
    }
  }

  hamburger.navToggle.addEventListener('click', (e) => { hamburger.doToggle(e) });
}

menuResponsive();
