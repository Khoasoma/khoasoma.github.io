document.addEventListener('DOMContentLoaded', function() {
  const scrollEls = document.querySelectorAll('.scroll-fade');
  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.93;
    scrollEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add('show');
      }
    });
  }
  window.addEventListener('scroll', checkScroll);
  checkScroll();
});