$('document').ready(function(){
  let dataIndex = 0;
  let imgNum = ($('body #modalImg').length) - 1;
  let scrollBarWidth = window.innerWidth - document.body.offsetWidth;
  let halfScrollBarWidth = ((window.innerWidth - document.body.offsetWidth) / 2);
  let body = document.getElementsByTagName("body")[0];
  let modalWindow = document.getElementById("modalWindow");
  let imgPlace = document.getElementById("imgPlace");
  let imgPlaceWidth;
  let imgPlaceHeight;
  let imgSpace = document.getElementById("imgSpace");
  let imgSpaceHeight;
  let imgSpaceWidth;
  let topIndent = document.getElementById("topIndent");
  let closeModal = document.getElementById("closeModal");
  let leftIndent = document.getElementById("leftIndent");
  let leftIndentHeight;
  let previousImg = document.getElementById("previousImg");
  let rightIndent = document.getElementById("rightIndent");
  let nextImg = document.getElementById("nextImg");
  let description = document.getElementById("imgDescription");
  let closingArea = document.getElementById("closingArea");
  let space = document.getElementById("space");
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.addEventListener('touchstart', function(){}, {passive: false})
  removeScroll();

  function removeScroll() {
    if (scrollBarWidth > 0) {
      closeModal.style.width = `calc(100% - ${scrollBarWidth}px)`;
      leftIndent.style.width = `calc(80px - ${halfScrollBarWidth}px)`;
      previousImg.style.width = `calc(80px - ${halfScrollBarWidth}px)`;
      rightIndent.style.width = `calc(80px - ${halfScrollBarWidth}px)`;
      nextImg.style.width = `calc(80px - ${halfScrollBarWidth}px)`;
      nextImg.style.right = `${scrollBarWidth}px`;
    }
  }

  $(window).resize(function() {
    removeScroll();
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    smallDisplays();
  });

  function smallDisplays() {
  imgPlaceHeight = imgPlace.clientHeight;
  leftIndentHeight = leftIndent.clientHeight;
    if (imgPlaceHeight < leftIndentHeight) {
      imgSpace.style.display = "inline-block";
      imgPlace.style.width = "100%";
      imgPlace.style.position = "absolute";
      imgPlace.style.top = "50%";
      imgPlace.style.left = "50%";
      imgPlace.style.transform = "translate(-50%, -50%)";
    } else {
      imgSpace.style.display = "inline-table";
      imgPlace.style.width = null;
      imgPlace.style.position = null;
      imgPlace.style.top = null;
      imgPlace.style.left = null;
      imgPlace.style.transform = null;
    }
  }

  $('#modalWindow').scroll(function(e) {
    imgPlaceWidth = imgPlace.clientWidth;
    imgPlaceHeight = imgPlace.clientHeight;
    imgSpaceHeight = imgSpace.clientHeight - 4;
    imgSpaceWidth = imgSpace.clientWidth; // new
    let height = $(this).scrollTop();
    let modalWindowHeight = modalWindow.clientHeight;
    if ((height + modalWindowHeight - 280) >= imgSpaceHeight && closingArea.style.display == "none") {
      setTimeout(function() {closingArea.style.display = "block"}, 1100);
      setTimeout(function() {space.style.display = "block"}, 1100);
    }
    if ((height + modalWindowHeight - 280) >= imgSpaceHeight + 350) {
      setTimeout(function() {closeKiwiMI();}, 200);
    }
  });

  $(document).on('click', 'body img', function() {
    if($(event.target).closest('.notThis').length > 0) {
        return false;
    }
    imgPlace.src = $(this).attr("src");
    dataIndex = $(this).attr("dataIndex");
    let alt = $(this).attr("alt");
    body.style.overflow = "hidden";
    modalWindow.style.display = "block";
    removeScroll();
    closeModal.style.display = "block";
    description.textContent = alt;
    if (dataIndex < 1) {
      previousImg.style.display = "none";
      nextImg.style.display = "block";
    } else if (dataIndex >= 1 && dataIndex < imgNum) {
      previousImg.style.display = "block";
      nextImg.style.display = "block";
    } else if (dataIndex >= imgNum) {
      previousImg.style.display = "block";
      nextImg.style.display = "none";
    }
    setTimeout(function() {smallDisplays();}, 20);
  })

  if (closeModal) {closeModal.onclick = closeKiwiMI};
  if (previousImg) {
    previousImg.onclick = previousKiwiMI;
  };
  if (nextImg) {
    nextImg.onclick = nextKiwiMI;
  };

  function closeKiwiMI() {
    $('#modalWindow').scrollTop(0,0);
    body.style.overflow = "auto";
    modalWindow.style.display = "none";
    closeModal.style.display = "none";
    previousImg.style.display = "none";
    nextImg.style.display = "none";
    closingArea.style.display = "none";
    space.style.display = "none";
  };

  function previousKiwiMI() {
    $('#modalWindow').scroll(0, 0);
    dataIndex = --dataIndex;
    if (dataIndex < 1) {
      previousImg.style.display = "none";
      nextImg.style.display = "block";
    } else if (dataIndex >= 1 && dataIndex < imgNum) {
      previousImg.style.display = "block";
      nextImg.style.display = "block";
    } else if (dataIndex >= imgNum) {
      nextImg.style.display = "none";
    }
    imgPlace.src = document.getElementsByTagName("img")[dataIndex].getAttribute("src");
    description.textContent = document.getElementsByTagName("img")[dataIndex].getAttribute("alt");
    smallDisplays();
  };

  function nextKiwiMI() {
    $('#modalWindow').scroll(0, 0);
    dataIndex = ++dataIndex;
    if (dataIndex >= 1 && dataIndex < imgNum) {
      previousImg.style.display = "block";
      nextImg.style.display = "block";
    } else if (dataIndex >= imgNum) {
      nextImg.style.display = "none";
    }
    imgPlace.src = document.getElementsByTagName("img")[dataIndex].getAttribute("src");
    description.textContent = document.getElementsByTagName("img")[dataIndex].getAttribute("alt");
    smallDisplays();
  };
});
