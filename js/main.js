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
        nxetBtn = document.querySelector('.works-btn-area .btn-next');

  const TabContListArea = document.querySelector('.tab-cont'),
        WorkContArea = document.querySelector('.works-main');

  const skillContArea = document.querySelector('.skill-list');


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
      // workMain.classList.add('now-full');
      document.querySelector('.info-bg').classList.remove('openbg');
      setTimeout(() => {
        workMain.classList.add('now-full');
        infoMain.style.visibility = "hidden";
      }, 500)
    }else{
      workMain.classList.remove('now-full');
      // infoMain.classList.add('now-open');
      document.querySelector('.info-bg').classList.add('openbg');
      setTimeout(() => {
        infoMain.classList.add('now-open');
        infoMain.style.visibility = "visible";
      }, 500)
    }

  };
  infoMenu.forEach(btn => {
    btn.addEventListener('click', menuClickHandel);
  });

// skill json 불러오기
  fetch("js/skill.json")
  .then((res) => {
    return res.json();
  })
  .then((obj) => {
    SkillList(obj);
  })

  function SkillList(obj){
    let skillCont = '';

    for(let s = 0; s < obj.length; s++){
      const title = obj[s].title;
      const icon = obj[s].icon;
      const desc = obj[s].desc;
      const percent = obj[s].percent;
      const color = obj[s].color;

      skillCont += "<li>"
      skillCont += "<div class='tool-area'>"
      skillCont += "<div class='circle-area'"
      skillCont += " style='background: conic-gradient(#"+color+" 0%, #"+color+" "+percent+"%, transparent "+percent+"%, transparent 100%)'>"
      skillCont += "<span class='icon-area'><img src='"+icon+"' alt=''></span>"
      skillCont += "</div></div>"
      skillCont += "<div class='tool-txt'>"
      skillCont += "<h4>"+title+"</h4>"
      skillCont += "<p>"+desc+"</p>"
      skillCont += "</div>"
      skillCont += "</li>"

      skillContArea.innerHTML = skillCont;
    }
  }

// works json 불러오기
  fetch("js/works.json")
  .then((res) => {
    return res.json();
  })
  .then((obj) => {
    WorkList(obj);
  })

  function WorkList(obj){
    let tabCont = '',
        workCont = '';

    for(let l = 0; l < obj.length; l++){
      const title = obj[l].title;
      const faviconImg = obj[l].faviconImg;
      const img = obj[l].img;
      const site = obj[l].site;
      const subTxt = obj[l].subTxt;
      const mainTxt = obj[l].mainTxt;
      const endTxt = obj[l].endTxt;

      //tabArea
      tabCont += "<div class='works-tab'>"
      tabCont += "<div class='favicon_img' style='background-image: url("+faviconImg+");'></div>"
      tabCont += "<h3>"+title+"</h3>"
      tabCont += "</div>";

      TabContListArea.innerHTML = tabCont;
      TabContListArea.firstElementChild.classList.add('now-view');

      //workSpace
      workCont += "<div class='cm-works-cont'>"
      workCont += "<h3>"+title+"</h3>"
      workCont += "<div class='workspace'>"
      workCont += "<div class='workspace-show'><div class='bkwrap'>"
      workCont += "<div class='work-main-img' style='background-image: url("+img+");'></div>"
      workCont += "</div><div class='work-url-btn'>"
      for(let s = 0; s < site.length; s++){
        workCont += "<a href='"+site[s]+"' target='_blank' role='button' aria-label='새창열기'>view site</a>"
      }
      workCont += "</div></div>"
      workCont += "<div class='workspace-info'><p class='main-txt'>"+mainTxt+"</p>"
      workCont += "<p class='sub-txt'>사용 언어: "+subTxt+"</p>"
      if(endTxt){
        workCont += "<div class='point-txt'><p>작업 포인트</p><ul>"
        for(let e = 0; e < endTxt.length; e++){
          workCont += "<li><p>"+endTxt[e]+"</p></li>"
        }
        workCont += "</ul></div>";
      }
      workCont += "</div></div></div>";

      WorkContArea.innerHTML = workCont;
      WorkContArea.firstElementChild.classList.add('appear');
      WorkContArea.firstElementChild.classList.add('now-view');

      // prev, next button
      const workPage = document.querySelectorAll('.cm-works-cont'),
            workBtn = document.querySelectorAll('.works-tab');
      const wheelArea = document.querySelector('.tab-cont');
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

      //mouseWheel event
      wheelArea.addEventListener('wheel', function(e) {
        const race = 10;

        if (e.deltaY > 0) // Scroll right
          wheelArea.scrollLeft += race;
        else // Scroll left
          wheelArea.scrollLeft -= race;
        e.preventDefault();
      });
    }
  }


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
