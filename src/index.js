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

(function () {

  const hamburger = {
    navToggle: document.querySelector('.menu-button'),
    nav: document.querySelector('.nav-bar'),

    doToggle: function (e) {
      e.preventDefault();
      this.navToggle.classList.toggle('expanded');
      this.nav.classList.toggle('expanded');
    }
  };

  hamburger.navToggle.addEventListener('click', function (e) { hamburger.doToggle(e); });

}());
