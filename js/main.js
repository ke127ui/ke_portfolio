window.onload = function(){
/* ============ start ============ */
// ______변수 area______
  const body = document.querySelector('body');
  const reload = document.querySelector('.reload');
  const darkMode = document.querySelector('.dark-mode');
  const modeName = darkMode.closest('.btn-menu li');
  const infoMenu = document.querySelectorAll('.btn-menu li.info-menu');
  const bookmark = document.querySelector('.ico-bookmark');
  const bookmarkIcon = document.querySelector('.ico-bookmark img');

  const workMain = document.querySelector('.my-works');
  const infoMain = document.querySelector('.my-info');
  const tabList = document.querySelectorAll('.info-tab li button');
  const infoSection = document.querySelectorAll('.info-main section');


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

// 모바일 bar영역 제외 스크립트
  const setScreenSize = e => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

  };
  window.addEventListener('resize', () => setScreenSize());
/* ============ end ============ */
};
