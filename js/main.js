// Javascript code for the nav bar

let navExpanded = false;

const topMenu = document.getElementById('top-menu');
const dropDown = document.getElementById('nav-drop-down');
const dropDownArea = document.getElementById('drop-down-area');
const dropDownImage = document.getElementById('drop-down-image');

dropDownArea.onclick = function () {
    if (navExpanded) {
        dropDown.style.opacity = '0';
        topMenu.style.height = '80px';
        dropDownImage.style.transform = 'rotate(0deg)';
    } else {
        dropDownImage.style.transform = 'rotate(90deg)';
        dropDown.style.opacity = '1';
        topMenu.style.height = topMenu.clientHeight + dropDown.clientHeight + 'px';
    }
    navExpanded = !navExpanded;
};