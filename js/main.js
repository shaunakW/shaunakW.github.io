// Javascript code for the nav bar

let navExpanded = false;

const topMenu = document.getElementById('top-menu');
const dropDown = document.getElementById('drop-down-area');
const dropDownButton = document.getElementById('nav-drop-down'); // Dropdown button in nav bar
const dropDownImage = document.getElementById('drop-down-image');

dropDown.addEventListener('transitionend', function() {
    if (!navExpanded) {
        dropDown.style.display = 'none';
    }
});

dropDownButton.onclick = function () {
    navExpanded = !navExpanded;
    if (navExpanded) {
        dropDownImage.style.transform = 'rotate(90deg)';
        dropDown.style.display = 'flex';
        setTimeout(function () {
            dropDown.style.opacity = '1';
        }, 5);
        topMenu.style.height = topMenu.clientHeight + dropDown.clientHeight + 'px';
    } else {
        dropDown.style.opacity = '0';
        topMenu.style.height = '80px';
        dropDownImage.style.transform = 'rotate(0deg)';
    }
};