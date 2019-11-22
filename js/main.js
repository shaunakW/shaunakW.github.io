// Javascript code for the nav bar

let navExpanded = false;

const topMenu = document.getElementById('top-menu');
const dropDown = document.getElementById('nav-drop-down');
const dropDownArea = document.getElementById('drop-down-area');
const dropDownImage = document.getElementById('drop-down-image');

dropDown.addEventListener('transitionend', function() {
    if (!navExpanded) {
        dropDown.style.display = 'none';
    }
});

dropDownArea.onclick = function () {
    navExpanded = !navExpanded;
    if (navExpanded) {
        dropDownImage.style.transform = 'rotate(90deg)';
        dropDown.style.opacity = '1';
        dropDown.style.display = 'flex';
        topMenu.style.height = topMenu.clientHeight + dropDown.clientHeight + 'px';
    } else {
        dropDown.style.opacity = '0';
        topMenu.style.height = '80px';
        dropDownImage.style.transform = 'rotate(0deg)';
    }
};