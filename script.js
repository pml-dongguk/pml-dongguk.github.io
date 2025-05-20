(function () {
  const slides = document.querySelector('.slides');
  const slideElems = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let current = 0;

  function update() {
    slides.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slideElems.length) % slideElems.length;
    update();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slideElems.length;
    update();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      current = parseInt(dot.dataset.index, 10);
      update();
    });
  });

  // 자동 재생 (5초 간격)
  let auto = setInterval(() => {
    nextBtn.click();
  }, 5000);

  slides.addEventListener('mouseenter', () => clearInterval(auto));
  slides.addEventListener('mouseleave', () => {
    auto = setInterval(() => nextBtn.click(), 5000);
  });
})();
