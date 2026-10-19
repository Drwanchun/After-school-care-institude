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

function handleFormSubmit(event) {
  if (event) {
    event.preventDefault(); // 阻止默认提交行为
  }

  const parentNameInput = document.getElementById('parentNameInput');
  const phoneInput = document.getElementById('phoneInput');
  const gradeSelect = document.getElementById('gradeSelect');
  const needsTextarea = document.getElementById('needsTextarea');

  if (!parentNameInput || !phoneInput) {
    alert("页面元素未成功获取，请检查 input 的 id 是否正确！");
    return;
  }

  const parentName = parentNameInput.value.trim();
  const phone = phoneInput.value.trim();
  const grade = gradeSelect ? gradeSelect.value : '';
  const needs = needsTextarea ? needsTextarea.value.trim() : '';

  if (!parentName || !phone) {
    alert("请填写家长姓名和联系电话！");
    return;
  }

  // 构建表单数据
  const formData = new URLSearchParams();
  formData.append('id', parentName);            // 对应数据库中的 id 列 (存姓名)
  formData.append('phone_number', phone);       // 对应数据库中的 phone_number 列
  formData.append('grade', grade);              // 对应数据库中的 grade 列
  formData.append('Needs', needs);              // 对应数据库中的 Needs 列

  console.log("正在准备向 Java 后端发送数据...", formData.toString());

  // 发送 POST 请求到本地 Java 后端 (8080端口)
  fetch('http://10.1.21.57:8080/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: formData.toString()
  })
  .then(response => response.text())
  .then(message => {
    alert(message); // 弹出 Java 后端返回的“成功”提示
    document.getElementById('consultForm').reset(); // 清空表单
  })
  .catch(error => {
    console.error('提交失败:', error);
    alert('连接后端服务失败！请检查 IDEA 中的 Java 程序是否已运行。');
  });
}

