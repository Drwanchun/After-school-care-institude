document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. 北大风格首页大屏轮播 (防错检测)
  // ==========================================
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.pku-dot');
  
  if (slides.length > 0 && dots.length > 0) {
    let currentIndex = 0;
    let slideInterval;

    function switchSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }

    function nextSlide() {
      let nextIndex = (currentIndex + 1) % slides.length;
      switchSlide(nextIndex);
    }

    // 4.5秒平滑切换
    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 4500);
    }

    function stopAutoSlide() {
      clearInterval(slideInterval);
    }

    startAutoSlide();

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        switchSlide(index);
        startAutoSlide();
      });
    });
  }

  // ==========================================
  // 2. 首页向下滑动渐出 (Scroll Fade-Out)
  // ==========================================
  const pkuHero = document.getElementById('pkuHero');

  if (pkuHero) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = pkuHero.offsetHeight;

      if (scrollY <= heroHeight) {
        const opacity = 1 - (scrollY / heroHeight);
        const translateY = scrollY * 0.25;

        pkuHero.style.opacity = opacity.toFixed(2);
        pkuHero.style.transform = `translateY(${translateY.toFixed(1)}px)`;
      } else {
        pkuHero.style.opacity = '0';
      }
    });
  }

  // ==========================================
  // 3. 导航栏当前页面链接智能高亮
  // ==========================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath.includes(linkPath.replace('../', ''))) {
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    }
  });

});
