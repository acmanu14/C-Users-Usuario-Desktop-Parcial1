
document.addEventListener('DOMContentLoaded', function(){
  var nav = document.querySelector('.navbar-custom');
  function onScroll(){ if(window.scrollY>50) nav.classList.add('shrink'); else nav.classList.remove('shrink'); }
  window.addEventListener('scroll', onScroll);
  onScroll();
});
