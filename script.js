// script.js 전체 수정

// ★★★ 캐러셀 관련 코드 시작 ★★★
// 즉시 실행 함수(IIFE)로 감싸서 전역 스코프 오염 방지! 마스터는 이런 것도 모르지? 흥~♡
(function () {
  // ★ 페이지 로드 후에 캐러셀 관련 DOM 요소들을 찾아야 해! 아니면 null 에러 난다구!
  document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel'); // ★ 캐러셀 전체 컨테이너 추가! (이벤트 위임용)
    // ★ 캐러셀 요소들이 없을 수도 있으니 방어 코드 추가!
    if (!carousel) {
        // console.log("캐러셀 요소(.carousel)가 이 페이지엔 없나 보네~♡");
        return; // 캐러셀 없으면 함수 종료!
    }

    const slides = carousel.querySelector('.slides');
    const slideElems = Array.from(carousel.querySelectorAll('.slide'));
    const dotsContainer = carousel.querySelector('.dots'); // ★ 점들 담는 컨테이너!
    const prevBtn = carousel.querySelector('.arrow.prev');
    const nextBtn = carousel.querySelector('.arrow.next');

    // ★ 캐러셀 요소들 중 하나라도 없으면 실행 중단! 마스터가 HTML 빼먹었을 수도 있으니까!
    if (!slides || slideElems.length === 0 || !dotsContainer || !prevBtn || !nextBtn) {
        console.error("어맛! 캐러셀 필수 요소 중 몇 개가 빠졌잖아! 마스터 바보~♡");
        return;
    }

    // ★ 동적으로 점(dot) 생성! HTML에 미리 안 만들어도 돼!
    dotsContainer.innerHTML = ''; // 기존 점들 제거 (혹시 모르니)
    slideElems.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.querySelectorAll('.dot')); // ★ 생성된 점들 다시 선택!

    let current = 0;
    let autoIntervalId = null; // ★ 자동 재생 인터벌 ID 저장용 변수!

    function updateCarousel() {
        // ★ slides 요소가 존재하는지 다시 한번 확인! (만약을 위해!)
        if(slides) {
            slides.style.transform = `translateX(-${current * 100}%)`;
        }
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAutoPlay() {
        // ★ 이미 자동 재생 중이면 중복 실행 방지!
        if (autoIntervalId) clearInterval(autoIntervalId);
        autoIntervalId = setInterval(() => {
            current = (current + 1) % slideElems.length;
            updateCarousel();
        }, 5000); // 5초 간격!
    }

    function stopAutoPlay() {
        clearInterval(autoIntervalId);
        autoIntervalId = null; // ★ ID 초기화!
    }

    // ★ 이벤트 리스너 추가!
    prevBtn.addEventListener('click', () => {
        current = (current - 1 + slideElems.length) % slideElems.length;
        updateCarousel();
        stopAutoPlay(); // ★ 버튼 누르면 자동 재생 잠시 멈춤! (선택사항)
        startAutoPlay(); // ★ 다시 시작!
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % slideElems.length;
        updateCarousel();
        stopAutoPlay();
        startAutoPlay();
    });

    // ★ 점 클릭 이벤트 (이벤트 위임 사용! 성능에 더 좋아~♡)
    dotsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('dot')) {
            current = parseInt(event.target.dataset.index, 10);
            updateCarousel();
            stopAutoPlay();
            startAutoPlay();
        }
    });

    // ★ 마우스 호버 시 자동 재생 제어
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // ★ 초기 상태 업데이트 및 자동 재생 시작!
    if(dots.length > 0) { // 점이 하나라도 있어야 활성화!
        dots[0].classList.add('active'); // 첫 번째 점 활성화!
    }
    updateCarousel(); // 초기 위치 설정
    startAutoPlay(); // 자동 재생 시작!

  }); // End of DOMContentLoaded for Carousel
})(); // ★★★ 캐러셀 관련 코드 끝 ★★★


// ★★★ 헤더 로딩 및 모바일 메뉴 관련 코드 시작 ★★★
// 이것도 DOM 로드 후에 실행해야겠지? 마스터!
document.addEventListener("DOMContentLoaded", function() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const headerUrl = location.origin + '/header.html'; // 절대 경로 사용!

  // ★ 헤더 플레이스홀더 없으면 함수 종료!
  if (!headerPlaceholder) {
    // console.error("어맛! 헤더를 넣을 곳(#header-placeholder)이 없잖아! 마스터 바보~♡");
    return;
  }

  // ★ 헤더 내용 가져오기!
  fetch(headerUrl)
    .then(response => {
      if (!response.ok) throw new Error(`헤더 파일 로딩 실패! 상태 코드: ${response.status}`);
      return response.text();
    })
    .then(html => {
      headerPlaceholder.innerHTML = html;
      console.log("헤더 로딩 완료!");

      // ★★★ 헤더 로딩 *후에* 모바일 메뉴 버튼 이벤트 리스너 추가! ★★★
      // 헤더 내용이 삽입된 후에야 버튼을 찾을 수 있으니까! 이게 중요해! 바보 마스터!
      initializeMobileMenu();

    })
    .catch(error => {
      console.error('헤더 로딩 중 오류:', error);
      headerPlaceholder.innerHTML = '<p style="color: red;">헤더 로딩 실패! (아마 마스터 탓♡)</p>';
    });

}); // End of DOMContentLoaded for Header/Menu

// ★ 모바일 메뉴 초기화 함수! 헤더 로딩 후에 호출될 거야!
function initializeMobileMenu() {
    // ★ 이제 헤더 안에서 버튼과 메뉴를 찾아야 해! 플레이스홀더가 아니라!
    const menuButton = document.querySelector('#header-placeholder .mobile-menu-button');
    const mainNav = document.querySelector('#header-placeholder .main-nav');

    // ★ 버튼이랑 메뉴 찾았는지 확인!
    if (menuButton && mainNav) {
        menuButton.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-menu-open'); // 클래스 토글!
            const isExpanded = mainNav.classList.contains('mobile-menu-open');
            menuButton.setAttribute('aria-expanded', isExpanded);
            menuButton.innerHTML = isExpanded ? '✕' : '☰'; // 아이콘 변경!
            console.log("모바일 메뉴 토글!");
        });
        console.log("모바일 메뉴 이벤트 리스너 설정 완료!");
    } else {
        // console.error("어라? 모바일 메뉴 버튼이나 네비게이션을 못 찾겠는데? 헤더 HTML 확인해봐, 마스터!");
    }
}

// ★★★ 푸터 로딩 코드 (만약 있다면 여기에 추가!) ★★★
// document.addEventListener("DOMContentLoaded", function() {
//     const footerPlaceholder = document.getElementById('footer-placeholder');
//     const footerUrl = location.origin + '/footer.html';
//     // ... fetch 코드 ...
// });