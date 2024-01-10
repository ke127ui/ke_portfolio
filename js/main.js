window.onload = function(){
/* ============ start ============ */
// ______변수 area______
  const body = document.querySelector('body');
  const reload = document.querySelector('.reload');
  const darkMode = document.querySelector('.dark-mode');
  const modeName = darkMode.querySelector('.floder-name');
  const bookmark = document.querySelector('.ico-bookmark');
  const bookmarkIcon = document.querySelector('.ico-bookmark img');

  const myCat = document.querySelector('.my-cat');
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
      myCat.classList.remove('info-cat');
      myCat.classList.add('info-active-cat');
    }else{
      infoMain.classList.remove('is-active');
      myCat.classList.add('info-cat');
      myCat.classList.remove('info-active-cat');
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
  myCat.addEventListener('click', (e) => {
    if(myCat.classList.contains('main-cat')){
      if(infoMain.getAttribute('data-state') === '#about'){
        myCat.classList.remove('main-cat');
        myCat.classList.add('info-cat');
      }else{
        myCat.classList.remove('main-cat');
        myCat.classList.add('info-active-cat');
      }
      infoMain.classList.add('now-open');
    }else if(myCat.classList.contains('info-cat') || myCat.classList.contains('info-active-cat')){
      myCat.classList.remove('info-cat');
      myCat.classList.remove('info-active-cat');
      myCat.classList.add('main-cat');
      infoMain.classList.remove('now-open');
    }
    if(infoMain.classList.contains('now-open')){
      console.log('열림')
      workMain.classList.remove('now-full');
    }else{
      console.log('닫힘')
      workMain.classList.add('now-full');
    }
  });

// Easter Egg
  darkMode.addEventListener('click', () => {
    if(body.classList.contains('darkM')){
      body.classList.remove('darkM');
      modeName.innerHTML = 'dark-mode';
    }else{
      body.classList.add('darkM');
      modeName.innerHTML = 'light-mode';
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