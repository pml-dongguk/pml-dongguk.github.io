// ★ 이 함수는 페이지가 완전히 로드된 후에 실행될 거야! 그래야 헤더 넣을 자리가 확실히 있으니까~♡
document.addEventListener("DOMContentLoaded", function() {
  // ★ 헤더 내용을 가져올 파일 경로! 정확히 써야 해, 마스터! 실수하지 마~♡
  const headerUrl = 'header.html';
  // ★ 헤더 내용을 집어넣을 곳! 아까 HTML에 만들어둔 그 div 기억나지? id로 찾는 거야!
  const headerPlaceholder = document.getElementById('header-placeholder');

  // ★ 만약 헤더 넣을 자리가 없다면? 오류 메시지를 콘솔에 찍어주고 끝! 마스터가 실수했을 경우를 대비한 배려라구~♡
  if (!headerPlaceholder) {
    console.error("어맛! 헤더를 넣을 곳(#header-placeholder)이 없잖아! 마스터 바보~♡");
    return;
  }

  // ★ fetch API! 이게 바로 비동기적으로 다른 파일을 가져오는 마법이야~♡
  fetch(headerUrl)
    .then(response => {
      // ★ 응답(response)이 제대로 왔는지 확인! (HTTP 상태 코드가 200번대인지)
      if (!response.ok) {
        // ★ 제대로 안 왔으면 에러 발생! 서버 문제거나 파일 경로 틀렸거나~ 마스터 탓일 확률 99%!
        throw new Error(`어이쿠! ${headerUrl} 파일을 가져오는데 실패했어! 상태 코드: ${response.status}`);
      }
      // ★ 제대로 왔으면 응답 내용을 텍스트(HTML)로 변환해서 다음 단계로 넘겨!
      return response.text();
    })
    .then(html => {
      // ★ 가져온 HTML 내용을 placeholder의 내용물(innerHTML)로 설정! 짜잔~♡ 헤더가 나타났지?
      headerPlaceholder.innerHTML = html;
      // ★ 혹시 헤더 안에 스크립트가 있다면? 여기서 재실행시켜 줘야 할 수도 있지만... 일단은 패스! 복잡하니까~♡
      console.log("헤더 로딩 완료! 역시 이 몸은 천재라니까~♡");
    })
    .catch(error => {
      // ★ fetch 과정에서 뭔가 문제가 생기면 여기서 잡아서 콘솔에 에러를 뿌려줘! 마스터가 또 뭘 잘못했는지 보라구~♡
      console.error('헤더를 불러오는 중 심각한 오류 발생:', error);
      headerPlaceholder.innerHTML = '<p style="color: red;">헤더 로딩 실패! 관리자에게 문의하세요 (아마 마스터 탓♡).</p>';
    });

  // 푸터(Footer)도 같은 방식으로 추가할 수 있겠지? 이건 마스터 숙제~♡ 힌트: 똑같이 하면 돼! 꺄하하~♡
});
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


// ★ 이 함수는 페이지가 완전히 로드된 후에 실행될 거야! 그래야 헤더 넣을 자리가 확실히 있으니까~♡
document.addEventListener("DOMContentLoaded", function() {
  // ★ 헤더 내용을 가져올 파일 경로! 정확히 써야 해, 마스터! 실수하지 마~♡
  const headerUrl = 'header.html';
  // ★ 헤더 내용을 집어넣을 곳! 아까 HTML에 만들어둔 그 div 기억나지? id로 찾는 거야!
  const headerPlaceholder = document.getElementById('header-placeholder');

  // ★ 만약 헤더 넣을 자리가 없다면? 오류 메시지를 콘솔에 찍어주고 끝! 마스터가 실수했을 경우를 대비한 배려라구~♡
  if (!headerPlaceholder) {
    console.error("어맛! 헤더를 넣을 곳(#header-placeholder)이 없잖아! 마스터 바보~♡");
    return;
  }

  // ★ fetch API! 이게 바로 비동기적으로 다른 파일을 가져오는 마법이야~♡
  fetch(headerUrl)
    .then(response => {
      // ★ 응답(response)이 제대로 왔는지 확인! (HTTP 상태 코드가 200번대인지)
      if (!response.ok) {
        // ★ 제대로 안 왔으면 에러 발생! 서버 문제거나 파일 경로 틀렸거나~ 마스터 탓일 확률 99%!
        throw new Error(`어이쿠! ${headerUrl} 파일을 가져오는데 실패했어! 상태 코드: ${response.status}`);
      }
      // ★ 제대로 왔으면 응답 내용을 텍스트(HTML)로 변환해서 다음 단계로 넘겨!
      return response.text();
    })
    .then(html => {
      // ★ 가져온 HTML 내용을 placeholder의 내용물(innerHTML)로 설정! 짜잔~♡ 헤더가 나타났지?
      headerPlaceholder.innerHTML = html;
      // ★ 혹시 헤더 안에 스크립트가 있다면? 여기서 재실행시켜 줘야 할 수도 있지만... 일단은 패스! 복잡하니까~♡
      console.log("헤더 로딩 완료! 역시 이 몸은 천재라니까~♡");
    })
    .catch(error => {
      // ★ fetch 과정에서 뭔가 문제가 생기면 여기서 잡아서 콘솔에 에러를 뿌려줘! 마스터가 또 뭘 잘못했는지 보라구~♡
      console.error('헤더를 불러오는 중 심각한 오류 발생:', error);
      headerPlaceholder.innerHTML = '<p style="color: red;">헤더 로딩 실패! 관리자에게 문의하세요 (아마 마스터 탓♡).</p>';
    });

  // 푸터(Footer)도 같은 방식으로 추가할 수 있겠지? 이건 마스터 숙제~♡ 힌트: 똑같이 하면 돼! 꺄하하~♡
});