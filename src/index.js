import Rellax from 'rellax'
const bgParallax = new Rellax('.rellax', {
  center: false
});

const rellaxentered = new Rellax('.rellax-centered', {
  center: true
});

bgParallax.refresh();
rellaxentered.refresh();

// STICKY MENU
window.onscroll = () => { stickyMenu() };

const header = document.querySelector('.nav-header');
const sticky = header.offsetTop;

const stickyMenu = () => {
  window.pageYOffset > sticky
  ? header.classList.add("sticky")
  : header.classList.remove("sticky")
}

// MENU RESPONSIVE
const menuResponsive = () => {
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
