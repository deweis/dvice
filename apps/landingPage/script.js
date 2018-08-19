document.getElementById('hamburger').addEventListener('click', function () {
  showOverlayMenu();
});

function showOverlayMenu() {
  document.getElementById('header-claim').style.display = 'none';
  document.getElementById('nav-toggled').style.display = 'flex';
  document.getElementById('main').style.display = 'none';
  document.getElementById('one').classList.add('span-one');
  document.getElementById('two').classList.add('span-two');
  document.getElementById('three').classList.add('span-three');
  document.getElementById('hamburger').addEventListener('click', function () {
    hideOverlayMenu();
  });
}

function hideOverlayMenu() {
  document.getElementById('header-claim').style.display = 'block';
  document.getElementById('nav-toggled').style.display = 'none';
  document.getElementById('main').style.display = 'grid';
  document.getElementById('one').classList.remove('span-one');
  document.getElementById('two').classList.remove('span-two');
  document.getElementById('three').classList.remove('span-three');
  document.getElementById('hamburger').addEventListener('click', function () {
    showOverlayMenu();
  });
}

document.getElementById('nav-toggle-home').addEventListener('click', function () {
  hideOverlayMenu();
});

document.getElementById('nav-toggle-about').addEventListener('click', function () {
  hideOverlayMenu();
});

document.getElementById('nav-toggle-video').addEventListener('click', function () {
  hideOverlayMenu();
});

document.getElementById('nav-toggle-gvcs').addEventListener('click', function () {
  hideOverlayMenu();
});

function openUrl() {
  window.open('https://wiki.opensourceecology.org/wiki/GVCS_State_of_Completion', '_blank');
}
