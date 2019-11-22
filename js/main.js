// Javascript code for the nav bar

let navExpanded = false;

const topMenu = document.getElementById('top-menu');
const dropDown = document.getElementsByClassName('nav-drop-down')[0];
const dropDownTitle = document.getElementById('drop-down-title');

dropDownTitle.onclick = function () {
    if (navExpanded) {
        dropDown.style.display = "none";
        topMenu.style.height = "80px";
        dropDownTitle.innerHTML = dropDownTitle.innerHTML.replace('▼', '▶');
    } else {
        dropDownTitle.innerHTML = dropDownTitle.innerHTML.replace('▶', '▼');
        dropDown.style.display = "flex";
        topMenu.style.height = topMenu.clientHeight + dropDown.clientHeight + "px";
    }
    navExpanded = !navExpanded;
};