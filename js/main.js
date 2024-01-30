window.onload = function(){
/* ============ start ============ */
// 모바일 bar영역 제외 스크립트
  const setScreenSize = e => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

  };
  window.addEventListener('resize', () => setScreenSize());

// ______변수 area______
  const body = document.querySelector('body'),
        reload = document.querySelector('.reload'),
        darkMode = document.querySelector('.dark-mode'),
        modeName = darkMode.closest('.btn-menu li'),
        infoMenu = document.querySelectorAll('.btn-menu li.info-menu'),
        bookmark = document.querySelector('.ico-bookmark'),
        bookmarkIcon = document.querySelector('.ico-bookmark img');

  const workMain = document.querySelector('.my-works'),
        infoMain = document.querySelector('.my-info'),
        tabList = document.querySelectorAll('.info-tab li button'),
        infoSection = document.querySelectorAll('.info-main section');

  const prevBtn = document.querySelector('.works-btn-area .btn-prev'),
        nxetBtn = document.querySelector('.works-btn-area .btn-next'),
        workPage = document.querySelectorAll('.cm-works-cont'),
        workBtn = document.querySelectorAll('.works-tab');


// ______함수 실행______

// 소개, 이력, 스킬 카드
  const tabClickHandle = e => {
    const targetSection  = e.target.getAttribute('data-section');
    const section = document.querySelector(targetSection);
    if(targetSection !== "#about"){
      infoMain.classList.add('is-active');
    }else{
      infoMain.classList.remove('is-active');
    }
    infoMain.setAttribute('data-state', targetSection);
    infoSection.forEach(s => s.classList.remove('is-active'));
    tabList.forEach(t => t.classList.remove('is-active'));
    e.target.classList.add('is-active');
    section.classList.add('is-active');
  };
  tabList.forEach(btn => {
    btn.addEventListener('click', tabClickHandle);
  })

  // 카드 오픈 이벤트
  const menuClickHandel = e => {
    let nowMenu = e.target.closest('.info-menu').getAttribute('data-state');
    const section = document.querySelector('#'+nowMenu);
    const tab = infoMain.getAttribute('data-state');

    infoMain.setAttribute('data-state', '#'+nowMenu);
    infoSection.forEach(s => s.classList.remove('is-active'));
    tabList.forEach(function(e){
      let tabListData = e.getAttribute('data-section');
      e.classList.remove('is-active');
      if(tabListData === '#'+nowMenu){
        e.classList.add('is-active');
      }
    });
    section.classList.add('is-active');
    if(nowMenu !== "about"){
      infoMain.classList.add('is-active');
    }else{
      infoMain.classList.remove('is-active');
    }

    if(infoMain.classList.contains('now-open') && tab === '#'+nowMenu){
      infoMain.classList.remove('now-open');
      workMain.classList.add('now-full');
    }else{
      infoMain.classList.add('now-open');
          workMain.classList.remove('now-full');
    }

  };
  infoMenu.forEach(btn => {
    btn.addEventListener('click', menuClickHandel);
  });

// skill json 불러오기

// works json 불러오기

// prev, next button
  let nowPage = 0;
  let lastPage = workBtn.length - 1;

  for(let i = 0; i < workBtn.length; i++){
    workBtn[i].addEventListener("click", function() {
      workPage[nowPage].classList.remove('now-view');
      workBtn[nowPage].classList.remove('now-view');
      workPage[nowPage].classList.remove('appear');
      workPage[nowPage = i].classList.add('now-view');
      workBtn[nowPage = i].classList.add('now-view');
      workPage[nowPage = i].classList.add('appear');
    });
  };

  prevBtn.addEventListener('click', function() {
    if(nowPage === 0){
      workBtn[lastPage].click();
    }else if(nowPage > 0){
      workBtn[nowPage - 1].click();
    }
  });
  nxetBtn.addEventListener('click', function(){
    if(nowPage === lastPage){
      workBtn[0].click();
    }else if(nowPage < lastPage){
      workBtn[nowPage + 1].click();
    }
  });

// Easter Egg
  darkMode.addEventListener('click', () => {
    if(body.classList.contains('darkM')){
      body.classList.remove('darkM');
      modeName.setAttribute('data-state','dark-mode');
    }else{
      body.classList.add('darkM');
      modeName.setAttribute('data-state','light-mode');
    }
  });
  reload.addEventListener('click', () => {
    location.reload();
  });
  bookmark.addEventListener('click', () => {
    if(bookmarkIcon.src.match('./img/icon/ico_star.svg')){
      bookmarkIcon.src = "./img/icon/ico_star_full.svg"
    }else{
      bookmarkIcon.src = "./img/icon/ico_star.svg"
    }
  });
/* ============ end ============ */
};
