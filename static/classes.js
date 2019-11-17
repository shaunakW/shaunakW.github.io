const d = new Date(0); // TODO: Remove 0 when done debugging
const main = document.getElementById("main");

const classes = ["No classes today!", "APCS", "English 2", "PE", "Precalculus H", "History", "Chemistry H", "Spanish 2"];

let today;
switch (d.getDay()) {
    case 1:
        today = [1, 2, 3, 4, 5, 6];
        break;
    case 2:
        today = [1, 7, 2, 3, 4, 5];
        break;
    case 3:
        today = [1, 6, 7, 2, 3];
        break;
    case 4:
        today = [1, 4, 5, 6, 7, 2];
        break;
    case 5:
        today = [3, 4, 5, 6, 7];
        break;
    default:
        today = [0]
}

for (let i of today) {
    const p = document.createElement("p");
    p.className = "class";
    p.innerHTML = classes[i];
    main.appendChild(p);
}

// HTTP request test - for later
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        console.log(JSON.parse(xhttp.responseText)["main"]);
    }
};
xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=San%20Jose,us&appid=b63129c5f1096dc67104117a85613732", true);
xhttp.send();
